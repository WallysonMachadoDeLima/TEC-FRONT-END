import axios from "axios";
import { API_CONFIG } from "../../config/api.config";
const token = JSON.parse(localStorage.getItem("token"));

async function Inserir(data) {
  const response = await axios.post(`${API_CONFIG.baseUrl}/pessoas`, data, {
    headers: { Authorization: `${token}` },
  });
  return response;
}

async function Listar(search) {
  console.log(search);
  const response = await axios.get(
    `${API_CONFIG.baseUrl}/pessoas/?search=${
      search?.length >= 3 ? search : ""
    }`,
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response;
}

async function ListarId(id) {
  const response = await axios.get(`${API_CONFIG.baseUrl}/pessoas/${id}`, {
    headers: { Authorization: `${token}` },
  });
  return response;
}

async function Update(id, data) {
  console.log(data);
  const response = await axios.patch(
    `${API_CONFIG.baseUrl}/pessoas/${id}`,
    data,
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response;
}

async function Deletar(id) {
  const response = await axios.delete(`${API_CONFIG.baseUrl}/pessoas/${id}`, {
    headers: { Authorization: `${token}` },
  });
  return response;
}

const PessoaService = {
  Inserir,
  Listar,
  ListarId,
  Update,
  Deletar,
};
export default PessoaService;
