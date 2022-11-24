<template>
    <div class="tile is-ancestor">
      <div class="tile is-10 is-vertical is-parent h-100 bg-images scroll-auto">
        <div class="viewer-wrapper h-100">
          <viewer :options="options" :images="images"
                  @inited="inited"
                  class="viewer" ref="viewer"
          >
            <template slot-scope="scope">
              <div class="images">
                <div class="image-wrapper" v-for="{id, url} in scope.images" :key="id">
                  <img class="image"
                       :src="url" :data-source="url" :alt="id"
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
      images: []
    }
  },
  props: {
    imageSource: Array
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
  },
  created() {
    this.images = this.imageSource
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
