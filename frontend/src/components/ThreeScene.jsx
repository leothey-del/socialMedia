import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useDarkMode } from '../context/DarkModeContext';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const { darkmode } = useDarkMode();

  useEffect(() => {
    // Skip if mountRef is not set
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Background color based on dark mode
    scene.background = darkmode ? new THREE.Color('#1f2937') : new THREE.Color('#f3f4f6');

    // Create cubes
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: darkmode ? '#60a5fa' : '#3b82f6',
      roughness: 0.5,
    });
    const cubes = [];
    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      cube.rotation.set(Math.random(), Math.random(), Math.random());
      scene.add(cube);
      cubes.push(cube);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(darkmode ? 0x404040 : 0xaaaaaa, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(darkmode ? 0xffffff : 0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 15;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      // Cancel animation
      cancelAnimationFrame(animationFrameId);
      // Remove renderer element only if mountRef.current exists
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Clean up Three.js resources
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [darkmode]); // Re-run effect when darkmode changes

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default ThreeScene;