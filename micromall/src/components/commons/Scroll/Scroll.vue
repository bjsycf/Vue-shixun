<template>
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
  props: {
    probeType: {
      Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
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
        //console.log('上拉加载更多');
        this.$emit('pullingUp',)
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
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