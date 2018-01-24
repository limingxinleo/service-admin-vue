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
    url: '/api/router/save',
    method: 'post',
    params
  })
}

export function reloadRoutes() {
  return request({
    url: '/api/router/update',
    method: 'post'
  })
}
