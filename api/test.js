import {req,req1} from './http.js'

// 在您需要请求的地方直接使用该api
// export function login(data) {
//     return req.request({
//         url: '/account/login',
//         method: 'POST',
//         data: data
//     })
// } 
//轮播图
export function carousel() {
  return req.request({
      url: '/video/carousel/all',
      method: 'GET',
  })

}
// export function QueryVehicles(data) {//che
//   return req.request({
//       url: '/Vehicle/QueryVehicles',
//       method: 'POST',
//       data: data
//   })

// }
//vid搜索视频详情
export function getDetailsByVid(vid) {
  return req.request({
      url: `/video/video/details/${vid}`,
      method: 'GET',
  })

}
//根据vid搜索url
export function getUrlsByVid(vid) {
  return req.request({
      url: `/video/video/url/${vid}`,
      method: 'GET',
  })
}
//根据输入联想搜索
export function searchGuess (name) {
  return req.request({
      url: `/video/search/hint/${name} `,
      method: 'GET',
  })
}
//根据名字搜索 带分页
export function search (name,index) {
  return req.request({
      url: `/video/search/name/${name}/${index} `,
      method: 'GET',
  })
}
//获取所有类型
export function getAllType () {
  return req.request({
      url: `/video/classification/allType `,
      method: 'GET',
  })
}

export function randomByType (type) {
  return req.request({
      url: `/video/classification/randomByType/${type}`,
      method: 'GET',
  })
}




