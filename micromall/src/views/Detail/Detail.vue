<template>
  <div id="detail">
    <detail-navigation-bar class="detail-nav"></detail-navigation-bar>
    <scroll class="content">
      <detail-swiper v-bind:top-images="topImages"></detail-swiper>
      <detail-base-info v-bind:goods="goods"></detail-base-info>
      <detail-shop-info v-bind:shop="shop"></detail-shop-info>
      <detail-goods-info v-bind:detail-info="detailInfo"></detail-goods-info>
      <detail-param-info v-bind:param-info="paramInfo"></detail-param-info>
      <detail-comment-info v-bind:comment-info="commentInfo"></detail-comment-info>
      <goods-list v-bind:goods="recommends"></goods-list>
      <p>{{ iid }}</p>
    </scroll>
  </div>
</template>

<script>
import DetailNavigationBar from "@/views/Detail/subcomponents/DetailNavigationBar";
import {getDetail} from "@/network/detail";
import DetailSwiper from "@/views/Detail/subcomponents/DetailSwiper";
import DetailBaseInfo from "@/views/Detail/subcomponents/DetailBaseInfo";
import {Goods} from "@/network/detail";
import Scroll from "@/components/commons/Scroll/Scroll";
import DetailShopInfo from "@/views/Detail/subcomponents/DetailShopInfo";
import {Shop} from "@/network/detail";
import DetailGoodsInfo from "@/views/Detail/subcomponents/DetailGoodsInfo";
import DetailParamInfo from "@/views/Detail/subcomponents/DetailParamInfo";
import {GoodsParam} from "@/network/detail";
import DetailCommentInfo from "@/views/Detail/subcomponents/DetailCommentInfo";
import GoodsList from "@/components/contexts/GoodsList/GoodsList";
import {getRecommends} from "@/network/detail";

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
      recommends: {}
    }
  },
  components: {
    DetailCommentInfo,
    DetailParamInfo,
    DetailSwiper,
    DetailNavigationBar,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    GoodsList,
  },
  created() {
    //解析商品id
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
    //展示推荐商品
    getRecommends().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;;
  z-index: 9;
  background-color: #fff;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px);
}
</style>