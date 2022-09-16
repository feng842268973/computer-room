import * as THREE from "three";
export default class Window {
    constructor(arg) {
        for(let x in arg) {
            this[x] = arg[x]
        }
    }
    createMesh() {
        const geometry = new THREE.BoxGeometry( this.width, this.height, this.depth, this.widthSegments, this.heightSegments, this.depthSegments );
        const material = new THREE.MeshBasicMaterial( {color: this.color, side: THREE.DoubleSide} );
        const box = new THREE.Mesh( geometry, material );
        material.dispose()
        geometry.dispose()
        box.position.set(this.x, this.y, this.z)
        box.rotation.x = this.rotation.x
        box.rotation.y = this.rotation.y
        box.rotation.z = this.rotation.z
        return box
    }
}