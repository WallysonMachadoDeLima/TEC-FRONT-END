import React, { useEffect, useState } from "react";
import global from "../../styles/globals.module.scss";
import Data from "../../components/data";
import Form from "../../components/forms/Form";
import FormGroup from "../../components/forms/FormGroup";
import FormItem from "../../components/forms/FormItem";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Container from "../../components/container";
import Title from "../../components/forms/title";
import { AiOutlineFileDone } from "react-icons/ai";
import { AiOutlineFileSearch } from "react-icons/ai";
import { AiOutlineFileSync } from "react-icons/ai";
import integracoesService from "../../services/integracoes/integracoesService";

export default () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [delegacia, setDelegacia] = useState([]);
  const [espPagamento, setEspPagamento] = useState([]);
  const [espConfirmacaoPagamento, setEspConfirmacaoPagamento] = useState();
  const [delegaciaId, setDelegaciaId] = useState(null);

  useEffect(() => {
    integracoesService.aguardandoComprovantePagamento().then((response) => {
      setEspPagamento(response.data);
    });
    integracoesService.aguardandoConfirmacaoPagamento().then((response) => {
      var soma = response.data.EVENTO + response.data.FUNCIONAMENTO;
      setEspConfirmacaoPagamento(soma);
    });
  }, []);

  return (
    <div>
      <Form full>
        <FormGroup>
          <FormItem>
            <Data
              text={"SOLICITAÇÕES PENDENTES"}
              value={delegacia.PENDENTE ? delegacia.PENDENTE : 0}
              pendente
            >
              <AiOutlineFileSync />
            </Data>
          </FormItem>
          <FormItem>
            <Data
              text={"SOLICITAÇÕES EM ANÁLISE"}
              value={delegacia.ANALISE ? delegacia.ANALISE : 0}
              analize
            >
              <AiOutlineFileSync />
            </Data>
          </FormItem>
          <FormItem>
            <Data
              text={"AGUARDANDO PAGAMENTO FUNCIONAMENTO"}
              value={
                espPagamento?.FUNCIONAMENTO ? espPagamento?.FUNCIONAMENTO : 0
              }
              agPagamento
            >
              <AiOutlineFileSearch />
            </Data>
          </FormItem>
          <FormItem>
            <Data
              text={"AGUARDANDO PAGAMENTO EVENTO"}
              value={espPagamento?.EVENTO ? espPagamento?.EVENTO : 0}
              agPagamento
            >
              <AiOutlineFileSearch />
            </Data>
          </FormItem>
        </FormGroup>
      </Form>

      <Form>
        <FormGroup>
          <FormItem>
            <Data
              text={"AGUARDANDO CONFIRMAÇÃO PAGAMENTO "}
              value={espConfirmacaoPagamento >= 1 ? espConfirmacaoPagamento : 0}
              pagamento
            >
              <AiOutlineFileDone />
            </Data>
          </FormItem>
          <FormItem>
            <Data
              text={"AGUARDANDO DESPACHO "}
              value={
                delegacia.AGUARDANDO_DESPACHO
                  ? delegacia.AGUARDANDO_DESPACHO
                  : 0
              }
              despacho
            >
              <AiOutlineFileDone />
            </Data>
          </FormItem>
          <FormItem>
            <Data
              text={"SOLICITAÇÕES LIBERADAS"}
              value={delegacia.LIBERADO ? delegacia.LIBERADO : 0}
              liberado
            >
              <AiOutlineFileDone />
            </Data>
          </FormItem>
          <FormItem>
            <Data
              text={"SOLICITAÇÕES RECUSADAS"}
              value={delegacia.RECUSADA ? delegacia.RECUSADA : 0}
              suspenso
            >
              <AiOutlineFileSync />
            </Data>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};
