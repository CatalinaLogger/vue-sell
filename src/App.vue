<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/goods">商品</router-link>
      <router-link tag="div" class="tab-item" to="/ratings">评价</router-link>
      <router-link tag="div" class="tab-item" to="/seller">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/header/header'
import {getSeller} from 'api/index'
import {ERR_OK} from 'api/config'

import {urlParse} from 'common/js/util'

export default {
  created() {
    this._getSeller()
  },
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  methods: {
    _getSeller() {
      getSeller().then((res) => {
        if (res.code === ERR_OK) {
          this.seller = res.data
        }
      })
    }
  },
  components: {
    'v-header': Header
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/styuls">
  @import "~common/stylus/mixin"

  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      &.router-link-active
        color rgb(240, 20, 20)
</style>
