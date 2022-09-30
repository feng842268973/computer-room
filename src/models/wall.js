import * as THREE from "three";
export default class Ground {
    constructor(arg) {
        for(let x in arg) {
            this[x] = arg[x]
        }
    }
    createMesh() {
        const texture = new THREE.TextureLoader().load( '/static/texture/wall.jpg');
        const geometry = new THREE.BoxGeometry( this.width, this.height, this.depth , this.widthSegments, this.heightSegments, this.depthSegments );
        let material = null
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(100, 30)
        // 如果设置THREE.DoubleSide，raycaster会拾取对象两次
        material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.FrontSide} )
        const plane = new THREE.Mesh( geometry, material );
        plane.receiveShadow = true
        geometry.dispose()
        material.dispose()
        plane.position.set(this.x, this.y, this.z)
        plane.rotation.x = this.rotation.x
        plane.rotation.y = this.rotation.y
        plane.rotation.z = this.rotation.z
        plane.name = this.name
        return plane
    }
}