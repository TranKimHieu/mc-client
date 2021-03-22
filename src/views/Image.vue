<template>
  <FolderImage></FolderImage>
</template>

<script>
import construction from '@/assets/image_demo_project.png'
import FolderImage from '@/components/FolderImage'

export default {
  name: "Image",
  data() {
    return {
      construction
    }
  },
  components: {
    FolderImage
  }
}
</script>

<style scoped>

</style>
