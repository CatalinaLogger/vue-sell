<template>
  <div class="sign" :class="classType">
    <span class="icon" :class="classMap[type]"></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  props: {
    size: {
      type: Number,
      default: -1
    },
    type: {
      type: Number,
      default: -1
    }
  },
  computed: {
    classType() {
      return 'sign-' + this.size
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .sign
    font-weight 0
    .icon
      display inline-block
      background-repeat no-repeat
    &.sign-1
      .icon
        width 12px
        height 12px
        background-size 12px 12px
        &.decrease
          bg-image('decrease_1')
        &.discount
          bg-image('discount_1')
        &.guarantee
          bg-image('guarantee_1')
        &.invoice
          bg-image('invoice_1')
        &.special
          bg-image('special_1')
    &.sign-2
      .icon
        width 16px
        height 16px
        background-size 16px 16px
        &.decrease
          bg-image('decrease_2')
        &.discount
          bg-image('discount_2')
        &.guarantee
          bg-image('guarantee_2')
        &.invoice
          bg-image('invoice_2')
        &.special
          bg-image('special_2')
    &.sign-3
      .icon
        width 12px
        height 12px
        background-size 12px 12px
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
    &.sign-4
      .icon
        width 16px
        height 16px
        background-size 16px 16px
        &.decrease
          bg-image('decrease_4')
        &.discount
          bg-image('discount_4')
        &.guarantee
          bg-image('guarantee_4')
        &.invoice
          bg-image('invoice_4')
        &.special
          bg-image('special_4')
</style>
