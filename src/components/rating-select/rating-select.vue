<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="block positive" :class="{'active':selectType===2}" @click="select(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active':selectType===0}" @click="select(0)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active':selectType===1}" @click="select(1)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
    <div class="simple-rating-wrapper" v-if="theme===0">
      <ul v-show="ratings.length">
        <li class="rating-item" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
          <div class="user">
            <span class="name">{{rating.username}}</span>
            <img class="avatar" width="12" height="12" :src="rating.avatar">
          </div>
          <div class="time">{{rating.rateTime | formatDate}}</div>
          <p class="text">
            <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
            {{rating.text}}
          </p>
        </li>
      </ul>
      <div class="no-rating" v-show="!ratings.length">暂无评价</div>
    </div>
    <div class="complex-rating-wrapper" v-if="theme===1">
      <ul>
        <li class="rating-item border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img width="28" height="28" :src="rating.avatar">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <i class="icon-thumb_up"></i>
              <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
            </div>
            <div class="time">
              {{rating.rateTime | formatDate}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
import {formatDate} from 'common/js/date'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    theme: {
      type: Number,
      default: 0
    },
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    desc: {
      type: Object,
      default() {
        return {all: '全部', positive: '满意', negative: '不满意'}
      }
    }
  },
  data() {
    return {
      selectType: ALL,
      onlyContent: false
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type) {
      this.selectType = type
      this.$emit('select', type)
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent
      this.$emit('toggle', this.onlyContent)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else if (this.selectType === type) {
        return true
      } else {
        return false
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    Star
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .rating-select
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77, 85, 93)
        line-height 16px
        font-size 12px
        &.active
          color #fff
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background rgba(0, 160, 220, .2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, .2)
          &.active
            background rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, .1)
      color rgb(147, 153, 159)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        display inline-block
        vertical-align top
        font-size 12px
    .simple-rating-wrapper
      padding 0 18px
      .rating-item
        position relative
        padding 16px 0
        border-1px(rgba(7, 17, 27, .1))
        .user
          position absolute
          right 0
          top 16px
          line-height 12px
          font-size 0
          .name
            display inline-block
            vertical-align top
            margin-right 6px
            font-size 10px
            color rgb(147, 153, 159)
          .avatar
            border-radius 50%
        .time
          margin-bottom 6px
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
        .text
          line-height 16px
          font-size 12px
          color rgb(7, 17, 27)
          .icon-thumb_up, .icon-thumb_down
            margin-right 4px
            line-height 16px
            font-size 12px
          .icon-thumb_up
            color rgb(0, 160, 220)
          .icon-thumb_down
            color rgb(147, 153, 159)
      .no-rating
        padding 16px 0
        font-size 12px
        color rgb(147, 153, 159)
    .complex-rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          flex 1
          position relative
          .name
            margin-bottom 6px
            font-size 10px
          .star-wrapper
            margin-bottom 4px
            font-size 0
            .star
              display inline-block
              vertical-align top
              margin-right 6px
            .delivery
              display inline-block
              vertical-align top
              line-height 14px
              font-size 10px
              color rgb(147, 153, 159)
          .text
            margin-bottom 8px
            line-height 18px
            color rgb(7, 17, 27)
            font-size 12px
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, .1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #fff
              font-size 9px
          .time
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
</style>
