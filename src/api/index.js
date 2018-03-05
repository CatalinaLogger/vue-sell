import axios from 'axios'

export function getSeller() {
  const url = '/api/getSeller'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getGoods() {
  const url = '/api/getGoods'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRatings() {
  const url = '/api/getRatings'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
