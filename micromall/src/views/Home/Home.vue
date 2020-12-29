<template>
  <div id="home">
    <navigation-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </navigation-bar>
    <scroll class="content">
      <HomeSwiper v-bind:banners="banner"></HomeSwiper>
      <HomeRecommend v-bind:recommend="recommend"></HomeRecommend>
      <HomeFashion></HomeFashion>
      <TabControl v-bind:titles="['流行','新款','精选']" v-on:tabClicked="tabClicked"></TabControl>
      <GoodsList v-bind:goods="goods[this.currentType].list"></GoodsList>
    </scroll>
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
import Scroll from "@/components/commons/Scroll/Scroll";

export default {
  name: "Home",
  components: {
    NavigationBar,
    HomeSwiper,
    HomeRecommend,
    HomeFashion,
    TabControl,
    GoodsList,
    Scroll,
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
      },
      currentType: 'pop',//存储当前选中类型
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
            //console.log(res)
            this.banner = res.data.banner.list
            this.recommend = res.data.recommend.list
          }
      )
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(
          res => {
            //console.log(res)
            this.goods[type].list = res.data.list
            this.goods[type].page = page + 1
          }
      )
    },
    tabClicked(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    }
  }
}
</script>
<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px; /*距离底部高度*/
  left: 0;
  right: 0;
}
</style>