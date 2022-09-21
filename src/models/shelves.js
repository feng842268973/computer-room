import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default class Window {
    constructor(arg) {
        for(let x in arg) {
            this[x] = arg[x]
        }
    }
    async createMesh() {
        const loader = new GLTFLoader();
        const loadP =  () => {
            return new Promise((res, rej) => {
                loader.load('/static/models/shelves/scene.gltf', (gltf) => {
                    res(gltf)
                })
            })   
        }
        const gltf = await loadP()
        gltf.scene.scale.set(10, 10, 10)
        gltf.scene.traverse((object) => {
            if (object.isMesh) {
              object.castShadow = true
              object.receiveShadow = true
            }
        })
        const geometry = gltf.scene.clone()
        geometry.position.set(this.x, this.y, this.z)
        geometry.rotation.x = this.rotation.x
        geometry.rotation.y = this.rotation.y
        geometry.rotation.z = this.rotation.z
        geometry.children.map((v, i) => {
          if(v.material) {
            v.material = gltf.scene.children[i].material.clone()
          }
        })
        return geometry
    }
}