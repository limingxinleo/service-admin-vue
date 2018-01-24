import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'post',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/api/user/logout',
    method: 'post',
    params: { token }
  })
}
