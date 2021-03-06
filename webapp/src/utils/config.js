const client_id = 'fooClientIdPassword'

module.exports = {
  name: 'Crud Globo',
  prefix: 'antdAdmin',
  footerText: 'Marcos Macedo Crud  © 2017',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  baseURL: '//www.crudglobo.ml',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['//api.crudglobo.ml'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  client_id: client_id,
  auth: {
    username: client_id,
    password: 'secret'
  },
  api: {
    userLogin: '/oauth/token',
    userLogout: '/user/logout',
    userInfo: '/userInfo',
    employee: '/employee',
    users: '/users',
    user: '/user/:id',
    dashboard: '/dashboard'
  }
}
