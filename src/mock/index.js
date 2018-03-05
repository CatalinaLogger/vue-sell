import Mock from 'mockjs'

var appData = require('./data.json')

Mock.mock('/api/getSeller', () => {
  return {
    code: 0,
    data: appData.seller
  }
})

Mock.mock('/api/getGoods', () => {
  return {
    code: 0,
    data: appData.goods
  }
})

Mock.mock('/api/getRatings', () => {
  return {
    code: 0,
    data: appData.ratings
  }
})

export default Mock
