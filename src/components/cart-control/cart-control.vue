<template>
  <div class="cart-control" @click.stop>
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('addClick', event.target)
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .cart-control
    font-size 0
    .cart-decrease, .cart-add
      display: inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
      .inner
        display inline-block
        line-height 24px
        font-size 24px
    .move-enter-active, .move-leave-active
      transition: all 0.5s
      .inner{
        transition: all .5s;
      }
    .move-enter, .move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 7px
      line-height 24px
      font-size 10px
      text-align center
      color rgb(147, 153, 159)
</style>
