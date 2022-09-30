<template>
  <div class="engine-room">
    <div id="canvas-box">

    </div>
  </div>
</template>

<script>
import {main} from '@/util/index'
import {objects} from './object'
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
            clearColor: 0xaaaaaa,
            clearColorOpacity: 1,
        }, this.objects)
    }
}
</script>

<style lang="scss" scoped>
.engine-room {
    #canvas-box {
        width: 100vw;
        height: 100vh;
        position: relative;
    }
}
</style>