<template>
  <!--注册引用信息-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    }
  },
  //验证传值
  props: {
    //滚动监听
    probeType: {
      Number,
      default: 0,
    },
    //上拉监听
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    //创建scroll对象
    //ref 如果是绑定到组件上的，通过 this.$refs.refname 拿到的就是组件对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,//是否需要进行实时监听
      pullUpLoad: this.pullUpLoad,//上拉监听
      click: true
    })
    //设置滚动监听
    this.scroll.on('scroll', (position) => {
      //console.log(position);
      this.$emit('scroll', position)
    })
    //设置上拉监听
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
        this.$emit('pullingUp',)
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    //完成加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollPosition() {
      return this.scroll ? this.scroll.y : 0
    },
  }
}
</script>

<style scoped>

</style>