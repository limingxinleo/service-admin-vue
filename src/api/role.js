import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/api/role/list',
    method: 'post',
    data: params
  })
}

export function addRole(params) {
  return request({
    url: '/api/role/save',
    method: 'post',
    data: params
  })
}

export function getRouters(params) {
  return request({
    url: '/api/role/routers',
    method: 'post',
    data: params
  })
}

export function updateRouter(params) {
  return request({
    url: '/api/role/routers/update',
    method: 'post',
    data: params
  })
}

export function reloadRoleRouters() {
  return request({
    url: '/api/role/routers/reload',
    method: 'post'
  })
}
