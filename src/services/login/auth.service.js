import axios from "axios";
import { API_CONFIG } from "../../config/api.config";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import bcrypt from 'bcryptjs' 

async function login(cadastro) {
  
  const response = await axios
    .post(`${API_CONFIG.url}/login`, cadastro)
    .then((response) => {
      if (response.headers.authorization) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.headers.authorization)
        );
        localStorage.setItem("login", JSON.stringify(cadastro));
      }

      const token = JSON.parse(localStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = token;
      console.log("TOKEN CADASTRADO", token);
      
    
        
        const converte = jwt_decode(token);
        console.log("PASSOU AQUI")
     
     
      axios
        .get(`${API_CONFIG.url}/usuarios/email/${converte.sub}`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
        });
    })
    .catch((error) => {
      console.log("NÃO LOGADO: " + error);
    });

}

async function logout() {
  localStorage.removeItem("user");
  console.log("LOGOUT");
}

/*
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
*/

const AuthService = {
  login,
  logout,
};

export default AuthService;
