import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {createAllTypeGeometry} from '@/util/type'
export const main = (id, option, object) => {
  const container = document.getElementById(id);
  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: option.antialias
  });
  container.appendChild(renderer.domElement); 
  
  
  const stats = new Stats();  
  stats.domElement.style.position = 'absolute'; 
  container.appendChild(stats.dom); 
  
  
  renderer.setClearColor(option.clearColor, option.clearColorOpacity)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  const grider = new THREE.GridHelper(100, 100)
  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 350, 150);
  const camera2 = new THREE.PerspectiveCamera(fov, aspect, near, 220);
  camera2.position.set(0, 350, 150);

  const cameraHelper = new THREE.CameraHelper(camera)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 0;
  controls.maxDistance = 1000;
  controls.target = new THREE.Vector3(0, -10, 0)
  controls.maxPolarAngle = Math.PI / 2;
  const scene = new THREE.Scene();
  if(option.showHelpGrid) {
    scene.add(grider)
  }
  const helper = new THREE.AxesHelper(100)
  // scene.add(helper)
  // scene.add(cameraHelper)
  {
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    const spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 15, 200, 35 );
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 0.01;
    spotLight.distance = 1000;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.focus = 1;
    scene.add( spotLight );
    const lightHelper = new THREE.SpotLightHelper( spotLight );
		// scene.add( lightHelper );
    const shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
		// scene.add( shadowCameraHelper );

  }
  object.forEach(async obj => {
    if(obj.show) {
      const geometry = await createAllTypeGeometry(obj) 
      if(geometry) {
        scene.add(geometry)
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

  
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  let INTERSECTED;
  function onPointerDown( event ) {
    pointer.x = ( event.clientX / canvas.width ) * 2 - 1;
    pointer.y = - ( event.clientY / canvas.height ) * 2 + 1;
  }
  window.addEventListener( 'mousemove', onPointerDown );
  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      camera2.updateProjectionMatrix();
    }

    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children, false );
    if(intersects.length) {
      console.log(intersects.length)
      console.log(intersects)
      intersects.forEach(item => {
        console.log(item.object.name)
      })
      if ( INTERSECTED != intersects[ 0 ].object ) {
        if(INTERSECTED && INTERSECTED.material.emissive) {
          INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        }

        if(intersects[ 0 ].object.name == 'ground' && intersects.length > 1) {
          INTERSECTED = intersects[ 1 ].object;
        } else {
          INTERSECTED = intersects[ 0 ].object;
        }
        console.log(INTERSECTED.name)
        if ( INTERSECTED.material.emissive ) {
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED.material.emissive.setHex( 0xff0000 );
        } else {
          
        }

      }
    } else {
      if ( INTERSECTED ) {
        if( INTERSECTED.material.emissive) {
          INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        } else {
          
        }
      }
      INTERSECTED = null
    }
    renderer.render(scene, camera);
    stats.update();
    controls.update()
    // cameraHelper.update();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  return scene
};
