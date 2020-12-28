<template>
  <div>
    <navigation-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </navigation-bar>
    <HomeSwiper v-bind:banners="banner"></HomeSwiper>
  </div>
</template>

<script>
import NavigationBar from "@/components/commons/Navigation/NavigationBar";
import {getHomeMultiData} from "@/network/home";
import HomeSwiper from "@/views/Home/subcomponents/HomeSwiper";

export default {
  name: "Home",
  components: {
    NavigationBar,
    HomeSwiper,
  },
  data() {
    return {
      banner: [],//存储轮播图网址
    }
  },
  created() {
    getHomeMultiData().then(
        res => {
          console.log(res);
          this.banner = res.data.banner.list
        }
    )
  }
}
</script>

<style scoped>
.home-nav {
  background: var(--color-tint);
  color: #fff;
}
</style>