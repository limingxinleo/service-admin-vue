import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/api/role/list',
    method: 'post',
    params
  })
}

export function addRole(params) {
  return request({
    url: '/api/role/save',
    method: 'post',
    params
  })
}

export function getRouters(params) {
  return request({
    url: '/api/role/routers',
    method: 'post',
    params
  })
}
