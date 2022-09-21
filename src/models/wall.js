import * as THREE from "three";
export default class Ground {
    constructor(arg) {
        for(let x in arg) {
            this[x] = arg[x]
        }
    }
    createMesh() {
        const texture = new THREE.TextureLoader().load( '/static/texture/wall.jpg');
        const geometry = new THREE.PlaneGeometry( this.width, this.height, this.widthSegments, this.heightSegments );
        let material = null
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(100, 30)
        material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} )
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