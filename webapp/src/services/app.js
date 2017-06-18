import { request, config } from '../utils'
const { api } = config
const { user, userLogout, userLogin } = api

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'macedo',
    permissions: userPermission.DEVELOPER,
  },
]

export async function login (params) {
  return request({
    url: userLogin,
    method: 'get',
    data: params,
  })
}

export async function logout (params) {
  localStorage.removeItem('username')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('scope')
  localStorage.removeItem('expires_in')
  return {
    success: true
  }
}

export async function query (params) {
  console.log("app/query params: \t", params)
  const username = localStorage.getItem('username')
  if (!username) {
    return { message: 'Not Login' }
  }

  if (localStorage.getItem('expires_in') > new Date().getTime()) {
    return { success: false}
  }

  const response = {}
  const user = {}

  const userItem = adminUsers.filter(_ => _.username === username)
  if (userItem.length > 0) {
    user.permissions = userItem[0].permissions
    user.username = username
    user.id = userItem[0].id
  } else {
    user.permissions = userPermission.DEFAULT
    user.username = username
    user.id = 2
  }

  response.success = true
  response.user = user

  return response
}
