import axios from "axios";
import { API_CONFIG } from "../../config/api.config";

// ATENDENTE

async function gerarAlvara(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/${id}/geraralvara`
  );
  return response;
}

async function vincularAtendente(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/${id}/atendente?atendente=${user.id}`
  );
  return response;
}

async function minhasSolicitacoesFuncionamentoAtendente() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/funcionamento/atendente/${user.id}`
  );
  return response;
}

async function solicitacoesAbertoFuncionamentoAtendente() {
  const colaborador = JSON.parse(localStorage.getItem("colaborador"));
  console.log("COLABORA", colaborador);

  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/funcionamento/delegacia/${colaborador?.delegacia}/atendente/abertas`
  );
  return response;
}

async function minhasSolicitacoesEventoAtendente() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/evento/atendente/${user.id}`
  );
  return response;
}

async function solicitacoesAbertoEventoAtendente() {
  const colaborador = JSON.parse(localStorage.getItem("colaborador"));
  console.log("COLABORA", colaborador);
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/evento/delegacia/${colaborador?.delegacia}/atendente/abertas`
  );
  return response;
}

// DELEGADO

async function vincularDelegado(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/${id}/delegado?delegado=${user.id}`
  );
  return response;
}

async function minhasSolicitacoesFuncionamentoDelegado() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/funcionamento/delegado/${user.id}`
  );
  return response;
}

async function solicitacoesAbertoFuncionamentoDelegado() {
  const colaborador = JSON.parse(localStorage.getItem("colaborador"));
  console.log("COLABORA", colaborador);
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/funcionamento/delegacia/${colaborador?.delegacia}/delegado/abertas`
  );
  return response;
}

async function minhasSolicitacoesEventoDelegado() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/evento/delegado/${user.id}`
  );
  return response;
}

async function solicitacoesAbertoEventoDelegado() {
  const colaborador = JSON.parse(localStorage.getItem("colaborador"));
  console.log("COLABORA", colaborador);
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/evento/delegacia/${colaborador?.delegacia}/delegado/abertas`
  );

  return response;
}

async function listarSolicitacoes() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/user/${user.id}`
  );

  return response;
}

async function updateAlvara(id, data, campo) {
  const user = JSON.parse(localStorage.getItem("user"));
  let json = "";
  if (
    campo == "status" ||
    campo == "dataPagamento" ||
    campo == "alvara/observacaoAlvara"
  ) {
    json = JSON.stringify([{ op: "replace", path: `/${campo}`, value: data }]);
  } else {
    if (user.profile == "Atendente") {
      json = JSON.stringify([
        {
          op: "add",
          path: `/${campo}`,
          value: { observacao: data, atendente: { id: user.id } },
        },
      ]);
    } else {
      json = JSON.stringify([
        {
          op: "add",
          path: `/${campo}`,
          value: { observacao: data, delegado: { id: user.id } },
        },
      ]);
    }
  }
  console.log(json);
  const response = await axios.patch(
    `${API_CONFIG.url}/alvaras/solicitacao/${id}`,
    json,
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );

  return response;
}

async function aprovarPagamento(id) {
  const response = await axios.post(
    `${API_CONFIG.url}/alvaras/solicitacao/${id}/pago`
  );
  return response;
}

// SOLICITAÇÕES
async function listarSolicitacaoPjId(id) {
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/pj/${id}`
  );
  return response;
}

async function listaSolicitacoesrPfId(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(
    `${API_CONFIG.url}/alvaras/solicitacao/pf/${id ? id : user.id}`
  );

  return response;
}

async function updateSolicitacao(id, alvara, tipo) {
  console.log("TIPO", tipo);
  console.log("DADOS UP", alvara);
  var json = [];
  var atributos = Object.keys(alvara);

  for (var i in atributos) {
    console.log(atributos[i]);
    if (alvara[atributos[i]] > -1 || alvara[atributos[i]]) {
      if (
        atributos[i] != "clientePessoaJuridica" &&
        atributos[i] != "clientePessoaFisica"
      ) {
        if (tipo == "EVENTO" && atributos[i] == "tipoEvento") {
          json.push({
            op: "replace",
            path: `/alvara/tipoEvento`,
            value: { id: alvara[atributos[i]] },
          });
          console.log(json);
        } else {
          json.push({
            op: "replace",
            path: `/alvara/${atributos[i]}`,
            value: alvara[atributos[i]],
          });
          console.log(json);
        }
      }
    }
  }

  const response = await axios.patch(
    `${API_CONFIG.url}/alvaras/solicitacao/${id}`,
    JSON.stringify(json),
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
  return response;
}

const alvaraAll = {
  gerarAlvara,
  vincularAtendente,
  minhasSolicitacoesFuncionamentoAtendente,
  solicitacoesAbertoFuncionamentoAtendente,
  minhasSolicitacoesEventoAtendente,
  solicitacoesAbertoEventoAtendente,
  vincularDelegado,
  minhasSolicitacoesFuncionamentoDelegado,
  solicitacoesAbertoFuncionamentoDelegado,
  minhasSolicitacoesEventoDelegado,
  solicitacoesAbertoEventoDelegado,
  listarSolicitacoes,
  updateAlvara,
  updateSolicitacao,
  aprovarPagamento,

  listarSolicitacaoPjId,
  listaSolicitacoesrPfId,
};

export default alvaraAll;
