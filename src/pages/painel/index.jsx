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
import PessoaService from "../../services/pessoa/perfilService";

export default () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalPessoas, setTotalPessoas] = useState(0);

  useEffect(() => {
    PessoaService.Listar().then((response) => {
      setTotalPessoas(response.data.quantidade);
    });
  }, []);

  return (
    <div>
      <Form full>
        <FormGroup>
          <FormItem>
            <Data text={"PESSOAS CADASTRADAS"} value={totalPessoas} pendente>
              <AiOutlineFileSearch />
            </Data>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};
