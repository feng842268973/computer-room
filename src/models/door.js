import * as THREE from "three";
export default class Door {
    constructor(arg) {
        for(let x in arg) {
            this[x] = arg[x]
        }
    }
    createMesh() {
        const texture = new THREE.TextureLoader().load( '/static/texture/door.jpg');
        // texture.wrapS = this.wrapS
        // texture.wrapT = this.wrapT
        // texture.repeat.set(1,1)
        const geometry = new THREE.BoxGeometry( this.width, this.height, this.depth, this.widthSegments, this.heightSegments, this.depthSegments);
        const material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} )
        const materials = [
            material, material, material, material,
            new THREE.MeshBasicMaterial( {map: texture} ),
            material
        ]
        const box = new THREE.Mesh( geometry, materials );
        material.dispose()
        texture.dispose()
        geometry.dispose()
        box.position.set(this.x, this.y, this.z)
        box.rotation.x = this.rotation.x
        box.rotation.y = this.rotation.y
        box.rotation.z = this.rotation.z
        box.name = this.name
        return box
    }
}