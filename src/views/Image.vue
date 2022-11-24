<template>
  <div>
    <div class="h-2rem fixed z-100 w-100 d-flex 2rem item-center item-space-between " :class="bgBreadcrumb">
      <div class="ml-2">
        <span :key="br.id" v-for="br in breadcrumbs" class="pointer el-icon-arrow-right el-breadcrumb-hover" @click="gotoFolder(1, br.id)">{{br.title}}</span>
      </div>

      <div v-if="!isInMyCollection" class="el-col-3 h-100">
        <el-input placeholder="Search" class="h-100">
          <i slot="prefix" class="el-input__icon el-icon-search h-100"></i>
        </el-input>
      </div>
    </div>

    <el-row  class="mt-2rem" v-if="!isInMyCollection">
      <div v-if="!this.breadcrumbs.slice(-1)[0].home" class="el-col-2 mt-2">
        <img  @click="gotoFolder(0)" class="w-100 max-h-100 pointer hover-shadow" :src="iconImage">
      </div>
      <div class="el-col-2 mt-2" :key="o.id" v-for="(o) of listFolder">
        <img  @click="gotoFolder(1, o.id)" class="w-100 max-h-100 pointer hover-shadow" :src="iconFolder">
        <div class="text-center"><span>{{o.title}}</span></div>
      </div>
    </el-row>
    <FolderImage :imageSource="imageSource" class="h-100" v-if="isInMyCollection"></FolderImage>
  </div>
</template>

<script>
import FolderImage from '@/components/FolderImage'
import iconImage from '@/assets/icon/icon_image.svg'
import iconFolder from '@/assets/icon/folder.svg'
import {getImageInTask} from "../services/imageService";
import {getTaskChildren, getTaskParent} from "../services/taskService";
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
      listFolder:  [],
      imageSource: [],
      breadcrumbs: [{home: true, title: 'Home', id: 0}]
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
    async changeIsMyCollection(isMyCollection, taskId=null){
      try {
        this.$bus.emit('change_loading', true)
        if(isMyCollection) {
          const listImage = await getImageInTask(this.breadcrumbs.slice(-1)[0].id);
          this.imageSource = listImage.data
        }
        if(taskId !==0 ) {
          const folders = await getTaskChildren(taskId)
          this.listFolder = folders.data
        }
        this.isInMyCollection = isMyCollection
      } catch (e) {
        console.log(e)
      } finally {
        this.$bus.emit('change_loading', false)
      }
    },
    async home(){
      try {
        this.$bus.emit('change_loading', true)
        const project = JSON.parse(localStorage.getItem('current-project'))
        const folders = await getTaskParent(project.id)
        this.listFolder = folders.data
        this.imageSource = []
        this.isInMyCollection = false
      } catch (e) {
        console.log(e)
      } finally {
        this.$bus.emit('change_loading', false)
      }
    },
    async gotoFolder(folderType, taskId=null){
      if(folderType === 1) {
        await this.handleChangeBreadcrumb((taskId))
      }
      this.changeIsMyCollection(folderType === 0, taskId)
    },
    async handleChangeBreadcrumb(taskId){
      let selectBreadcrumbExist = this.breadcrumbs.filter(fd => {
        return fd.id === taskId
      })
      if(selectBreadcrumbExist.length !== 0){
        if(selectBreadcrumbExist[0].home) {
          this.breadcrumbs = [{home: true, title: 'Home', id: 0}]
          await this.home()
        } else {
          while (this.breadcrumbs.slice(-1)[0].id !== taskId) {
            this.breadcrumbs.pop()
          }
        }
      } else {
        let willPushTask = this.listFolder.filter(fd => {
          return fd.id === taskId
        })
        this.breadcrumbs.push(willPushTask[0])
      }
    }
  },
  async created() {
    try {
      this.$bus.emit('change_loading', true)
      const project = JSON.parse(localStorage.getItem('current-project'))
      const folders = await getTaskParent(project.id)
      this.listFolder = folders.data
    } catch (e) {
      console.log(e)
    } finally {
      this.$bus.emit('change_loading', false)
    }
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
