import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'post',
    data: { token }
  })
}

export function logout(token) {
  return request({
    url: '/api/user/logout',
    method: 'post',
    data: { token }
  })
}
