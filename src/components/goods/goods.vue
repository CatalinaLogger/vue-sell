<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" :class="{'current':currentIndex===index}" v-for="(item, index) in goods" @click="selectMenu(index, $event)" :key="index">
          <span class="text">
            <div class="sign-wrapper" v-show="item.type > 0">
              <sign :size="size" :type="item.type"></sign>
            </div>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list" v-for="item in goods" :key="item.name"  ref="foodItem">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px"  v-for="food in item.foods" :key="food.name" @click="selectFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @addClick="foodAdd"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods" ref="shopCart"></shop-cart>
    <food :food="food" @addClick="foodAdd" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Sign from 'components/sign/sign'
import ShopCart from 'components/shop-cart/shop-cart'
import CartControl from 'components/cart-control/cart-control'
import Food from 'components/food/food'
import {getGoods} from 'api/index'
import {ERR_OK} from 'api/config'

export default {
  created() {
    this._getGoods()
  },
  props: {
    seller: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      goods: [],
      size: 3,
      listHeight: [],
      scrollY: 0,
      food: {}
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      const list = this.$refs.foodItem
      this.foodScroll.scrollToElement(list[index], 300)
    },
    selectFood(food) {
      this.food = food
      this.$refs.food.show()
    },
    foodAdd(target) {
      // 体验优化，异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopCart._drop(target)
      })
    },
    _getGoods() {
      getGoods().then((res) => {
        if (res.code === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.foodItem
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    Sign,
    ShopCart,
    CartControl,
    Food
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background #fff
          .text
            font-weight 700
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7, 17, 27, .1))
          .sign-wrapper
            display inline-block
            vertical-align top
            width 12px
            height 12px
    .foods-wrapper
      flex 1
      .title
        height 26px
        padding-left 14px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc
          .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color: rgb(147, 153, 159)

          .cart-control-wrapper
            position absolute
            right 0
            bottom 12px

</style>
