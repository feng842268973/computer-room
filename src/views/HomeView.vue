<template>
  <div class="engine-room">
    <canvas id="canvas-box">

    </canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import {main} from '@/util/index'
export default {
  name: 'HomeView',
    data() {
        return {
            objects: []
        }
    },
    mounted() {
      this.objects = [
        {
          type: 'ground',
          name: 'ground',
          x: 0,
          y: 0,
          z: 0,
          rotation: {
            x: - Math.PI / 2,
            y: 0,
            z: 0,
          },
          show: true,
          width: 200,
          height: 100,
          color: 0x13e260,
          widthSegments: 10,
          heightSegments: 10,
        },
        {
          type: 'ground',
          name: 'top-wall',
          x: 0,
          y: 10,
          z: -50,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          show: true,
          width: 200,
          height: 20,
          color: 0xffffff,
          widthSegments: 10,
          heightSegments: 10,
        },
        {
          type: 'ground',
          name: 'bottom-wall',
          x: 0,
          y: 10,
          z: 50,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          show: true,
          width: 200,
          height: 20,
          color: 0xffffff,
          widthSegments: 10,
          heightSegments: 10,
        },
        {
          type: 'ground',
          name: 'left-wall',
          x: -100,
          y: 10,
          z: 0,
          rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0,
          },
          show: true,
          width: 100,
          height: 20,
          color: 0xffffff,
          widthSegments: 10,
          heightSegments: 10,
        },
        {
          type: 'ground',
          name: 'right-wall',
          x: 100,
          y: 10,
          z: 0,
          rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0,
          },
          show: true,
          width: 100,
          height: 20,
          color: 0xffffff,
          widthSegments: 10,
          heightSegments: 10,
        },
        {
          type: 'window',
          name: 'window1',
          x: 70,
          y: 10,
          z: -50,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          show: true,
          width: 10,
          height: 10,
          depth: 4,
          color: 0x000000,
          widthSegments: 10,
          heightSegments: 10,
          depthSegments: 10,
        },
        {
          type: 'window',
          name: 'window2',
          x: 30,
          y: 10,
          z: -50,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          show: true,
          width: 10,
          height: 10,
          depth: 4,
          color: 0x000000,
          widthSegments: 10,
          heightSegments: 10,
          depthSegments: 10,
        },
        {
          type: 'window',
          name: 'window3',
          x: -30,
          y: 10,
          z: -50,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          show: true,
          width: 10,
          height: 10,
          depth: 4,
          color: 0x000000,
          widthSegments: 10,
          heightSegments: 10,
          depthSegments: 10,
        },
        {
          type: 'window',
          name: 'window4',
          x: -70,
          y: 10,
          z: -50,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          show: true,
          width: 10,
          height: 10,
          depth: 4,
          color: 0x000000,
          widthSegments: 10,
          heightSegments: 10,
          depthSegments: 10,
        },
        {
          type: 'door',
          name: 'door',
          x: 0,
          y: 10,
          z: 50,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          show: true,
          width: 10,
          height: 20,
          depth: 4,
          widthSegments: 10,
          heightSegments: 10,
          depthSegments: 10,
          wrapS: THREE.RepeatWrapping,
          wrapT: THREE.RepeatWrapping,
        },
      ]
        main('canvas-box', {
            antialias: true,
            loadSyn: false,//是否启用异步加载
            showHelpGrid: false,//是否显示网格线
            clearColor: 0x002323,
            clearColorOpacity: 1,
        }, this.objects)
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