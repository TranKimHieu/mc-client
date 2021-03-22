<template>
  <el-row>
    <div style="height: 50%" class="text-center block-center-parent">
      <lingallery class="block-center-child" :width="width" :height="height" :items="items"/>
    </div>
    <el-row class="mt-60px">
      <el-col :key="o" v-for="(o) in 30" :span="3">
        <span class="pointer">
          <i v-if="o!==1" class="el-icon-folder font-size-30">
          </i>
          <i v-else class="el-icon-folder-opened font-size-30 color-y">
          </i>
          Task 123
        </span>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import construction from '@/assets/image_demo_project.png';
import testImg from '@/assets/test_img.jpg'
import testImg64 from '@/assets/test_img_64.jpg'
import test1 from '@/assets/test/test1.jpeg'
import test2 from '@/assets/test/test2.jpeg'
import test3 from '@/assets/test/test3.jpeg'
import test4 from '@/assets/test/test4.jpeg'
import test5 from '@/assets/test/test5.jpeg'
import test6 from '@/assets/test/test6.jpeg'

export default {
  name: "FolderImage",
  data() {
    return {
      construction,
      width: '500',
      height: '100%',
      items: [
        {
          src: testImg,
          thumbnail: testImg64,
          caption: 'Some Caption'
        },
        {
          src: construction,
          thumbnail: construction,
          caption: 'Some Caption'
        },
        {
          src: test1,
          thumbnail: test1,
          caption: 'Some Caption'
        },        {
          src: test2,
          thumbnail: test2,
          caption: 'Some Caption'
        },        {
          src: test3,
          thumbnail: test3,
          caption: 'Some Caption'
        },
        {
          src: test4,
          thumbnail: test4,
          caption: 'Some Caption'
        },
        {
          src: test5,
          thumbnail: test5,
          caption: 'Some Caption'
        },
        {
          src: test6,
          thumbnail: test6,
          caption: 'Some Caption'
        },
      ]
    };
  }
}
</script>

<style scoped>

</style>
