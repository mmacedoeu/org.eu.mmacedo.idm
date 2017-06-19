import { request, config } from '../utils'
const { api, CORS } = config
const { employee } = api

export async function query (params) {
  return request({
    url: CORS + employee,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: CORS + employee.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: CORS + employee,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: CORS + employee,
    method: 'patch',
    data: params,
  })
}
