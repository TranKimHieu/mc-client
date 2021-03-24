<template>
    <div class="tile is-ancestor h-100">
      <div class="tile is-10 is-vertical is-parent h-100 bg-images ">
        <div class="viewer-wrapper">
          <viewer :options="options" :images="images"
                  @inited="inited"
                  class="viewer" ref="viewer"
          >
            <template slot-scope="scope">
              <div class="images">
                <div class="image-wrapper" v-for="{source, thumbnail} in scope.images" :key="source">
                  <img class="image"
                       :src="thumbnail" :data-source="source" :alt="source.split('?image=').pop()"
                  >
                </div>
              </div>
            </template>
          </viewer>
        </div>
      </div>
    </div>
</template>

<script>
import test1 from '@/assets/test/test1.jpeg'
import test2 from '@/assets/test/test2.jpeg'
import test3 from '@/assets/test/test3.jpeg'
import test4 from '@/assets/test/test4.jpeg'
import test5 from '@/assets/test/test5.jpeg'
import test6 from '@/assets/test/test6.jpeg'
const sourceImages = []
for (let i = 0; i < 20; i++) {
  sourceImages.push({
    thumbnail: test1,
    source: test1
  })
  sourceImages.push({
    thumbnail: test2,
    source: test2
  })
  sourceImages.push({
    thumbnail: test3,
    source: test3
  })
  sourceImages.push({
    thumbnail: test4,
    source: test4
  })
  sourceImages.push({
    thumbnail: test5,
    source: test5
  })
  sourceImages.push({
    thumbnail: test6,
    source: test6
  })
}
export default {
  name: 'folderImage',
  data () {
    return {
      form: {
        view: 2,
        zoom: -0.1,
        zoomTo: 0.8,
        rotate: 90,
        rotateTo: 180,
        scaleX: 1,
        scaleY: 1
      },
      toggleOptions: [
        'button',
        'navbar',
        'title',
        'toolbar',
        'tooltip',
        'movable',
        'zoomable',
        'rotatable',
        'scalable',
        'transition',
        'fullscreen',
        'keyboard'
      ],
      options: {
        inline: false,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source'
      },
      images: [...sourceImages].splice(0, 100)
    }
  },
  computed: {
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
    view () {
      if (this.form.view >= 0 && this.form.view < this.images.length) {
        this.$viewer.view(this.form.view)
      }
    },
    zoom (value) {
      this.$viewer.zoom(value || this.form.zoom)
    },
    zoomTo () {
      this.$viewer.zoomTo(this.form.zoomTo)
    },
    rotate (value) {
      this.$viewer.rotate(value || this.form.rotate)
    },
    rotateTo () {
      this.$viewer.rotateTo(this.form.rotateTo)
    },
    scaleX (value) {
      if (value) {
        this.$viewer.scaleX(value)
      } else {
        this.form.scaleX = -this.form.scaleX
        this.$viewer.scaleX(this.form.scaleX)
      }
    },
    scaleY (value) {
      if (value) {
        this.$viewer.scaleY(value)
      } else {
        this.form.scaleY = -this.form.scaleY
        this.$viewer.scaleY(this.form.scaleY)
      }
    },
    full () {
      this.$viewer.full()
    },
    tooltip () {
      this.$viewer.tooltip()
    },
  }
}
</script>

<style scoped>
@keyframes background {
  0%   {background-color: white;}
}
.viewer-wrapper {
  position: relative;
  background: #333;
  animation-name: background;
  animation-duration: 4s;
}
.methods {
  margin-bottom: 1em;
  flex-wrap: wrap;
}
.methods > * {
  margin-right: 0.75rem;

}
.options-panel .panel-block {
    padding: 0;

}
.options-panel .checkbox {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.5em 0.75em;
}
.viewer {
  height: 100%;
}
.viewer .images {
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: auto;
    /*padding: 5px;*/
}
.images .image-wrapper {
  display: inline-block;
  /*width: calc(33% - 20px);*/
  margin: 5px 5px 0 5px;
  width: 20%;
}
.image-wrapper .image {
  width: 100%;
  cursor: pointer;
  display: inline-block;
}
.bg-images {
  background-color: #333 !important;
}
</style>
