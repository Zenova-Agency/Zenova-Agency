/* ========================================
   ZENOVA - 3D Background (Three.js)
   ======================================== */

// Wait for Three.js to load
if (typeof THREE !== 'undefined') {
    
    // Get canvas element
    const canvas = document.getElementById('hero-canvas');
    
    if (canvas) {
        // Scene setup
        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);
        
        // Generate random positions
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Particle material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0x7B3FF2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Particle mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Geometric shapes
        const shapes = [];
        
        // Create floating geometric shapes
        const geometries = [
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.IcosahedronGeometry(1, 0)
        ];
        
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? 0x7B3FF2 : 0x00E5FF,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 50;
            mesh.position.y = (Math.random() - 0.5) * 50;
            mesh.position.z = (Math.random() - 0.5) * 50;
            
            // Random rotation speed
            mesh.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            };
            
            shapes.push(mesh);
            scene.add(mesh);
        }
        
        // Mouse movement
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate particles
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0003;
            
            // Rotate and move shapes
            shapes.forEach(shape => {
                shape.rotation.x += shape.rotationSpeed.x;
                shape.rotation.y += shape.rotationSpeed.y;
                shape.rotation.z += shape.rotationSpeed.z;
                
                // Gentle floating motion
                shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.01;
            });
            
            // Camera follows mouse (subtle effect)
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Reduce particles on mobile for performance
        if (window.innerWidth < 768) {
            particlesMaterial.size = 0.1;
            shapes.forEach((shape, index) => {
                if (index > 5) {
                    scene.remove(shape);
                }
            });
        }
    }
}