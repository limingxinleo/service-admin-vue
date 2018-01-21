import request from '@/utils/request'

export function getRoutes(params) {
  return request({
    url: '/api/router/list',
    method: 'post',
    params
  })
}

export function addRoute(params) {
  return request({
    url: '/api/user/save',
    method: 'post',
    params
  })
}
