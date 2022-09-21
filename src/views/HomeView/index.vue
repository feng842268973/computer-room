<template>
  <div class="engine-room">
    <canvas id="canvas-box">

    </canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import {main} from '@/util/index'
import {objects} from './object'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default {
  name: 'HomeView',
    data() {
        return {
            objects: [],
            scene: null,
        }
    },
    mounted() {
      this.objects = objects
      this.scene = main('canvas-box', {
            antialias: true,
            loadSyn: false,//是否启用异步加载
            showHelpGrid: false,//是否显示网格线
            clearColor: 0x002323,
            clearColorOpacity: 1,
        }, this.objects)
        const loader = new GLTFLoader();
        // loader.load('/static/models/shelves/scene.gltf', (gltf) => {
        //   gltf.scene.scale.set(10, 10, 10)
        //   gltf.scene.rotation.y = - Math.PI / 2
        //   gltf.scene.traverse((object) => {
        //       if (object.isMesh) {
        //         object.castShadow = true
        //         object.receiveShadow = true
        //       }
        //   })
        //   const box = new THREE.Box3().setFromObject(gltf.scene)
        //   let size = new THREE.Vector3()
        //   box.getSize(size)
        //   for(let i = 0; i < 10; i++) {
        //     const geometry = gltf.scene.clone()
        //     geometry.children.map((v, i) => {
        //       if(v.material) {
        //         v.material = gltf.scene.children[i].material.clone()
        //       }
        //     })
        //     geometry.position.x = - 60 + i * (size.x + 4)
        //     console.log(geometry)
        //     this.scene.add(geometry)
        //   }
        // })
    }
}
</script>

<style lang="scss" scoped>
.engine-room {
    #canvas-box {
        width: 80%;
        height: 800px;
    }
}
</style>