import { request, config } from '../utils'
const { api, CORS } = config
const { users } = api

export async function query (params) {
  const access_token = localStorage.getItem('access_token')
  return request({
    url: CORS + users,
    method: 'get',
    headers: {Authorization : `Bearer ${access_token}`},
    data: params,
  })
}

export async function create (params) {
  const access_token = localStorage.getItem('access_token')
  const {roles, ...data} = params
  const newroles = roles && roles.split(' ')
  return request({
    url: CORS + users.replace('/:id', ''),
    method: 'post',
    headers: {Authorization : `Bearer ${access_token}`},
    data: Object.assign(data, {roles: newroles}),
  })
}

export async function remove (params) {
  const access_token = localStorage.getItem('access_token')
  return request({
    url: CORS + users + '/' + params.id,
    method: 'delete',
    headers: {Authorization : `Bearer ${access_token}`},
  })
}

export async function update (params) {
  const access_token = localStorage.getItem('access_token')
  const {id, password, roles, ...data} = params
  Object.keys(data).forEach(k => (!data[k] && data[k] !== undefined) && delete data[k]);
  const newroles = roles && roles.split(' ')
  return request({
    url: CORS + users + '/' + id,
    method: 'patch',
    headers: {Authorization : `Bearer ${access_token}`},
    data: Object.assign(data, {roles: newroles}),
  })
}
