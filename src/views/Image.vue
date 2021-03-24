<template>
  <div>
    <div :class="`h-2rem fixed z-100 w-100 d-flex 2rem item-center ${bgBreadcrumb}`">
      <el-breadcrumb class="ml-2" separator-class="el-icon-arrow-right ">
        <el-breadcrumb-item :to="{name: 'overview'}">homepage</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'overview'}">promotion management</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'overview'}">promotion list</el-breadcrumb-item>
        <el-breadcrumb-item @click="changeIsMyCollection(true)">image</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row  v-if="!isInMyCollection">
      <div class="el-col-2">
        <img :src="iconImage">
      </div>
      <div class="el-col-2" :key="o" v-for="(o) of 4">
        <img :src="iconFolder">
      </div>
    </el-row>
    <FolderImage v-if="isInMyCollection"></FolderImage>
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
      isInMyCollection : true,
      folderList: [1,2,3,4,5,6,7,8],
      bgBreadcrumb : 'bg-images-layout'
    }
  },
  components: {
    FolderImage
  },
  methods: {
    changeBgBreadcrumb(){
      this.bgBreadcrumb = this.isInMyCollection ? 'bg-images-layout' : 'bg-tool-gray';
    },
    changeIsMyCollection(isMyCollection){
      console.log('aaa')
      this.isInMyCollection = isMyCollection
    }
  }
}
</script>

<style scoped>
span ::v-deep .el-breadcrumb__inner {
  color: #aaaaaa !important;
}
span ::v-deep .el-breadcrumb__inner:hover {
  color: burlywood !important;
}
</style>
