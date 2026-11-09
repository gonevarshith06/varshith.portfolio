"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroExperienceProps {
  burstTrigger?: boolean;
}

// High-Resolution Procedural Texture with Diamond Sparkles & Iridescent Specular Highlights
let cachedButterflyTexture: THREE.CanvasTexture | null = null;

function getShiningElectricButterflyTexture(): THREE.CanvasTexture {
  if (cachedButterflyTexture) return cachedButterflyTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 512, 512);

  // 1. Sharp Laser Electric Cyan to Deep Sapphire Wing Membrane
  const wingGrad = ctx.createRadialGradient(256, 256, 5, 256, 256, 254);
  wingGrad.addColorStop(0, "#ffffff"); // Blazing white-hot core
  wingGrad.addColorStop(0.12, "#cffafe"); // Iridescent ice cyan
  wingGrad.addColorStop(0.25, "#00f0ff"); // Razor-sharp neon cyan
  wingGrad.addColorStop(0.5, "#0091ff"); // Piercing electric azure
  wingGrad.addColorStop(0.74, "#0038ff"); // Deep royal cobalt
  wingGrad.addColorStop(0.9, "#000a26"); // Midnight contrast margin
  wingGrad.addColorStop(1, "#00ffff"); // Polished razor cyan edge
  ctx.fillStyle = wingGrad;
  ctx.fillRect(0, 0, 512, 512);

  // 2. Razor-Sharp Luminescent Vein Lattice
  ctx.save();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.5;

  const centerRoots = [{ x: 256, y: 256 }];
  for (const root of centerRoots) {
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
      ctx.beginPath();
      ctx.moveTo(root.x, root.y);
      const cpX = root.x + Math.cos(angle + 0.18) * 135;
      const cpY = root.y + Math.sin(angle + 0.18) * 135;
      const endX = root.x + Math.cos(angle) * 245;
      const endY = root.y + Math.sin(angle) * 245;
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.stroke();

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "#00ffff";
      for (let t = 0.3; t <= 0.85; t += 0.25) {
        const bx = root.x + Math.cos(angle) * (245 * t);
        const by = root.y + Math.sin(angle) * (245 * t);
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(angle + 0.55) * 35, by + Math.sin(angle + 0.55) * 35);
        ctx.stroke();
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#ffffff";
    }
  }
  ctx.restore();

  // 3. Sparkling Iridescent Diamond Shine Flecks & Specular Glints
  for (let i = 0; i < 45; i++) {
    const rx = 256 + (Math.random() - 0.5) * 480;
    const ry = 256 + (Math.random() - 0.5) * 480;
    const r = Math.random() * 2.2 + 0.8;

    if (i % 4 === 0) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(rx, ry - r * 2.5);
      ctx.lineTo(rx + r * 0.6, ry);
      ctx.lineTo(rx, ry + r * 2.5);
      ctx.lineTo(rx - r * 0.6, ry);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#a5f3fc";
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 506, 506);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  cachedButterflyTexture = texture;
  return texture;
}

// 3D Morphologically Detailed Butterfly Geometry
let cachedButterflyGeom: THREE.BufferGeometry | null = null;

function getElectricButterflyGeometry(): THREE.BufferGeometry {
  if (cachedButterflyGeom) return cachedButterflyGeom;

  const geom = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const bodySegments = 8;
  const bodyRadius = 0.028;
  const bodyStart = vertices.length / 3;

  for (let i = 0; i <= bodySegments; i++) {
    const t = i / bodySegments;
    const y = 0.22 - t * 0.52;
    const r = Math.sin(t * Math.PI) * bodyRadius + 0.01;

    for (let a = 0; a < 8; a++) {
      const angle = (a / 8) * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      vertices.push(x, y, z);
      uvs.push(0.5 + x * 2.5, 0.5 + y * 1.8);
    }
  }

  for (let i = 0; i < bodySegments; i++) {
    for (let a = 0; a < 8; a++) {
      const nextA = (a + 1) % 8;
      const i0 = bodyStart + i * 8 + a;
      const i1 = bodyStart + i * 8 + nextA;
      const i2 = bodyStart + (i + 1) * 8 + a;
      const i3 = bodyStart + (i + 1) * 8 + nextA;
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  const sides = [1, -1];
  const wingGridCols = 8;
  const wingGridRows = 8;

  for (const side of sides) {
    const wingStart = vertices.length / 3;

    for (let r = 0; r <= wingGridRows; r++) {
      const v = r / wingGridRows;
      const y = 0.3 - v * 0.65;

      for (let c = 0; c <= wingGridCols; c++) {
        const u = c / wingGridCols;

        let outerSpan = 0.8;
        if (v < 0.5) {
          outerSpan = 0.7 + Math.sin(v * Math.PI * 2.0) * 0.32;
        } else {
          const hindV = (v - 0.5) * 2.0;
          // Elegant swallowtail wing contour extension at lower hindwing edge
          const swallowTail =
            v > 0.72 && v < 0.94 && u > 0.68
              ? 0.16 * Math.sin(((v - 0.72) / 0.22) * Math.PI) * (u - 0.68) * 3.1
              : 0.0;
          outerSpan =
            0.6 * (1.0 - hindV * 0.45) +
            Math.sin(hindV * Math.PI * 3.0) * 0.05 +
            swallowTail;
        }

        const x = side * (0.032 + u * outerSpan);
        const z = -Math.sin(u * Math.PI) * 0.035 * (1.0 - v * 0.38);

        vertices.push(x, y, z);
        uvs.push(0.5 + side * u * 0.48, v);
      }
    }

    for (let r = 0; r < wingGridRows; r++) {
      for (let c = 0; c < wingGridCols; c++) {
        const i0 = wingStart + r * (wingGridCols + 1) + c;
        const i1 = i0 + 1;
        const i2 = wingStart + (r + 1) * (wingGridCols + 1) + c;
        const i3 = i2 + 1;

        if (side === 1) {
          indices.push(i0, i1, i2);
          indices.push(i1, i3, i2);
        } else {
          indices.push(i0, i2, i1);
          indices.push(i1, i2, i3);
        }
      }
    }

    // Slender 3D Curved Antennae extending from head
    const antennaSegments = 6;
    const antStart = vertices.length / 3;
    for (let k = 0; k <= antennaSegments; k++) {
      const s = k / antennaSegments;
      const ax = side * (0.016 + s * 0.088 + Math.sin(s * Math.PI * 0.6) * 0.02);
      const ay = 0.21 + s * 0.17;
      const az = 0.02 + Math.sin(s * Math.PI) * 0.04;
      const thick = Math.max(0.003, (1.0 - s * 0.65) * 0.006);

      vertices.push(ax, ay, az);
      uvs.push(0.5, 0.1);
      vertices.push(ax + side * thick, ay, az + thick);
      uvs.push(0.5, 0.1);
    }
    for (let k = 0; k < antennaSegments; k++) {
      const i0 = antStart + k * 2;
      const i1 = i0 + 1;
      const i2 = antStart + (k + 1) * 2;
      const i3 = i2 + 1;
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  cachedButterflyGeom = geom;
  return geom;
}

export default function HeroExperience({ burstTrigger = false }: HeroExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstTriggerRef = useRef(burstTrigger);

  useEffect(() => {
    burstTriggerRef.current = burstTrigger;
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, width < 768 ? 9.8 : 8.5);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "default",
      });
    } catch {
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      } catch {
        return;
      }
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0x000e26, 1.0);
    scene.add(ambientLight);

    const electricKey = new THREE.DirectionalLight(0x00f0ff, 4.4);
    electricKey.position.set(4, 7, 8);
    scene.add(electricKey);

    const cobaltFill = new THREE.DirectionalLight(0x0044ff, 3.2);
    cobaltFill.position.set(-6, -4, 5);
    scene.add(cobaltFill);

    const moonCenter = new THREE.PointLight(0x00ffff, 5.2, 32);
    moonCenter.position.set(0, 0, 3.5);
    scene.add(moonCenter);

    const shineKey = new THREE.PointLight(0xffffff, 4.5, 20);
    shineKey.position.set(0, 3, 5);
    scene.add(shineKey);

    // Optimized Sharp Sparkling Electric Blue Butterflies (Silky-Smooth 60 FPS)
    const isMobile = width < 768;
    const count = isMobile ? 180 : 420;
    const geom = getElectricButterflyGeometry();
    const texture = getShiningElectricButterflyTexture();

    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.06,
      metalness: 0.75,
      emissive: new THREE.Color(0x00f0ff),
      emissiveMap: texture,
      emissiveIntensity: 1.95,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.98,
    });

    const timeUniform = { value: 0 };

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = timeUniform;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `
        #include <common>
        uniform float uTime;
        attribute float aPhase;
        attribute float aFlapSpeed;
        attribute float aIsPerched;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>

        float wingDist = abs(position.x) - 0.03;
        if (wingDist > 0.0) {
          float effectiveSpeed = mix(aFlapSpeed, 1.6, aIsPerched);
          float flap = sin(uTime * effectiveSpeed + aPhase);

          transformed.z += flap * wingDist * 1.55;
          transformed.x = sign(position.x) * (0.03 + wingDist * cos(flap * 0.85));

          float wave = sin(uTime * effectiveSpeed + aPhase - position.y * 2.2);
          transformed.z += wave * wingDist * 0.35;
        } else {
          transformed.z += sin(uTime * 1.8 + aPhase) * 0.012;
        }
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
        #include <dithering_fragment>
        // Physically-based iridescent thin-film sheen
        vec3 vDir = normalize(vViewPosition);
        float fresnel = pow(clamp(1.0 - abs(dot(normalize(vNormal), vDir)), 0.0, 1.0), 2.6);
        vec3 iridGlaze = mix(vec3(0.0, 0.94, 1.0), vec3(0.52, 0.26, 1.0), fresnel);
        gl_FragColor.rgb += iridGlaze * fresnel * 0.42;
        `
      );
    };

    const phases = new Float32Array(count);
    const flapSpeeds = new Float32Array(count);
    const isPerchedAttr = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2;
      flapSpeeds[i] = 7.5 + Math.random() * 4.0;
      isPerchedAttr[i] = 0.0;
    }

    geom.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phases, 1));
    geom.setAttribute("aFlapSpeed", new THREE.InstancedBufferAttribute(flapSpeeds, 1));
    const perchedBufferAttr = new THREE.InstancedBufferAttribute(isPerchedAttr, 1);
    perchedBufferAttr.setUsage(THREE.DynamicDrawUsage);
    geom.setAttribute("aIsPerched", perchedBufferAttr);

    const instancedMesh = new THREE.InstancedMesh(geom, mat, count);
    scene.add(instancedMesh);

    const tintColor = new THREE.Color();
    const colors = [
      new THREE.Color(0x00ffff),
      new THREE.Color(0x00f0ff),
      new THREE.Color(0x00d0ff),
      new THREE.Color(0x0099ff),
      new THREE.Color(0x0066ff),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < count; i++) {
      const chosenColor = colors[i % colors.length];
      const lum = 0.95 + Math.random() * 0.2;
      tintColor.copy(chosenColor).multiplyScalar(lum);
      instancedMesh.setColorAt(i, tintColor);
    }
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }

    // Electric Blue Stardust Sparkle Particles
    const sparkleCount = 280;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let p = 0; p < sparkleCount; p++) {
      sparklePositions[p * 3] = (Math.random() - 0.5) * 16.0;
      sparklePositions[p * 3 + 1] = (Math.random() - 0.5) * 10.0;
      sparklePositions[p * 3 + 2] = (Math.random() - 0.5) * 5.0;
    }
    sparkleGeom.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const sparkleSystem = new THREE.Points(sparkleGeom, sparkleMat);
    scene.add(sparkleSystem);

    // Letter Perching Anchors for "V A R S H I T H"
    const letterAnchors: THREE.Vector3[] = [
      new THREE.Vector3(-3.4, 0.45, 0.35),
      new THREE.Vector3(-3.1, 0.1, 0.35),
      new THREE.Vector3(-2.8, -0.22, 0.35),
      new THREE.Vector3(-2.5, 0.15, 0.35),
      new THREE.Vector3(-2.25, 0.45, 0.35),

      new THREE.Vector3(-2.0, -0.2, 0.35),
      new THREE.Vector3(-1.7, 0.48, 0.35),
      new THREE.Vector3(-1.7, 0.12, 0.35),
      new THREE.Vector3(-1.4, -0.2, 0.35),

      new THREE.Vector3(-1.15, -0.2, 0.35),
      new THREE.Vector3(-1.15, 0.45, 0.35),
      new THREE.Vector3(-0.85, 0.45, 0.35),
      new THREE.Vector3(-0.7, 0.28, 0.35),
      new THREE.Vector3(-0.85, 0.12, 0.35),
      new THREE.Vector3(-0.6, -0.2, 0.35),

      new THREE.Vector3(-0.05, 0.45, 0.35),
      new THREE.Vector3(-0.3, 0.32, 0.35),
      new THREE.Vector3(-0.1, 0.14, 0.35),
      new THREE.Vector3(0.12, -0.04, 0.35),
      new THREE.Vector3(-0.15, -0.2, 0.35),

      new THREE.Vector3(0.4, 0.45, 0.35),
      new THREE.Vector3(0.4, -0.2, 0.35),
      new THREE.Vector3(0.7, 0.14, 0.35),
      new THREE.Vector3(1.0, 0.45, 0.35),
      new THREE.Vector3(1.0, -0.2, 0.35),

      new THREE.Vector3(1.45, 0.45, 0.35),
      new THREE.Vector3(1.45, 0.14, 0.35),
      new THREE.Vector3(1.45, -0.2, 0.35),

      new THREE.Vector3(1.85, 0.45, 0.35),
      new THREE.Vector3(2.1, 0.45, 0.35),
      new THREE.Vector3(2.35, 0.45, 0.35),
      new THREE.Vector3(2.1, 0.12, 0.35),
      new THREE.Vector3(2.1, -0.2, 0.35),

      new THREE.Vector3(2.65, 0.45, 0.35),
      new THREE.Vector3(2.65, -0.2, 0.35),
      new THREE.Vector3(2.95, 0.14, 0.35),
      new THREE.Vector3(3.25, 0.45, 0.35),
      new THREE.Vector3(3.25, -0.2, 0.35),
    ];

    const initialBursted = burstTriggerRef.current;
    let hasBursted = initialBursted;
    let burstStartTime = initialBursted ? 0 : -1;

    interface ButterflyInstance {
      pos: THREE.Vector3;
      burstDir: THREE.Vector3;
      burstSpeed: number;
      targetScale: number;
      currentScale: number;
      heading: number;
      pitch: number;
      speed: number;
      phase: number;
      state: "flying" | "landing" | "perched";
      assignedAnchor: number;
      restTimer: number;
      scareCooldown: number;
    }

    const butterflyData: ButterflyInstance[] = [];

    const fovRadInit = (camera.fov * Math.PI) / 360;
    const frustumHInit = Math.tan(fovRadInit) * camera.position.z;
    const frustumWInit = frustumHInit * camera.aspect;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.85;
      const dirX = Math.cos(phi) * Math.cos(theta);
      const dirY = Math.sin(phi);
      const dirZ = (Math.random() - 0.5) * 0.6;

      const targetScale = 0.045 + Math.random() * 0.055;

      // Distribute gracefully across the atmospheric 3D space
      let spawnX = (Math.random() - 0.5) * frustumWInit * 2.2;
      let spawnY = (Math.random() - 0.5) * frustumHInit * 2.2;
      let spawnZ = (Math.random() - 0.5) * 2.5;

      // Keep central typography "VARSHITH" clean and unobstructed
      if (Math.abs(spawnX) < 2.2 && Math.abs(spawnY) < 0.85) {
        spawnX += (Math.sign(spawnX) || 1) * (1.6 + Math.random() * 0.8);
      }

      const initialPos = new THREE.Vector3(spawnX, spawnY, spawnZ);

      // 38 butterflies with natural affinity to perch gracefully on the letters of "VARSHITH"
      const hasPerchAffinity = i < letterAnchors.length;
      const assignedAnchor = hasPerchAffinity ? i : -1;
      // Stagger arrival naturally: initial flight cooldown from 1s to 6s (60 to 360 frames)
      const initialCooldown = hasPerchAffinity ? 60 + Math.floor(Math.random() * 300) : 0;

      butterflyData.push({
        pos: initialPos,
        burstDir: new THREE.Vector3(dirX, dirY, dirZ).normalize(),
        burstSpeed: 0.01,
        targetScale: targetScale,
        currentScale: initialBursted ? targetScale : 0.0001,
        heading: Math.atan2(dirY, dirX),
        pitch: phi,
        speed: 0.0028 + Math.random() * 0.003,
        phase: phases[i],
        state: "flying",
        assignedAnchor: assignedAnchor,
        restTimer: 0,
        scareCooldown: initialCooldown,
      });
    }

    const dummy = new THREE.Object3D();

    // Pre-initialize all instanced matrices once on mount for zero per-frame churn during preloader
    for (let i = 0; i < count; i++) {
      dummy.position.copy(butterflyData[i].pos);
      dummy.scale.setScalar(initialBursted ? butterflyData[i].targetScale : 0.0001);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;

    // Asynchronously warm up WebGL shader pipeline without blocking the main thread
    const warmUpTimer = setTimeout(() => {
      try {
        renderer.compile(scene, camera);
      } catch {}
    }, 60);

    let mouse3D = new THREE.Vector3(999, 999, 0);
    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse3D.set(normX * 4.8, normY * 2.8, 0.35);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let currentScrollY = 0;
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !animId) {
          clock.start();
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onScroll = () => {
      currentScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Sinuous Swarm Animation Loop (Optimized 60 FPS)
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      timeUniform.value = time;

      // While preloader is running, only render idle stardust with 0 CPU overhead
      if (!hasBursted) {
        if (burstTriggerRef.current) {
          hasBursted = true;
          burstStartTime = time;
        } else {
          sparkleSystem.rotation.y = time * 0.015;
          sparkleSystem.rotation.x = time * 0.01;
          renderer.render(scene, camera);
          return;
        }
      }

      // Viewport boundaries
      const fovRad = (camera.fov * Math.PI) / 360;
      const frustumH = Math.tan(fovRad) * camera.position.z;
      const frustumW = frustumH * camera.aspect;
      const boundX = frustumW + 0.6;
      const boundY = frustumH + 0.6;

      sparkleSystem.rotation.y = time * 0.015;
      sparkleSystem.rotation.x = time * 0.01;

      const isScrolledPastHero = currentScrollY > 200;
      let perchedChanged = false;

      // Update Butterflies
      for (let i = 0; i < count; i++) {
        const b = butterflyData[i];

        // Smooth, elegant optical fade-in into serene atmospheric flight
        b.currentScale = THREE.MathUtils.lerp(b.currentScale, b.targetScale, 0.05);

        // Continuous Sinuous Flight across the hero section
        if (b.scareCooldown > 0) b.scareCooldown--;

        const distToMouse = b.pos.distanceTo(mouse3D);

        if (distToMouse < 1.6) {
          if (b.state === "perched" || b.state === "landing") {
            b.state = "flying";
            if (isPerchedAttr[i] !== 0.0) {
              isPerchedAttr[i] = 0.0;
              perchedChanged = true;
            }
            b.scareCooldown = 300;
          }

          const awayX = b.pos.x - mouse3D.x;
          const awayY = b.pos.y - mouse3D.y;
          const awayAngle = Math.atan2(awayY, awayX);
          let diff = awayAngle - b.heading;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          b.heading += diff * 0.06;

          b.pos.x += Math.cos(b.heading) * (b.speed * 2.2);
          b.pos.y += Math.sin(b.heading) * (b.speed * 2.2);
        } else if (b.state === "perched" && !isScrolledPastHero) {
          if (isPerchedAttr[i] !== 1.0) {
            isPerchedAttr[i] = 1.0;
            perchedChanged = true;
          }
          const anchor = letterAnchors[b.assignedAnchor];
          b.pos.x = anchor.x + Math.sin(time * 1.2 + b.phase) * 0.012;
          b.pos.y = anchor.y + Math.cos(time * 1.5 + b.phase) * 0.012;
          b.pos.z = anchor.z;

          // Restful breathing orientation while perched
          b.pitch = THREE.MathUtils.lerp(b.pitch, 0.05 * Math.sin(b.phase), 0.05);

          b.restTimer--;
          if (b.restTimer <= 0) {
            b.state = "flying";
            if (isPerchedAttr[i] !== 0.0) {
              isPerchedAttr[i] = 0.0;
              perchedChanged = true;
            }
            b.scareCooldown = 450 + Math.random() * 400;
          }
        } else if (
          b.assignedAnchor >= 0 &&
          b.scareCooldown <= 0 &&
          !isScrolledPastHero &&
          distToMouse > 2.2
        ) {
          if (isPerchedAttr[i] !== 0.0) {
            isPerchedAttr[i] = 0.0;
            perchedChanged = true;
          }
          const target = letterAnchors[b.assignedAnchor];
          const dx = target.x - b.pos.x;
          const dy = target.y - b.pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.16) {
            b.state = "perched";
            if (isPerchedAttr[i] !== 1.0) {
              isPerchedAttr[i] = 1.0;
              perchedChanged = true;
            }
            b.restTimer = 350 + Math.floor(Math.random() * 500);
          } else {
            b.state = "landing";
            const steerAngle = Math.atan2(dy, dx);
            let diff = steerAngle - b.heading;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            b.heading += diff * 0.035;

            // Gentle deceleration as it draws near for a realistic soft landing
            const approachDist = Math.min(dist / 0.75, 1.0);
            const approachSpeed = THREE.MathUtils.lerp(b.speed * 0.65, b.speed * 1.15, approachDist);

            b.pos.x += Math.cos(b.heading) * approachSpeed;
            b.pos.y += Math.sin(b.heading) * approachSpeed;
            b.pos.z += (target.z - b.pos.z) * 0.035;
          }
        } else {
          // Free Graceful Flight all over the screen
          if (isPerchedAttr[i] !== 0.0) {
            isPerchedAttr[i] = 0.0;
            perchedChanged = true;
          }
          b.heading +=
            (Math.sin(time * 1.2 + b.phase) + (Math.random() - 0.5) * 0.3) * 0.02;
          b.pitch +=
            (Math.cos(time * 1.3 + b.phase) + (Math.random() - 0.5) * 0.25) * 0.015;

          const vx = Math.cos(b.heading) * b.speed;
          const vy =
            Math.sin(b.heading) * b.speed +
            Math.sin(time * 5.0 + b.phase) * 0.002;
          const vz = Math.sin(b.pitch) * b.speed * 0.5;

          b.pos.x += vx;
          b.pos.y += vy;
          b.pos.z += vz;
        }

        // Viewport boundary wrapping across the entire screen
        if (b.pos.x > boundX) {
          b.pos.x = -boundX;
          b.pos.y = (Math.random() - 0.5) * boundY * 1.9;
        } else if (b.pos.x < -boundX) {
          b.pos.x = boundX;
          b.pos.y = (Math.random() - 0.5) * boundY * 1.9;
        }
        if (b.pos.y > boundY) {
          b.pos.y = -boundY;
          b.pos.x = (Math.random() - 0.5) * boundX * 1.9;
        } else if (b.pos.y < -boundY) {
          b.pos.y = boundY;
          b.pos.x = (Math.random() - 0.5) * boundX * 1.9;
        }

        if (b.pos.z > 2.0) {
          b.pos.z = 2.0;
          b.pitch -= 0.03;
        }
        if (b.pos.z < -1.5) {
          b.pos.z = -1.5;
          b.pitch += 0.03;
        }

        dummy.position.copy(b.pos);
        const roll = b.state === "perched"
          ? Math.sin(time * 1.6 + b.phase) * 0.1
          : Math.sin(time * 3.5 + b.phase) * 0.22;
        dummy.rotation.set(b.pitch, roll, b.heading);
        dummy.scale.setScalar(b.currentScale);
        dummy.updateMatrix();

        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      if (perchedChanged) {
        perchedBufferAttr.needsUpdate = true;
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 9.8 : 8.5;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(warmUpTimer);
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mat.dispose();
      sparkleGeom.dispose();
      sparkleMat.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
  );
}
