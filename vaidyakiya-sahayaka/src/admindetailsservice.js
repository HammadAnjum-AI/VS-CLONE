import axios from "axios";     //to talk with server
var VISITOR_URL1='http://localhost:9096/adminlogin'

  class AdminDetailsService{
    validateUser(adminname, password) {
      return axios.get(`${VISITOR_URL1}/${adminname}/${password}`)
  }





}
export default new AdminDetailsService();