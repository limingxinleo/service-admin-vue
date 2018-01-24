import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/api/user/list',
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: '/api/user/save',
    method: 'post',
    data: params
  })
}

export function getRoles(params) {
  return request({
    url: '/api/user/roles',
    method: 'post',
    data: params
  })
}

export function updateRole(params) {
  return request({
    url: '/api/user/roles/update',
    method: 'post',
    data: params
  })
}
