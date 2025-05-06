import axios from "axios";     //to talk with server
var VISITOR_URL='http://localhost:9096/patients'

class PatientDetailsService {
  validateUser(mobileNumber, password) {
    return axios.get(`${VISITOR_URL}/${mobileNumber}/${password}`)
  }

 




}
export default new PatientDetailsService();
