import axios from "axios";
import { API_CONFIG } from "../../config/api.config";

async function listar() {
 
  const response = await axios.get(`${API_CONFIG.url}/alvaras/solicitacao/evento`);
  return response;
}

async function inserirPF(id,alvara) {
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/evento/pf/${id}`,
    alvara
  );
  return response;
}

async function inserirPJ(id, alvara) {
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/evento/pj/${id}`,
    alvara
  );
  return response;
}

async function listarPj(id) {
  const response = await axios.get(`${API_CONFIG.url}/alvaras/solicitacao/pj/${id}`);
 
  return response;
}

async function listarPf() {
  const user = JSON.parse(localStorage.getItem("user"))
  const response = await axios.get(`${API_CONFIG.url}/alvaras/solicitacao/pf/${user.id}`);
 
  return response;
}

async function listarId(id) {
  const response = await axios.get(`${API_CONFIG.url}/alvaras/solicitacao/${id}`)
  return response;
}

async function listarEvento() {
  const response = await axios.get(`${API_CONFIG.url}/integracao/tipoEvento`);
  return response;
}

async function deletar(id) {
  const response = await axios.delete(`${API_CONFIG.url}/alvaras/solicitacao/${id}`);
  return response;
}



const alvaraService = {
  listar,
  inserirPF,
  inserirPJ,
  listarPj,
  listarPf,
  listarId,
  listarEvento,
  deletar,
};

export default alvaraService;
