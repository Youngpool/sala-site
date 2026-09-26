import * as THREE from './vendor/three.module.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { DRACOLoader } from './vendor/DRACOLoader.js';

export async function initViewer(container) {
  if (!container || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container?.querySelector('.viewer-status')?.remove();
    return;
  }
  const canvas = container.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x17211c);
  scene.fog = new THREE.FogExp2(0x17211c, .00055);
  const camera = new THREE.PerspectiveCamera(38, 1, 1, 30000);
  camera.position.set(2300, 1900, 2600);
  scene.add(new THREE.HemisphereLight(0xf5ead0, 0x284538, 2.4));
  const sun = new THREE.DirectionalLight(0xffe2ae, 4); sun.position.set(800, 1600, 600); scene.add(sun);
  const root = new THREE.Group();
  root.scale.setScalar(.0254);
  scene.add(root);
  const draco = new DRACOLoader(); draco.setDecoderPath('/assets/draco/');
  const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
  const paths = Array.from({ length: 6 }, (_, i) => `/assets/models/sala-part-0${i + 1}.glb`);
  let cameraDistance = 3900;
  const addPart = async (url, first = false) => {
    const model = await loader.loadAsync(url);
    root.add(model.scene);
    root.position.set(0, 0, 0);
    const bounds = new THREE.Box3().setFromObject(root);
    const size = bounds.getSize(new THREE.Vector3());
    root.position.sub(bounds.getCenter(new THREE.Vector3()));
    cameraDistance = Math.max(120, size.length() * .85);
    model.scene.traverse(node => { if (node.isMesh) { node.castShadow = false; node.receiveShadow = true; } });
    if (first) {
      container.querySelector('.viewer-poster').classList.add('is-hidden');
      container.querySelector('.viewer-status')?.remove();
    }
  };
  await addPart(paths[0], true);
  for (const url of paths.slice(1)) {
    try { await addPart(url); } catch { /* Keep the verified parts already loaded. */ }
  }
  let targetX = 0, targetY = -.24, currentX = targetX, currentY = targetY, zoom = 1;
  let dragging = false, lastX = 0, lastY = 0, active = !document.hidden;
  const down = e => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture?.(e.pointerId); };
  const move = e => { if (!dragging) return; targetY += (e.clientX - lastX) * .004; targetX += (e.clientY - lastY) * .003; targetX = Math.max(-.45, Math.min(.45, targetX)); lastX = e.clientX; lastY = e.clientY; };
  const up = () => dragging = false;
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', e => { e.preventDefault(); zoom = Math.max(.65, Math.min(1.6, zoom + e.deltaY * .0005)); }, { passive: false });
  const resize = () => { const rect = container.getBoundingClientRect(); renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); };
  const ro = new ResizeObserver(resize); ro.observe(container); resize();
  document.addEventListener('visibilitychange', () => active = !document.hidden);
  function frame() { requestAnimationFrame(frame); if (!active) return; currentX += (targetX - currentX) * .06; currentY += (targetY - currentY) * .06; root.rotation.set(currentX, currentY, 0); camera.position.setLength(cameraDistance * zoom); camera.lookAt(0, 0, 0); renderer.render(scene, camera); }
  frame();
}
