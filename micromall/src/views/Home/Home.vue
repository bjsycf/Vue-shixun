<template>
  <div>
    <navigation-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </navigation-bar>
    <HomeSwiper v-bind:banners="banner"></HomeSwiper>
    <HomeRecommend v-bind:recommend="recommend"></HomeRecommend>
    <HomeFashion></HomeFashion>
  </div>
</template>

<script>
import NavigationBar from "@/components/commons/Navigation/NavigationBar";
import {getHomeMultiData} from "@/network/home";
import HomeSwiper from "@/views/Home/subcomponents/HomeSwiper";
import HomeRecommend from "@/views/Home/subcomponents/HomeRecommend";
import HomeFashion from "@/views/Home/subcomponents/HomeFashion";

export default {
  name: "Home",
  components: {
    NavigationBar,
    HomeSwiper,
    HomeRecommend,
    HomeFashion,
  },
  data() {
    return {
      banner: [],//存储轮播图网址
      recommend: [],//存储每日推荐信息
    }
  },
  created() {
    getHomeMultiData().then(
        res => {
          console.log(res);
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
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