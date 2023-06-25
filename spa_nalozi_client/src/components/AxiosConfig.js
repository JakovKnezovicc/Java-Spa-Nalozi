import axios from "axios";

let jwtToken = localStorage.getItem("token");

if(jwtToken !== null) {
    jwtToken = jwtToken.replace(/^"(.*)"$/, '$1')
    axios.defaults.headers.common = {'Authorization': `Bearer ${jwtToken}`}
}


export default axios;