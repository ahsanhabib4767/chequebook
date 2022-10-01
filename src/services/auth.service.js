import axios from "axios";

const API_URL = "http://103.97.44.58:8082/api";

class AuthService {
  getAccessToken()
  {
    const user = this.getCurrentUser();
    return user.access_token || "";
  }
  login(username, password,grant_type) {
    return new Promise(function(resolve,reject){
      axios
      .post(API_URL + "/token", {
        username,
        password,
        grant_type
      })
      .then(response => {
        if (response.data && response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          
        }
        
        resolve(response.data);
        
      }).catch(error=>{
        console.log(error);
      })

    })

    
        
      
  }
  iniatepayment(name, location,number) {
    return axios
      .post(API_URL + "/ACSAPIService/InitiatePayment", {
        name,
        location,
        number
      },{
        headers: {
          Authorization: 'Bearer ' + this.getAccessToken()
        }
      })
      .then(response => {
        // if (response.data) {
         localStorage.setItem("user", JSON.stringify(response.data));
        // }
        

        return response.data;
      }).catch(err => {
        console.log(err);
        this.logout();
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
}

export default new AuthService();
