import {request, config, urlencodeFormData} from '../utils'
const {api, auth, CORS, client_id} = config
const {userLogin} = api

export async function login(data) {
  const params = Object.assign({
    grant_type: 'password',
    client_id: client_id,
  }, data)
  return request({
    url: CORS + userLogin,
    method: 'post',
    auth: auth,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: urlencodeFormData(params)
  })
}
