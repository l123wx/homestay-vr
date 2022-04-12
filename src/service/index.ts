import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['token'] = token
}
// axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.transformRequest = [function (data) {
//   let ret = ''
//   for (const it in data) {
//     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//   }
//   return ret
// }]
export default axios