<template>
  <transition name="move">
    <div class="food" v-show="showFlag" @touchstart.prevent="foodTouchStart" @touchmove.prevent="foodTouchMove" @touchend="foodTouchEnd" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cart-control-wrapper">
            <cart-control :food="food" @addClick="foodAdd"></cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select :desc="desc" :ratings="food.ratings"></rating-select>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import BScroll from 'better-scroll'
import CartControl from 'components/cart-control/cart-control'
import Split from 'components/split/split'
import RatingSelect from 'components/rating-select/rating-select'
import {prefixStyle} from 'common/js/util'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  created() {
    this.touch = {}
  },
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showFlag: false,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '吐槽'
      }
    }
  },
  methods: {
    addFirst(event) {
      Vue.set(this.food, 'count', 1)
      this.$emit('addClick', event.target)
    },
    foodAdd(target) {
      this.$emit('addClick', target)
    },
    foodTouchStart(e) {
      this.touch.initiated = true
      this.touch.moved = false
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    foodTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      const offsetWidth = Math.max(0, deltaX)
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.food.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.food.style[transitionDuration] = 0
    },
    foodTouchEnd() {
      if (!this.touch.moved) {
        return
      }
      let offsetWidth
      if (this.touch.percent > 0.2) {
        this.showFlag = false
        offsetWidth = window.innerWidth
        setTimeout(() => {
          this.$refs.food.style['transform'] = ''
          this.$refs.food.style['transitionDuration'] = ''
        }, 300)
      } else {
        offsetWidth = 0
      }
      const time = 300
      this.$refs.food.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.food.style['transitionDuration'] = `${time}ms`
    },
    show() {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    }
  },
  components: {
    BScroll,
    CartControl,
    Split,
    RatingSelect
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.5s
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .food-content
      .image-header
        position relative
        width 100%
        height 0
        padding-top 100%
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
        .back
          position absolute
          top 10px
          left 5px
          .icon-arrow_lift
            display block
            padding 10px
            font-size 20px
            color #fff
      .content
        position relative
        padding 18px
        .title
          margin-bottom 8px
          line-height 14px
          font-size 14px
          font-weight 700
          color rgb(7, 17, 27)
        .detail
          margin-bottom 8px
          line-height 10px
          height 10px
          font-size 0
          .sell-count, .rating
            font-size 10px
            color rgb(147, 153, 159)
          .sell-count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 18px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cart-control-wrapper
          position absolute
          right 12px
          bottom 10px
        .buy
          position absolute
          right 18px
          bottom 18px
          z-index 10
          height 24px
          line-height 26px
          padding 0 12px
          box-sizing border-box
          border-radius 12px
          font-size 10px
          color #fff
          background rgb(0, 160, 820)
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s
          &.fade-enter, &.fade-leave-to
            opacity 0
      .info
        padding 18px
        .title
          margin-bottom 16px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .text
          line-height 24px
          padding 0 8px
          font-size 12px
          color rgb(77, 85, 93)
      .rating
        padding-top 18px
        .title
          margin-left 18px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)

</style>
