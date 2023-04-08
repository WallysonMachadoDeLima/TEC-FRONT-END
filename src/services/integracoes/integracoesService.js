import axios from "axios";
import { API_CONFIG } from "../../config/api.config";

const user = JSON.parse(localStorage.getItem("user"));
// /integracao/consulta/cnpj?cnpj=07554169000132
async function cnpj(cnpj) {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/consulta/cnpj?cnpj=${cnpj}`
  );
  return response;
}

async function cidade() {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/consulta/cidades?uf=11`
  );
  return response;
}

async function cidadeId(id) {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/consulta/cidade/${id}`
  );
  return response;
}

async function cep(cep) {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/consulta/cep?cep=${cep}`
  );
  return response;
}

async function perfil() {
  const response = await axios.get(`${API_CONFIG.url}/integracao/perfis`);
  return response;
}

async function duracaoAlvara() {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/duracaoAlvara`
  );
  return response;
}

async function itensAtividade() {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/itensAtividades`
  );
  return response;
}

async function statusSolicitacoes() {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/statusSolicitacao`
  );
  return response;
}

async function tipoCnpj(tipo) {
  const response = await axios.post(
    `${API_CONFIG.url}/integracao/tipoCnpj/${tipo}`
  );
  return response;
}

async function solicitacoesAll() {
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/contagem/all`
  );
  return response;
}

async function orgaoExpedidor() {
  const response = await axios.get(
    `${API_CONFIG.url}/integracao/orgaosExpedidores`
  );
  return response;
}

async function estadoExpedidor() {
  const response = await axios.get(`${API_CONFIG.url}/integracao/uf`);
  return response;
}

async function atividades() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(`${API_CONFIG.url}/integracao/atividades`);
  return response;
}

async function aguardandoComprovantePagamento() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/atendente/${user.id}/agcomp/contagem`
  );
  return response;
}

async function aguardandoConfirmacaoPagamento() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/atendente/${user.id}/agconf/contagem`
  );
  return response;
}

async function statusDelegacia(id) {
  console.log("IDD", id);
  const user = JSON.parse(localStorage.getItem("user"));
  const colaborador = JSON.parse(localStorage.getItem("colaborador"));
  console.log("COLABORA", colaborador);

  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/contagem/delegacia/${
      id >= 1 ? id : colaborador.delegacia
    }`
  );
  return response;
}

async function contagemNotificacoes() {
  const response = await axios.get(
    `${API_CONFIG.url}/usuarios/${user.id}/count`
  );
  return response;
}
const CnpjService = {
  cnpj,
  cidade,
  cidadeId,
  cep,
  perfil,
  duracaoAlvara,
  itensAtividade,
  statusSolicitacoes,
  tipoCnpj,
  solicitacoesAll,
  orgaoExpedidor,
  estadoExpedidor,
  atividades,
  statusDelegacia,
  aguardandoComprovantePagamento,
  aguardandoConfirmacaoPagamento,
  contagemNotificacoes,
};

export default CnpjService;
