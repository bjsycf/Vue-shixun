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
    <TabControl v-bind:titles="['流行','新款','精选']"></TabControl>
    <GoodsList v-bind:goods="goods['pop'].list"></GoodsList>
  </div>
</template>

<script>
import NavigationBar from "@/components/commons/Navigation/NavigationBar";
import {getHomeMultiData} from "@/network/home";
import HomeSwiper from "@/views/Home/subcomponents/HomeSwiper";
import HomeRecommend from "@/views/Home/subcomponents/HomeRecommend";
import HomeFashion from "@/views/Home/subcomponents/HomeFashion";
import TabControl from "@/components/contexts/TabControl/TabControl";
import {getHomeGoods} from "@/network/home";
import GoodsList from "@/components/contexts/GoodsList/GoodsList";

export default {
  name: "Home",
  components: {
    NavigationBar,
    HomeSwiper,
    HomeRecommend,
    HomeFashion,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banner: [],//存储轮播图网址
      recommend: [],//存储每日推荐信息
      goods: {
        //存储商品数据
        'pop': {
          page: 0, list: []
        },
        'new': {
          page: 0, list: []
        },
        'sell': {
          page: 0, list: []
        },
      }
    }
  },
  created() {
    //请求首页公共数据
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(
          res => {
            console.log(res)

            this.banner = res.data.banner.list

            this.recommend = res.data.recommend.list
          }
      )
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(
          res => {
            console.log(res)
            this.goods[type].list = res.data.list
            this.goods[type].page = page + 1
          }
      )
    }

  }
}
</script>
<style scoped>
.home-nav {
  background: var(--color-tint);
  color: #fff;
}
</style>