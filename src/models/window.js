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
                loader.load('/static/models/window/scene.gltf', (gltf) => {
                    res(gltf)
                })
            })   
        }
        const gltf = await loadP()
        gltf.scene.scale.set(0.1, 0.1, 0.8)
        const box = gltf.scene.clone()
        box.position.set(this.x, this.y, this.z)
        box.rotation.x = this.rotation.x
        box.rotation.y = this.rotation.y
        box.rotation.z = this.rotation.z
        box.name = this.name
        return box
    }
}