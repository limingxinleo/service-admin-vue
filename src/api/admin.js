import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/api/user/list',
    method: 'post',
    params
  })
}
