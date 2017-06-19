import { request, config } from '../utils'
const { api } = config
const { user, userLogout, userLogin } = api

const userPermission = {
  DEFAULT: [
    'dashboard',
  ],
  ADMIN: [
    'dashboard', 'users',
  ],
  DEVELOPER: ['dashboard', 'users',],
}

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
  const username = localStorage.getItem('username')
  if (!username) {
    console.log("no username found")
    return { message: 'Not Login' }
  }

  const expires_in = localStorage.getItem('expires_in')
  if (!expires_in) {
    console.log("no expires_in found")
    return { success: false}
  }

  const now = (new Date()).getTime()
  if (now > expires_in) {
    console.log("access_token has expired")
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
