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
    probeType: Number,
    default: 0
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true
    })
    this.scroll.on('scroll', (position) => {
      //console.log(position);
      this.$emit('scroll', position)
    })
  }
}
</script>

<style scoped>

</style>