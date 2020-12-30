<template>
  <div>
    <detail-navigation-bar></detail-navigation-bar>
    <p>{{ iid }}</p>
  </div>
</template>

<script>
import DetailNavigationBar from "@/views/Detail/subcomponents/DetailNavigationBar";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
    }
  },
  components: {
    DetailNavigationBar
  },
  created() {
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>

</style>