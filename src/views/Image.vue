<template>
  <div>
    <div class="h-2rem fixed z-100 w-100 d-flex 2rem item-center item-space-between " :class="bgBreadcrumb">
      <div class="ml-2">
        <span class="pointer el-breadcrumb-hover" :class="animationText" @click="gotoFolder(1)">Task f0</span>
        <span class="pointer el-icon-arrow-right el-breadcrumb-hover" @click="gotoFolder(1)">Task f1</span>
        <span class="pointer el-icon-arrow-right el-breadcrumb-hover" @click="gotoFolder(1)">Task f2</span>
        <span class="pointer el-icon-arrow-right el-breadcrumb-hover" @click="gotoFolder(0)"><i class="el-icon-picture-outline"></i></span>
      </div>

      <div v-if="!isInMyCollection" class="el-col-3 h-100">
        <el-input placeholder="Search" class="h-100">
          <i slot="prefix" class="el-input__icon el-icon-search h-100"></i>
        </el-input>
      </div>
    </div>

    <el-row  class="mt-2rem" v-if="!isInMyCollection">
      <div class="el-col-2 mt-2">
        <img  @click="gotoFolder(0)" class="w-100 max-h-100 pointer hover-shadow" :src="iconImage">
      </div>
      <div class="el-col-2 mt-2" :key="o" v-for="(o) of randomFolder">
        <img  @click="gotoFolder(1)" class="w-100 max-h-100 pointer hover-shadow" :src="iconFolder">
        <div class="text-center"><span>Task #1</span></div>
      </div>
    </el-row>
    <FolderImage class="mt-2rem" v-if="isInMyCollection"></FolderImage>
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
      animationText: null,
      randomFolder:  40
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
      this.randomFolder = Math.floor(Math.random() * 70)
    }
  },
  created() {
    this.changeBgBreadcrumb()
  },
  watch: {
    isInMyCollection: function () {
      this.changeBgBreadcrumb()
    }
  },
  mounted() {
    document.querySelector("body").className = 'schedule-with-body'
  },
  destroyed() {
    document.querySelector("body").className = 'common-with-body'
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
div ::v-deep input {
  height: 100%;
  border-radius: 30px;
}
div ::v-deep i {
  line-height: unset;
}
</style>
