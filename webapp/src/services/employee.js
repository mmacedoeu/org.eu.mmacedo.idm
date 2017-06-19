import { request, config } from '../utils'
const { api, CORS } = config
const { employee } = api

export async function query (params) {
  const access_token = localStorage.getItem('access_token')
  return request({
    url: CORS + employee,
    method: 'get',
    headers: {Authorization : `Bearer ${access_token}`},
    data: params,
  })
}

export async function create (params) {
  const access_token = localStorage.getItem('access_token')
  return request({
    url: CORS + employee.replace('/:id', ''),
    method: 'post',
    headers: {Authorization : `Bearer ${access_token}`},
    data: params,
  })
}

export async function remove (params) {
  const access_token = localStorage.getItem('access_token')
  return request({
    url: CORS + employee + '/' + params.id,
    method: 'delete',
    headers: {Authorization : `Bearer ${access_token}`},
  })
}

export async function update (params) {
  const access_token = localStorage.getItem('access_token')
  const {id, ...data} = params
  return request({
    url: CORS + employee + '/' + id,
    method: 'patch',
    headers: {Authorization : `Bearer ${access_token}`},
    data: data,
  })
}
