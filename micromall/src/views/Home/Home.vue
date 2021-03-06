<template>
  <div id="home">
    <navigation-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </navigation-bar>
    <tab-control v-bind:titles="['流行','新款','精选']"
                 v-on:tabClicked="tabClicked"
                 class="tab-control"
                 v-show="isTabControlFixed"
                 ref="tabControl1"></tab-control>
    <scroll class="content"
            v-bind:probe-type="3"
            v-on:scroll="contentScroll"
            ref="scroll"
            v-bind:pull-up-load="true"
            v-on:pullingUp="LoadMore">
      <HomeSwiper v-bind:banners="banner" v-on:swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <HomeRecommend v-bind:recommend="recommend"></HomeRecommend>
      <HomeFashion></HomeFashion>
      <TabControl v-bind:titles="['流行','新款','精选']"
                  v-on:tabClicked="tabClicked"
                  class="tab-control"
                  ref="tabControl2"
      ></TabControl>
      <GoodsList v-bind:goods="goods[this.currentType].list"></GoodsList>
    </scroll>
    <!--原生标签是可以直接监听的，监听组件的话，必须使用 .native 修饰符-->
    <back-to-top v-show="isShowBackToTop" v-on:click.native="backClicked"></back-to-top>
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
import BackToTop from "@/components/contexts/BackToTop/BackToTop";
import {debounce} from "@/commons/utils";

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
    BackToTop,
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
      isShowBackToTop: false,//返回顶部组件默认不显示
      isTabControlFixed: false,//是否固定
      tabOffsetTop: 0,//滚动的距离
      positionY: 0,//保存页面的滚动距离
    }
  },
  created() {
    //请求首页公共数据
    this.getHomeMultiData()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    //网络请求相关的方法
    getHomeMultiData() {
      getHomeMultiData().then(
          res => {
            //临时查看网络的请求结果
            console.log(res)
            this.banner = res.data.banner.list
            this.recommend = res.data.recommend.list
          }
      )
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
            console.log(res)
            //this.goods[type].list = res.data.list
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page = page + 1
          }
      )
    },
    //事件监听相关的方法
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
      //使两个选中的保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      //console.log(position);
      //是否显示BackToTop
      //判断BackTop是否显示,滚动到 一定的位置才会显示
      this.isShowBackToTop = (-position.y) > 1200
      //决定tabControl是否吸顶(position:fixed)
      this.isTabControlFixed = (-position.y) > this.tabOffsetTop
    },
    backClicked() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    LoadMore() {
      this.getHomeGoods(this.currentType)
      // 完成上拉加载更多
      // 这个代码放到getHomeGoods，在初始化的时候调用会有问题
      this.$refs.scroll.finishPullUp()
    },
    swiperImageLoad() {
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
  mounted() {
    //监听图片加载完成的事件
    //this.$bus.$on('itemImageLoad', () =>{
    //console.log("图片加载完成");
    //this.$refs.scroll.refresh()
    // })
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      //console.log('图片加载完成');
      refresh()
    })
  },
  destroyed() {
    console.log('home页面被销毁');
  },
  deactivated() {
    console.log('离开home页面');
    this.positionY = this.$refs.scroll.getScrollPosition()
    console.log(this.positionY);
  },
  activated() {
    console.log('激活home页面');
    this.$refs.scroll.scrollTo(0, this.positionY, 1)
    this.$refs.scroll.refresh()
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
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
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

.tab-control {
  position: relative;
  z-index: 9;
}
</style>