<template>
  <div>
    <div class="h-2rem fixed z-100 w-100 d-flex 2rem item-center" :class="bgBreadcrumb">
      <p class="ml-2">
        <span class="pointer el-breadcrumb-hover" :class="animationText" @click="gotoFolder(1)">homepage</span>
        <span class="pointer el-icon-arrow-right el-breadcrumb-hover" @click="gotoFolder(1)">promotion management</span>
        <span class="pointer el-icon-arrow-right el-breadcrumb-hover" @click="gotoFolder(1)">promotion list</span>
        <span class="pointer el-icon-arrow-right el-breadcrumb-hover" @click="gotoFolder(0)">image</span>
      </p>
    </div>

    <el-row  class="mt-tool-navbar" v-if="!isInMyCollection">
      <div class="el-col-2 mt-2">
        <img @click="changeIsMyCollection(true)" class="w-100 max-h-100 pointer hover-shadow" :src="iconImage">
      </div>
      <div class="el-col-2 mt-2" :key="o" v-for="(o) of 30">
        <img @click="changeIsMyCollection(false)" class="w-100 max-h-100 pointer hover-shadow" :src="iconFolder">
        <div class="text-center"><span>Task #1</span></div>
      </div>
    </el-row>
    <FolderImage class="mt-tool-navbar" v-if="isInMyCollection"></FolderImage>
  </div>
</template>

<script>
import FolderImage from '@/components/FolderImage'
import iconImage from '@/assets/icon/icon_image.svg'
import iconFolder from '@/assets/icon/folder.svg'
export default {
  name: "Image",
  data() {
    return {
      iconImage,
      iconFolder,
      isInMyCollection : false,
      folderList: [1,2,3,4,5,6,7,8],
      bgBreadcrumb : 'bg-tool-gray',
      animationText: null
    }
  },
  components: {
    FolderImage
  },
  methods: {
    changeBgBreadcrumb(){
      this.bgBreadcrumb = this.isInMyCollection ? 'animation-from-white' : 'bg-tool-gray';
      // this.animationText = this.isInMyCollection ? ''
    },
    changeIsMyCollection(isMyCollection){
      this.isInMyCollection = isMyCollection
    },
    gotoFolder(folder){
        this.changeIsMyCollection(folder === 0)
    }
  },
  created() {
    this.changeBgBreadcrumb()
  },
  watch: {
    isInMyCollection: function () {
      this.changeBgBreadcrumb()
    }
  }
}
</script>

<style scoped>
span ::v-deep .el-breadcrumb__inner {
  color: #aaaaaa !important;
}
@keyframes background_to_white {
  0%   {background-color: white;color: #333333;}
}
.animation-from-white {
  background-color: #333;
  animation-name: background_to_white;
  animation-duration: 4s;
  color: lightyellow;
}
</style>
