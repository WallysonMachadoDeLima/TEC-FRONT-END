import axios from "axios";
import { API_CONFIG } from "../../config/api.config";

const token = JSON.parse(localStorage.getItem("token"));
axios.defaults.headers.common["Authorization"] = token;

async function listar() {
 
  const response = await axios.get(`${API_CONFIG.url}/alvaras/solicitacao/funcionamento`);
  return response;
}


async function inserirPf(id, alvara) {
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/funcionamento/pf/${id}`,
    alvara
  );
  return response;
}

async function inserirPj(id, alvara) {
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/funcionamento/pj/${id}`,
    alvara
  );
  return response;
}

async function listarId(id) {
  const response = await axios.get(`${API_CONFIG.url}/alvaras/solicitacao/${id}`);
  return response;
}

async function deletar(id) {
  const response = await axios.delete(`${API_CONFIG.url}/alvaras/solicitacao/${id}`);
  return response;
}


const alvaraService = {
  inserirPf,
  inserirPj,
  listarId,
  listar,
  deletar,
};

export default alvaraService;
