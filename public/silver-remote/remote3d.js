/**
 * Silver Remote — Interactive 3D Apple TV Remote
 * Three.js scene with realistic aluminum remote model
 */

function initRemote3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const W = container.clientWidth;
  const H = container.clientHeight || 500;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100);
  camera.position.set(0, 0, 8);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xc0c8ff, 0.4);
  fillLight.position.set(-3, 2, 2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
  rimLight.position.set(0, -2, -4);
  scene.add(rimLight);

  // Environment map for reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x333340);
  // Add some colored planes to create interesting reflections
  const envGeo = new THREE.PlaneGeometry(20, 20);
  const topPlane = new THREE.Mesh(envGeo, new THREE.MeshBasicMaterial({ color: 0xeeeef0 }));
  topPlane.position.set(0, 8, 0);
  topPlane.rotation.x = Math.PI / 2;
  envScene.add(topPlane);
  const bottomPlane = new THREE.Mesh(envGeo, new THREE.MeshBasicMaterial({ color: 0x222228 }));
  bottomPlane.position.set(0, -8, 0);
  bottomPlane.rotation.x = -Math.PI / 2;
  envScene.add(bottomPlane);
  const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;

  // Materials
  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d4,
    metalness: 0.85,
    roughness: 0.18,
    envMap: envMap,
    envMapIntensity: 0.8,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1c,
    metalness: 0.3,
    roughness: 0.5,
    envMap: envMap,
    envMapIntensity: 0.3,
  });

  const centerBtnMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8bc,
    metalness: 0.7,
    roughness: 0.2,
    envMap: envMap,
    envMapIntensity: 0.6,
  });

  const dotMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.5,
    transparent: true,
    opacity: 0.5,
  });

  const textMat = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    metalness: 0.1,
    roughness: 0.6,
  });

  // Remote group
  const remote = new THREE.Group();

  // Body dimensions (proportional to real remote ~4:1 ratio)
  const bodyW = 0.9;
  const bodyH = 3.6;
  const bodyD = 0.25;
  const bodyR = 0.15; // corner radius

  // Create rounded rectangle body using ExtrudeGeometry
  const bodyShape = new THREE.Shape();
  const bw = bodyW / 2;
  const bh = bodyH / 2;
  const r = bodyR;
  bodyShape.moveTo(-bw + r, -bh);
  bodyShape.lineTo(bw - r, -bh);
  bodyShape.quadraticCurveTo(bw, -bh, bw, -bh + r);
  bodyShape.lineTo(bw, bh - r);
  bodyShape.quadraticCurveTo(bw, bh, bw - r, bh);
  bodyShape.lineTo(-bw + r, bh);
  bodyShape.quadraticCurveTo(-bw, bh, -bw, bh - r);
  bodyShape.lineTo(-bw, -bh + r);
  bodyShape.quadraticCurveTo(-bw, -bh, -bw + r, -bh);

  const extrudeSettings = {
    depth: bodyD,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 8,
  };

  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  bodyGeo.center();
  const bodyMesh = new THREE.Mesh(bodyGeo, aluminumMat);
  remote.add(bodyMesh);

  // D-pad ring (dark circle, slightly raised)
  const dpadY = 0.7;
  const dpadR = 0.38;
  const dpadGeo = new THREE.CylinderGeometry(dpadR, dpadR, 0.03, 48);
  const dpadMesh = new THREE.Mesh(dpadGeo, darkMat);
  dpadMesh.position.set(0, dpadY, bodyD / 2 + 0.04);
  dpadMesh.rotation.x = Math.PI / 2;
  remote.add(dpadMesh);

  // Center button (silver, raised)
  const cbR = 0.14;
  const cbGeo = new THREE.CylinderGeometry(cbR, cbR, 0.04, 48);
  const cbMesh = new THREE.Mesh(cbGeo, centerBtnMat);
  cbMesh.position.set(0, dpadY, bodyD / 2 + 0.06);
  cbMesh.rotation.x = Math.PI / 2;
  remote.add(cbMesh);

  // Direction dots on d-pad
  const dotR = 0.015;
  const dotGeo = new THREE.SphereGeometry(dotR, 12, 12);
  const dotOffset = dpadR - 0.06;
  const dotPositions = [
    [0, dpadY + dotOffset, bodyD / 2 + 0.06],   // up
    [0, dpadY - dotOffset, bodyD / 2 + 0.06],   // down
    [-dotOffset, dpadY, bodyD / 2 + 0.06],       // left
    [dotOffset, dpadY, bodyD / 2 + 0.06],        // right
  ];
  dotPositions.forEach(pos => {
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(...pos);
    remote.add(dot);
  });

  // MENU button
  const btnR = 0.13;
  const btnY = -0.25;
  const btnGeo = new THREE.CylinderGeometry(btnR, btnR, 0.03, 48);

  const menuBtn = new THREE.Mesh(btnGeo, darkMat);
  menuBtn.position.set(-0.22, btnY, bodyD / 2 + 0.04);
  menuBtn.rotation.x = Math.PI / 2;
  remote.add(menuBtn);

  // Play/Pause button
  const playBtn = new THREE.Mesh(btnGeo, darkMat);
  playBtn.position.set(0.22, btnY, bodyD / 2 + 0.04);
  playBtn.rotation.x = Math.PI / 2;
  remote.add(playBtn);

  // MENU text (using a small plane with canvas texture)
  function createTextTexture(text, fontSize) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 128, 64);
    ctx.fillStyle = '#cccccc';
    ctx.font = `${fontSize || 24}px -apple-system, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 64, 32);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  const menuTexture = createTextTexture('MENU', 20);
  const menuLabelGeo = new THREE.PlaneGeometry(0.18, 0.09);
  const menuLabelMat = new THREE.MeshBasicMaterial({
    map: menuTexture,
    transparent: true,
    depthWrite: false,
  });
  const menuLabel = new THREE.Mesh(menuLabelGeo, menuLabelMat);
  menuLabel.position.set(-0.22, btnY, bodyD / 2 + 0.06);
  remote.add(menuLabel);

  const playTexture = createTextTexture('\u25B6 II', 22);
  const playLabelGeo = new THREE.PlaneGeometry(0.18, 0.09);
  const playLabelMat = new THREE.MeshBasicMaterial({
    map: playTexture,
    transparent: true,
    depthWrite: false,
  });
  const playLabel = new THREE.Mesh(playLabelGeo, playLabelMat);
  playLabel.position.set(0.22, btnY, bodyD / 2 + 0.06);
  remote.add(playLabel);

  // Back side — battery compartment circle
  const backCircleGeo = new THREE.RingGeometry(0.18, 0.22, 48);
  const backCircleMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c4,
    metalness: 0.6,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const backCircle = new THREE.Mesh(backCircleGeo, backCircleMat);
  backCircle.position.set(0, -0.3, -(bodyD / 2 + 0.05));
  remote.add(backCircle);

  // Battery slot line
  const slotShape = new THREE.Shape();
  slotShape.moveTo(-0.015, -0.08);
  slotShape.lineTo(0.015, -0.08);
  slotShape.quadraticCurveTo(0.015, -0.08, 0.015, -0.06);
  slotShape.lineTo(0.015, 0.06);
  slotShape.quadraticCurveTo(0.015, 0.08, -0.015, 0.08);
  slotShape.lineTo(-0.015, 0.06);
  slotShape.quadraticCurveTo(-0.015, -0.08, -0.015, -0.08);
  const slotGeo = new THREE.ShapeGeometry(slotShape);
  const slotMat = new THREE.MeshStandardMaterial({
    color: 0xa8a8ac,
    metalness: 0.5,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const slot = new THREE.Mesh(slotGeo, slotMat);
  slot.position.set(0, -0.3, -(bodyD / 2 + 0.053));
  remote.add(slot);

  // Tilt the remote slightly
  remote.rotation.x = -0.1;
  remote.rotation.y = -0.3;
  scene.add(remote);

  // Mouse/touch interaction
  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  let rotationVelocityY = 0;
  let rotationVelocityX = 0;
  let autoRotate = true;

  renderer.domElement.addEventListener('pointerdown', (e) => {
    isDragging = true;
    autoRotate = false;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    renderer.domElement.style.cursor = 'grabbing';
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - previousMouseX;
    const dy = e.clientY - previousMouseY;
    rotationVelocityY = dx * 0.008;
    rotationVelocityX = dy * 0.005;
    remote.rotation.y += rotationVelocityY;
    remote.rotation.x += rotationVelocityX;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
    renderer.domElement.style.cursor = 'grab';
    // Resume auto-rotate after 3 seconds
    setTimeout(() => { autoRotate = true; }, 3000);
  });

  renderer.domElement.style.cursor = 'grab';

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    if (autoRotate) {
      remote.rotation.y += 0.004;
    } else if (!isDragging) {
      // Damping
      rotationVelocityY *= 0.95;
      rotationVelocityX *= 0.95;
      remote.rotation.y += rotationVelocityY;
      remote.rotation.x += rotationVelocityX;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight || 500;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}
