<template>
  <div id="detail">
    <detail-navigation-bar class="detail-nav"></detail-navigation-bar>
    <!--使用前面封装的Scroll.vue，进行滚动效果的调整-->
    <scroll class="content" ref="scroll">
      <detail-swiper v-bind:top-images="topImages"></detail-swiper>
      <detail-base-info v-bind:goods="goods"/>
      <detail-shop-info v-bind:shop="shop"/>
      <detail-goods-info v-bind:detail-info="detailInfo" v-on:imageLoad="imageLoad"/>
      <detail-param-info v-bind:param-info="paramInfo"/>
      <detail-comment-info v-bind:comment-info="commentInfo"/>
      <goods-list v-bind:goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavigationBar from "./subcomponents/DetailNavigationBar";
import DetailSwiper from "./subcomponents/DetailSwiper";
import DetailBaseInfo from "./subcomponents/DetailBaseInfo";
import Scroll from "../../components/commons/Scroll/Scroll";
import DetailShopInfo from "./subcomponents/DetailShopInfo";
import DetailGoodsInfo from "./subcomponents/DetailGoodsInfo";
import DetailParamInfo from "./subcomponents/DetailParamInfo";
import DetailCommentInfo from "./subcomponents/DetailCommentInfo";
import GoodsList from "../../components/contexts/GoodsList/GoodsList";
import {GoodsParam} from "@/network/detail";
import {getRecommends} from "@/network/detail";
import {getDetail} from "@/network/detail";
import {Goods} from "@/network/detail";
import {Shop} from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    }
  },
  components: {
    DetailNavigationBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //获取顶部的图片轮播数据
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      //保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //展示推荐商品信息
    getRecommends().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;/*堆叠顺序9*/
  background-color: #fff;
  height: 100vh;
  z-index: 1;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px);
}
</style>