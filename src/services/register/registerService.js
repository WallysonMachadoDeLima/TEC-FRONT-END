import axios from "axios";
import { API_CONFIG } from "../../config/api.config";

async function inserir(data) {
  const response = await axios.post(`${API_CONFIG.baseUrl}/usuarios/cadastro`, {
    data,
  });
  return response;
}

const preCadastroService = {
  inserir,
};

export default preCadastroService;
