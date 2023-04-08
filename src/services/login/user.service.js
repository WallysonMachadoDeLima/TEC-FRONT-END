import axios from "axios";
import authHeader from "./authHeader.js";
import { API_CONFIG } from "../../config/api.config";

class UserService {
  getUserBoard() {
    return axios.get(`${API_CONFIG}/usuarios`, { headers: authHeader });
  }
}

export default new UserService();
