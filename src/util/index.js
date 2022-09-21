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
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  const grider = new THREE.GridHelper(100, 100)
  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(150, 150, 250);
  // camera.up.set(0, 1, 0);
  camera.lookAt(0, 0, 0);
  const cameraHleper = new THREE.CameraHelper(camera)
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
  // scene.add(helper)
  // scene.add(cameraHleper)
  {
    const spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 15, 200, 35 );
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 0.01;
    spotLight.distance = 2000;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.focus = 1;
    scene.add( spotLight );
    const lightHelper = new THREE.SpotLightHelper( spotLight );
		scene.add( lightHelper );
    const shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
		// scene.add( shadowCameraHelper );

  }
  object.forEach(async obj => {
    if(obj.show) {
      const geometry = await createAllTypeGeometry(obj) 
      if(geometry) {
        scene.add(geometry)
        geometry.dispose()
      }
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
  return scene
};
