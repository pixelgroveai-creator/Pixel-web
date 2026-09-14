import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NeuralGalaxyCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Three.js Scene Setup with Deep Celestial Space Atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0e13, 0.0032);

    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 2400);
    // Initial camera position (will be driven by 360-degree orbital rotational perspective in animate)
    camera.position.set(0, 25, 140);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Master Galactic Hierarchy
    const masterGalaxyGroup = new THREE.Group();
    scene.add(masterGalaxyGroup);

    // Procedural Glowing Star/Node Texture
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.18, 'rgba(192, 193, 255, 0.95)');
        grad.addColorStop(0.42, 'rgba(76, 215, 246, 0.5)');
        grad.addColorStop(0.72, 'rgba(128, 131, 255, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }
      return new THREE.CanvasTexture(canvas);
    };
    const starGlowMap = createGlowTexture();

    // 1. Synaptic Neural Nodes (Double Logarithmic Spiral + Core Cluster)
    const nodeCount = 420;
    const nodePositions: THREE.Vector3[] = [];
    const baseNodePositions: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];
    const spiralArms = 3;

    const nodeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);

    const modernPalette = [
      new THREE.Color(0x8083ff), // Radiant Indigo
      new THREE.Color(0x4cd7f6), // Electric Cyan
      new THREE.Color(0xc0c1ff), // Lavender White
      new THREE.Color(0x4edea3), // Emerald Synapse
      new THREE.Color(0xa78bfa), // Soft Violet
      new THREE.Color(0x38bdf8), // Cyber Sky
    ];

    for (let i = 0; i < nodeCount; i++) {
      let x = 0;
      let y = 0;
      let z = 0;

      if (i < 90) {
        // High-density core nucleus
        const dist = Math.pow(Math.random(), 1.8) * 28 + 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.7;
        x = dist * Math.cos(phi) * Math.cos(theta);
        y = dist * Math.sin(phi) * 0.55;
        z = dist * Math.cos(phi) * Math.sin(theta);
      } else {
        // Spiral arms with organic depth dispersion
        const arm = i % spiralArms;
        const armOffset = (arm * (Math.PI * 2)) / spiralArms;
        const dist = 22 + Math.pow((i - 90) / (nodeCount - 90), 0.85) * 115;
        const spiralAngle = dist * 0.05 + armOffset + (Math.random() - 0.5) * 0.35;
        const spread = (Math.random() - 0.5) * (dist * 0.38 + 12);

        x = Math.cos(spiralAngle) * dist + (Math.random() - 0.5) * 8;
        y = spread * 0.42 + Math.sin(dist * 0.08) * 10;
        z = Math.sin(spiralAngle) * dist + (Math.random() - 0.5) * 8;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      nodePositions.push(new THREE.Vector3(x, y, z));
      baseNodePositions.push(new THREE.Vector3(x, y, z));
      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.03
        )
      );

      const color = modernPalette[Math.floor(Math.random() * modernPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3.6 + 1.6;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 4.0,
      map: starGlowMap,
      vertexColors: true,
      transparent: true,
      opacity: 0.96,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodeParticles = new THREE.Points(nodeGeometry, nodeMaterial);
    masterGalaxyGroup.add(nodeParticles);

    // 2. Synaptic Axon Neural Links (Dynamic Active Connections)
    const maxConnections = 1600;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const synapticLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    masterGalaxyGroup.add(synapticLines);

    // 3. Volumetric Cosmic Nebula Clouds (Gaseous Nebulae)
    const nebulaCount = 180;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaCol = new Float32Array(nebulaCount * 3);

    const nebulaPalette = [
      new THREE.Color(0x4338ca), // Deep Indigo
      new THREE.Color(0x0284c7), // Cosmic Cyan
      new THREE.Color(0x7c3aed), // Violet Glow
      new THREE.Color(0x059669), // Aurora Emerald
    ];

    for (let n = 0; n < nebulaCount; n++) {
      const radius = 25 + Math.random() * 125;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (radius * 0.45);

      nebulaPos[n * 3] = Math.cos(angle) * radius;
      nebulaPos[n * 3 + 1] = height;
      nebulaPos[n * 3 + 2] = Math.sin(angle) * radius;

      const c = nebulaPalette[Math.floor(Math.random() * nebulaPalette.length)];
      nebulaCol[n * 3] = c.r;
      nebulaCol[n * 3 + 1] = c.g;
      nebulaCol[n * 3 + 2] = c.b;
    }

    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaCol, 3));

    const nebulaMat = new THREE.PointsMaterial({
      size: 28.0,
      map: starGlowMap,
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebulaCloud = new THREE.Points(nebulaGeo, nebulaMat);
    masterGalaxyGroup.add(nebulaCloud);

    // 4. Distant Celestial 360-Degree Spherical Starfield
    const starCount = 850;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);

    for (let s = 0; s < starCount; s++) {
      const r = 220 + Math.random() * 400;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);

      starPos[s * 3] = r * Math.sin(theta) * Math.cos(phi);
      starPos[s * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      starPos[s * 3 + 2] = r * Math.cos(theta);

      const brightness = 0.45 + Math.random() * 0.55;
      const tint = Math.random();
      if (tint > 0.6) {
        // Cyan-leaning star
        starCols[s * 3] = 0.4 * brightness;
        starCols[s * 3 + 1] = 0.8 * brightness;
        starCols[s * 3 + 2] = 1.0 * brightness;
      } else if (tint > 0.3) {
        // Indigo-leaning star
        starCols[s * 3] = 0.8 * brightness;
        starCols[s * 3 + 1] = 0.7 * brightness;
        starCols[s * 3 + 2] = 1.0 * brightness;
      } else {
        // Pure luminous white
        starCols[s * 3] = brightness;
        starCols[s * 3 + 1] = brightness;
        starCols[s * 3 + 2] = brightness;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const distantStarfield = new THREE.Points(starGeo, starMat);
    scene.add(distantStarfield);

    // Mouse Tracking with Smooth Damping (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Responsive Canvas Resizing with Container Check
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const maxDistance = 27;

    // Animation Loop with 360-Degree Rotational Camera Orbit & Parallax
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      // 360-Degree Continuous Rotational Perspective Orbit
      // The camera orbits in a full 360-degree circle around the galactic center
      // while smoothly modulating pitch and altitude to create deep 3D perspective
      const orbitSpeed = 0.055;
      const cameraAngle = elapsedTime * orbitSpeed + targetX * 0.65;
      const orbitRadius = 142 + Math.sin(elapsedTime * 0.035) * 16;
      const cameraAltitude = Math.sin(elapsedTime * 0.045) * 38 + 26 + targetY * 20;

      camera.position.x = Math.sin(cameraAngle) * orbitRadius;
      camera.position.z = Math.cos(cameraAngle) * orbitRadius;
      camera.position.y = cameraAltitude;

      // Camera continuously maintains focal lock on galactic core (0, 0, 0)
      camera.lookAt(0, 0, 0);

      // Subtle counter-rotation of galaxy core to enrich relative motion parallax
      masterGalaxyGroup.rotation.y = elapsedTime * 0.02;
      distantStarfield.rotation.y = -elapsedTime * 0.008;

      // Organic pulsation of synaptic neural nodes
      const posAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < nodeCount; i++) {
        const base = baseNodePositions[i];
        const p = nodePositions[i];
        const v = nodeVelocities[i];

        const wave = Math.sin(elapsedTime * 1.2 + i * 0.15);
        p.x = base.x + v.x * 60 * wave;
        p.y = base.y + v.y * 45 * Math.cos(elapsedTime * 0.9 + i * 0.1);
        p.z = base.z + v.z * 60 * wave;

        posAttr.setXYZ(i, p.x, p.y, p.z);
      }
      posAttr.needsUpdate = true;

      // Synaptic Axon Connections Calculation
      let connectionIndex = 0;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const p1 = nodePositions[i];
          const p2 = nodePositions[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance && connectionIndex < maxConnections) {
            const idx = connectionIndex * 6;
            linePositions[idx] = p1.x;
            linePositions[idx + 1] = p1.y;
            linePositions[idx + 2] = p1.z;
            linePositions[idx + 3] = p2.x;
            linePositions[idx + 4] = p2.y;
            linePositions[idx + 5] = p2.z;

            // Traveling synaptic action-potential electrical signal pulse
            const signalPulse =
              0.4 + 0.6 * Math.sin(elapsedTime * 3.5 - dist * 0.4);
            const proximityAlpha = (1.0 - dist / maxDistance) * signalPulse;

            // Electric gradient along the synaptic axon: indigo to cyan
            lineColors[idx] = 0.50 * proximityAlpha;
            lineColors[idx + 1] = 0.51 * proximityAlpha;
            lineColors[idx + 2] = 1.0 * proximityAlpha;

            lineColors[idx + 3] = 0.30 * proximityAlpha;
            lineColors[idx + 4] = 0.84 * proximityAlpha;
            lineColors[idx + 5] = 0.96 * proximityAlpha;

            connectionIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, connectionIndex * 2);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean Memory & WebGL Context Teardown
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      starGlowMap.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="neural-galaxy-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent overflow-hidden"
      aria-hidden="true"
    />
  );
};
