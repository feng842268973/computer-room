import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {createAllTypeGeometry} from '@/util/type'
export const main = (container, option, object) => {
  const canvas = document.getElementById(container);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: option.antialias
  });
  renderer.setClearColor(option.clearColor, option.clearColorOpacity)
  const grider = new THREE.GridHelper(100, 100)
  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 250, 250);
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 0, 0);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 0;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;
  const scene = new THREE.Scene();
  if(option.showHelpGrid) {
    scene.add(grider)
  }
  const helper = new THREE.AxesHelper(100)
  scene.add(helper)
  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }
  object.forEach(obj => {
    if(obj.show) {
        scene.add(createAllTypeGeometry(obj))
    }
  })
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }


    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
};
