import axios from "axios";
import { API_CONFIG } from "../../config/api.config";

async function inserir(login) {
  const response = await axios.post(`${API_CONFIG.baseUrl}/login`, login);
}

const loginService = {
  inserir,
};

export default loginService;
