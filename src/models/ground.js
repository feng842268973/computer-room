import * as THREE from "three";
export default class Ground {
    constructor(arg) {
        for(let x in arg) {
            this[x] = arg[x]
        }
    }
    createMesh() {
        const geometry = new THREE.PlaneGeometry( this.width, this.height, this.widthSegments, this.heightSegments );
        let material = null
        if(this.name == 'ground') {
            material = new THREE.MeshLambertMaterial( {color: this.color, side: THREE.DoubleSide} );
        } else {
            material = new THREE.MeshBasicMaterial( {color: this.color, side: THREE.DoubleSide} );
        }
        const plane = new THREE.Mesh( geometry, material );
        plane.receiveShadow = true
        geometry.dispose()
        material.dispose()
        plane.position.set(this.x, this.y, this.z)
        plane.rotation.x = this.rotation.x
        plane.rotation.y = this.rotation.y
        plane.rotation.z = this.rotation.z
        return plane
    }
}