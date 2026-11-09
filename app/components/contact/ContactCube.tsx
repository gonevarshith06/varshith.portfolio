"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { VARSHITH_EMBLEM_DATA_URL } from "./varshithEmblem";

interface PlatformConfig {
  id: string;
  name: string;
  subtext: string;
  tag: string;
  neonColor: string;
  iconType: "github" | "linkedin" | "instagram" | "email" | "resume" | "whatsapp" | "varshith";
  url: string;
}

// Preload the Varshith metallic emblem
let cachedEmblemImg: HTMLImageElement | null = null;
if (typeof window !== "undefined") {
  cachedEmblemImg = new Image();
  cachedEmblemImg.src = VARSHITH_EMBLEM_DATA_URL;
}

// Iconic Brand & Luxury Obsidian Palette
const PLATFORMS: Record<string, PlatformConfig> = {
  front: {
    id: "github",
    name: "GitHub",
    subtext: "Explore Repositories",
    tag: "01 // DEV",
    neonColor: "#ffffff",
    iconType: "github",
    url: "https://github.com/gonevarshith06",
  },
  right: {
    id: "linkedin",
    name: "LinkedIn",
    subtext: "Connect Me",
    tag: "02 // NETWORK",
    neonColor: "#0a66c2",
    iconType: "linkedin",
    url: "https://www.linkedin.com/in/varshith-gone-9413293a0/",
  },
  back: {
    id: "instagram",
    name: "Instagram",
    subtext: "For Collaborations",
    tag: "03 // VISUAL",
    neonColor: "#e1306c",
    iconType: "instagram",
    url: "https://www.instagram.com/gone_varshith_reddy_/",
  },
  left: {
    id: "email",
    name: "Email Me",
    subtext: "Direct Transmission",
    tag: "04 // INBOX",
    neonColor: "#ff4d6d",
    iconType: "email",
    url: "mailto:varshithg94@gmail.com",
  },
  top: {
    id: "varshith",
    name: "Varshith",
    subtext: "Creative Technologist",
    tag: "05 // IDENTITY",
    neonColor: "#e2e8f0",
    iconType: "varshith",
    url: "#home",
  },
  bottom: {
    id: "whatsapp",
    name: "WhatsApp",
    subtext: "For Services & Build",
    tag: "06 // WHATSAPP",
    neonColor: "#25d366",
    iconType: "whatsapp",
    url: "https://wa.me/917065674284",
  },
};

// Create a high-end signature brand face texture on deep smoked obsidian glass
function createElegantFaceTexture(config: PlatformConfig): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  if (!ctx) return texture;

  // 1. Deep Smoked Obsidian Crystal Glass Base
  ctx.fillStyle = "#07080c";
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle Platform Signature Radial Glow
  const radialGlow = ctx.createRadialGradient(512, 512, 40, 512, 512, 490);
  radialGlow.addColorStop(0, `${config.neonColor}30`);
  radialGlow.addColorStop(0.45, `${config.neonColor}12`);
  radialGlow.addColorStop(0.85, "rgba(8, 10, 15, 0.88)");
  radialGlow.addColorStop(1, "rgba(4, 5, 8, 0.98)");
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. High-Tech Precision Outer Frame with Signature Brand Color
  ctx.save();
  ctx.strokeStyle = config.neonColor;
  ctx.lineWidth = 14;
  ctx.shadowColor = config.neonColor;
  ctx.shadowBlur = 32;

  ctx.beginPath();
  ctx.roundRect(46, 46, 932, 932, 68);
  ctx.stroke();

  // Corner precision registration brackets (Clean White Hot)
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#ffffff";
  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 14;

  // TL bracket
  ctx.beginPath();
  ctx.moveTo(46, 140);
  ctx.lineTo(46, 46);
  ctx.lineTo(140, 46);
  ctx.stroke();

  // TR bracket
  ctx.beginPath();
  ctx.moveTo(978, 140);
  ctx.lineTo(978, 46);
  ctx.lineTo(884, 46);
  ctx.stroke();

  // BL bracket
  ctx.beginPath();
  ctx.moveTo(46, 884);
  ctx.lineTo(46, 978);
  ctx.lineTo(140, 978);
  ctx.stroke();

  // BR bracket
  ctx.beginPath();
  ctx.moveTo(978, 884);
  ctx.lineTo(978, 978);
  ctx.lineTo(884, 978);
  ctx.stroke();

  // 3. Top Telemetry Label
  ctx.restore();
  ctx.save();
  ctx.font = "bold 24px 'Courier New', monospace";
  ctx.fillStyle = config.neonColor;
  ctx.shadowColor = config.neonColor;
  ctx.shadowBlur = 12;
  ctx.fillText(config.tag, 100, 122);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.fillText("STATUS: VERIFIED", 924, 122);

  ctx.beginPath();
  ctx.moveTo(100, 145);
  ctx.lineTo(924, 145);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 4. Centerpiece Emblem (Laser Etched with Platform Neon Bloom)
  if (config.iconType === "varshith") {
    const drawMetallicEmblem = (imgEl: HTMLImageElement) => {
      // Crop exactly to metallic emblem geometry (minX: 107, minY: 211, w: 862, h: 152)
      const cropX = 107;
      const cropY = 211;
      const cropW = 862;
      const cropH = 152;

      const off = document.createElement("canvas");
      off.width = cropW;
      off.height = cropH;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(imgEl, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

      try {
        const imgData = offCtx.getImageData(0, 0, cropW, cropH);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const maxChannel = Math.max(d[i], d[i + 1], d[i + 2]);
          // Luma-key: black background is completely transparent, metallic chrome shines
          if (maxChannel < 25) {
            d[i + 3] = 0;
          } else if (maxChannel < 85) {
            d[i + 3] = Math.round(((maxChannel - 25) / 60) * 255);
          }
        }
        offCtx.putImageData(imgData, 0, 0);
      } catch {
        // Fallback
      }

      // Draw high-resolution cropped emblem with soft silver platinum bloom
      ctx.save();
      ctx.shadowColor = "#e2e8f0";
      ctx.shadowBlur = 24;
      const destW = 840;
      const destH = Math.round((destW * cropH) / cropW); // ~148px
      const destX = (1024 - destW) / 2;
      const destY = 410; // Perfectly centered centerpiece
      ctx.drawImage(off, destX, destY, destW, destH);
      ctx.restore();

      texture.needsUpdate = true;
    };

    if (cachedEmblemImg && cachedEmblemImg.complete && cachedEmblemImg.naturalWidth > 0) {
      drawMetallicEmblem(cachedEmblemImg);
    } else {
      const img = new Image();
      img.onload = () => drawMetallicEmblem(img);
      img.src = VARSHITH_EMBLEM_DATA_URL;
    }
  } else {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = config.neonColor;
    ctx.shadowBlur = 45;
    ctx.translate(512, 420);

    if (config.iconType === "github") {
      // GitHub Octocat
      ctx.scale(3.5, 3.5);
      ctx.beginPath();
      ctx.arc(0, -6, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-24, -28);
      ctx.lineTo(-34, -50);
      ctx.lineTo(-14, -36);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(24, -28);
      ctx.lineTo(34, -50);
      ctx.lineTo(14, -36);
      ctx.closePath();
      ctx.fill();
    } else if (config.iconType === "linkedin") {
      // LinkedIn Glyph in signature blue
      ctx.scale(3.4, 3.4);
      ctx.fillStyle = config.neonColor;
      ctx.beginPath();
      ctx.roundRect(-42, -42, 84, 84, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 56px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("in", 0, 4);
    } else if (config.iconType === "instagram") {
      // Instagram Camera Glyph in sunset rose
      ctx.scale(3.4, 3.4);
      ctx.lineWidth = 9;
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(-42, -42, 84, 84, 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(23, -23, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    } else if (config.iconType === "email") {
      // Email Envelope Glyph
      ctx.scale(3.4, 3.4);
      ctx.lineWidth = 9;
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(-48, -34, 96, 68, 16);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-46, -32);
      ctx.lineTo(0, 8);
      ctx.lineTo(46, -32);
      ctx.stroke();
    } else {
      // Official WhatsApp Brand Emblem via SVG Path2D
      if (typeof Path2D !== "undefined") {
        ctx.save();
        // FontAwesome official WhatsApp brand glyph (viewBox 0 0 448 512, centered at 224, 256)
        const scale = 0.52;
        ctx.scale(scale, scale);
        ctx.translate(-224, -256);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = config.neonColor;
        ctx.shadowBlur = 45;
        const whatsappGlyph = new Path2D(
          "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.6 66.4 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
        );
        ctx.fill(whatsappGlyph);
        ctx.restore();
      }
    }
    ctx.restore();
  }

  // 5. Typography: Bold White Title & Platform Subtext
  ctx.save();
  ctx.textAlign = "center";

  if (config.iconType !== "varshith") {
    // Name (Pristine Laser White)
    ctx.font = "900 80px 'Courier New', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = config.neonColor;
    ctx.shadowBlur = 32;
    ctx.fillText(config.name.toUpperCase(), 512, 690);

    // Subtext (Platform Signature Color)
    ctx.font = "bold 34px sans-serif";
    ctx.fillStyle = config.neonColor;
    ctx.shadowColor = config.neonColor;
    ctx.shadowBlur = 16;
    ctx.fillText(config.subtext.toUpperCase(), 512, 755);
  } else {
    // Subtext for Varshith identity face
    ctx.font = "bold 34px sans-serif";
    ctx.fillStyle = config.neonColor;
    ctx.shadowColor = config.neonColor;
    ctx.shadowBlur = 16;
    ctx.fillText(config.subtext.toUpperCase(), 512, 660);
  }

  // Minimalist Frosted CTA Pill
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.roundRect(310, 815, 404, 74, 37);
  ctx.fill();
  ctx.strokeStyle = config.neonColor;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = config.neonColor;
  ctx.shadowBlur = 18;
  ctx.stroke();

  ctx.font = "bold 26px monospace";
  ctx.fillStyle = "#ffffff";
  const ctaText = config.iconType === "varshith" ? "EXPLORE IDENTITY ↗" : "OPEN TRANSMISSION ↗";
  ctx.fillText(ctaText, 512, 862);

  ctx.restore();

  return texture;
}

export default function ContactCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePlatform, setActivePlatform] = useState<PlatformConfig>(PLATFORMS.front);

  const triggerLaunch = (platform: PlatformConfig) => {
    if (platform.url.startsWith("#")) {
      const el = document.querySelector(platform.url);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (platform.url.startsWith("http")) {
      window.open(platform.url, "_blank", "noopener,noreferrer");
    } else if (platform.url.startsWith("mailto:")) {
      window.location.href = platform.url;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Studio Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 1.4);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Inner Glowing Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const innerCoreGeom = new THREE.SphereGeometry(0.32, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeom, innerCoreMat);
    coreGroup.add(innerCoreMesh);

    const outerCoreAuraGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const outerCoreAuraMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const outerCoreAuraMesh = new THREE.Mesh(outerCoreAuraGeom, outerCoreAuraMat);
    coreGroup.add(outerCoreAuraMesh);

    // Luminous Quantum Orbital Ring inside Core
    const ringGeom = new THREE.TorusGeometry(0.56, 0.012, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    const coreLight = new THREE.PointLight(0xffffff, 1.2, 5);
    coreGroup.add(coreLight);

    // High-Resolution Elegant Solid Face Textures
    const textures = {
      right: createElegantFaceTexture(PLATFORMS.right),
      left: createElegantFaceTexture(PLATFORMS.left),
      top: createElegantFaceTexture(PLATFORMS.top),
      bottom: createElegantFaceTexture(PLATFORMS.bottom),
      front: createElegantFaceTexture(PLATFORMS.front),
      back: createElegantFaceTexture(PLATFORMS.back),
    };

    // Helper to create polished luxury obsidian crystal face material
    const createFaceMat = (tex: THREE.CanvasTexture) =>
      new THREE.MeshPhysicalMaterial({
        map: tex,
        emissiveMap: tex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.38,
        roughness: 0.12,
        metalness: 0.22,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        transmission: 0.58,
        ior: 1.52,
        transparent: true,
        opacity: 0.96,
      });

    // 6 Faces in standard Three.js order:
    // 0: +X (Right: LinkedIn)
    // 1: -X (Left: Email)
    // 2: +Y (Top: Resume)
    // 3: -Y (Bottom: WhatsApp)
    // 4: +Z (Front: GitHub)
    // 5: -Z (Back: Instagram)
    const faceMaterials: THREE.MeshPhysicalMaterial[] = [
      createFaceMat(textures.right),
      createFaceMat(textures.left),
      createFaceMat(textures.top),
      createFaceMat(textures.bottom),
      createFaceMat(textures.front),
      createFaceMat(textures.back),
    ];

    // Single Monolithic Solid Cube
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const cubeSize = 2.05;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMesh = new THREE.Mesh(cubeGeometry, faceMaterials);
    cubeGroup.add(cubeMesh);

    // Expose for inspection and verified automated testing
    if (typeof window !== "undefined") {
      (window as any).__contactCube = { cubeGroup, cubeMesh, textures, PLATFORMS };
    }

    // Platinum Silver Chamfer Edges
    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const wireframeMesh = new THREE.LineSegments(edgesGeometry, wireframeMaterial);
    cubeGroup.add(wireframeMesh);

    // Drag, Touch, & Deterministic Click Handling
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0.003;
    let velY = 0.002;
    let startPointerPos = { x: 0, y: 0 };
    let pointerDownTime = 0;

    const domEl = renderer.domElement;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      pointerDownTime = Date.now();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
      startPointerPos = { x: clientX, y: clientY };
      velX = 0;
      velY = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      velX = deltaX * 0.006;
      velY = deltaY * 0.006;

      cubeGroup.rotation.y += velX;
      cubeGroup.rotation.x += velY;

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "changedTouches" in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
      const dist = Math.hypot(clientX - startPointerPos.x, clientY - startPointerPos.y);
      const timeDiff = Date.now() - pointerDownTime;

      isDragging = false;

      // If released with minimal motion within 450ms, handle as a deterministic Face Click!
      if (dist < 10 && timeDiff < 450) {
        handleRaycastClick(clientX, clientY);
      }
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleRaycastClick = (clientX: number, clientY: number) => {
      const rect = domEl.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cubeMesh);

      if (intersects.length > 0 && typeof intersects[0].faceIndex === "number") {
        const sideIndex = Math.floor(intersects[0].faceIndex / 2);
        const platformsList = [
          PLATFORMS.right,  // 0: LinkedIn
          PLATFORMS.left,   // 1: Email
          PLATFORMS.top,    // 2: Resume
          PLATFORMS.bottom, // 3: WhatsApp
          PLATFORMS.front,  // 4: GitHub
          PLATFORMS.back,   // 5: Instagram
        ];
        const selected = platformsList[sideIndex];
        if (selected) {
          setActivePlatform(selected);
          triggerLaunch(selected);

          
        }
      }
    };

    domEl.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    domEl.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Initial Isometric Orientation
    cubeGroup.rotation.x = 0.28;
    cubeGroup.rotation.y = -0.45;

    let animId: number = 0;
    let isVisible = true;
    let clock = new THREE.Clock();
    let currentPlatformId = "github";

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
    observer.observe(container);

    const animate = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia & Damping
      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        cubeGroup.rotation.y += velX;
        cubeGroup.rotation.x += velY;

        // Subtle ambient floating drift
        cubeGroup.rotation.y += 0.0022;
      }

      cubeGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Soft Pulse on Core & Luminous Orbital Ring
      const pulse = 1.0 + Math.sin(elapsedTime * 3.0) * 0.08;
      coreGroup.scale.setScalar(pulse);
      ringMesh.rotation.z = elapsedTime * 1.2;
      ringMesh.rotation.y = elapsedTime * 0.7;

      // Determine which face is pointing most towards the user
      const forwardVec = new THREE.Vector3(0, 0, 1);
      const currentNormal = forwardVec.clone().applyQuaternion(cubeGroup.quaternion.clone().invert());

      const nx = currentNormal.x;
      const ny = currentNormal.y;
      const nz = currentNormal.z;
      const absX = Math.abs(nx);
      const absY = Math.abs(ny);
      const absZ = Math.abs(nz);

      if (!isDragging) {
        let nextPlatform = PLATFORMS.front;
        if (absZ >= absX && absZ >= absY) {
          nextPlatform = nz > 0 ? PLATFORMS.front : PLATFORMS.back;
        } else if (absX >= absY && absX >= absZ) {
          nextPlatform = nx > 0 ? PLATFORMS.right : PLATFORMS.left;
        } else {
          nextPlatform = ny > 0 ? PLATFORMS.top : PLATFORMS.bottom;
        }

        if (currentPlatformId !== nextPlatform.id) {
          currentPlatformId = nextPlatform.id;
          setActivePlatform(nextPlatform);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const newW = container.clientWidth || 460;
      const newH = container.clientHeight || 460;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      domEl.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      domEl.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      innerCoreGeom.dispose();
      innerCoreMat.dispose();
      outerCoreAuraGeom.dispose();
      outerCoreAuraMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      cubeGeometry.dispose();
      edgesGeometry.dispose();
      wireframeMaterial.dispose();
      faceMaterials.forEach((m) => m.dispose());
      Object.values(textures).forEach((t) => t.dispose());
      if (domEl.parentNode) domEl.parentNode.removeChild(domEl);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-lg mx-auto select-none">
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-[320px] sm:max-w-[420px] md:max-w-[480px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
      >
        {/* Soft Ambient Radial Backlight dynamically matching active platform color */}
        <div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-35 pointer-events-none transition-colors duration-700"
          style={{ background: activePlatform.neonColor }}
        />
      </div>

      {/* Subtle Drag & Click Instruction */}
      <span className="mt-4 text-[10px] font-mono tracking-[0.24em] uppercase text-zinc-500">
        Drag to rotate • Click face to visit
      </span>
    </div>
  );
}