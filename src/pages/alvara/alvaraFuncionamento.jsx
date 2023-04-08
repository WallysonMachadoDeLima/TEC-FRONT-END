import React from "react";
import global from "../../styles/globals.module.scss";
import Container from "../../components/container/index";
import Button from "../../components/button";
import Input from "../../components/forms/input";
import Status from "../../components/forms/status";
import Title from "../../components/forms/title";
import SubTitle from "../../components/forms/titleSub";
import Form from "../../components/forms/Form";
import Select from "../../components/forms/Select";
import FormGroup from "../../components/forms/FormGroup/index";
import FormItem from "../../components/forms/FormItem/index";
import { useState, useEffect } from "react";
import Table from "../../components/forms/table";
import { useNavigate } from "react-router";
import alvaraService from "../../services/alvara/alvaraFuncionamentoService";
import alvaraServiceAll from "../../services/alvara/alvaraAll";
import { User } from "../../global/Variable";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import Files from "../../services/file/fileService";
import Swal from "sweetalert2";
import ModalGlobal from "../../components/modals/modalText/Modal";
import alvaraAll from "../../services/alvara/alvaraAll";
import TextArea from "../../components/forms/textArea";
import { ValuesGlobais } from "../../global/Variable";

export default () => {
  const [offSet, setOffSet] = useState(1);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [dadosUser, setDadosUser] = useState();
  const [id, setId] = useState(0);
  const [empresa, setEmpresa] = useState();
  const [trocarView, setTrocarView] = useState(0);
  const [ListaAlvara, setListaAlvara] = useState([]);
  const [alvara, setAlvara] = useState([]);
  const [editar, setEditar] = useState(false);

  const [solicitante, setSolicitante] = useState();
  const [estabelecimento, setEstabelecimento] = useState(true);
  const [modalEstabelecimento, setModalEstabelecimento] = useState(true);
  const [dataPagamento, setDataPagamento] = useState();
  const [showInadimplente, setShowInadimplente] = useState(false);

  const [clientePessoaFisica, setClientePessoaFisica] = useState("");
  const [clientePessoaJuridica, setClientePessoaJuridica] = useState("");
  const [restricaoMenores, setRestricaoMenores] = useState();
  const [periodo, setPeriodo] = useState();

  const [fileAlvara, setFileAlvara] = useState();
  const [fileComprovante, setFileComprovante] = useState();
  const [fileDare, setFileDare] = useState();
  const [fileCmb, setFileCmb] = useState();
  const [fileOutros, setFileOutros] = useState();
  const [listaFiles, setListaFiles] = useState([]);

  // ALERTS
  const Alert = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // CONECTION API
  const enviarArquivo = async (e) => {
    Files.inserirCMB(e, fileCmb).then((res) => {
      console.log("ENVIADO");
      setTimeout(() => {
        console.log("");
      }, 1500);
    });
    Files.inserirOutro(e, fileOutros)
      .then((res) => {
        setTimeout(() => {
          if (e?.inadimplente) setShowInadimplente(true);
          //else window.location.reload()
        }, 100);
      })
      .catch((error) => {
        setTimeout(() => {
          if (e?.inadimplente) setShowInadimplente(true);
          //else window.location.reload()
        }, 2500);
      });
  };

  const buscar = async (value) => {
    if (value > 0) {
      alvaraServiceAll.listarSolicitacaoPjId(value).then((response) => {
        console.log("PJ", response.data);
        setListaAlvara(response.data);
      });
    } else {
      alvaraServiceAll.listaSolicitacoesrPfId().then((response) => {
        console.log("PF", response.data);
        setListaAlvara(response.data);
      });
    }
  };

  const inserirComprovante = async (e) => {
    var campo = "dataPagamento";
    e.preventDefault();
    if (fileComprovante) {
      if (dataPagamento) {
        Files.inserirComprovante(id, fileComprovante, campo)
          .then((response) => {})
          .catch((error) => {
            console.log(Object.assign({}, error));
          });

        alvaraAll
          .updateAlvara(id, dataPagamento, campo)
          .then((resonse) => {
            Alert.fire({ icon: "success", title: "Comprovante Enviado" });
            setTimeout(() => {
              console.log("");
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.log("REFAÇA", Object.assign({}, error));
          });
      } else {
        Alert.fire({ icon: "error", title: "Adicione a data de pagamento" });
      }
    } else {
      Alert.fire({ icon: "error", title: "Adicione o Comprovante" });
    }
  };

  const deletar = async (e) => {
    alvaraService.deletar(e).then((response) => {
      alvaraService.deletar(e).then(console.log("DELETADO COM SUCESSO"));
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  const inserir = async (e) => {
    e.preventDefault();

    console.log(clientePessoaJuridica);
    console.log(typeof clientePessoaJuridica);
    const alvaraPF = {
      restricaoMenores: restricaoMenores,
      periodo: parseInt(periodo?.replace(/"/g, "")),
    };
    const alvaraPJ = {
      restricaoMenores: restricaoMenores,
      periodo: parseInt(periodo?.replace(/"/g, "")),
    };

    if (id && editar == true) {
      alvaraAll
        .updateSolicitacao(
          id,
          clientePessoaFisica == user.id ? alvaraPF : alvaraPJ,
          alvara?.tipo
        )
        .then((res) => {
          Alert.fire({ icon: "success", title: "Atualizado com sucesso" });
          if (fileCmb || fileOutros) enviarArquivo(id);
          else {
            setTimeout(() => {
              //  window.location.reload()
            }, 1500);
          }
          console.log("ATUALIZADO COM SUCESSO");
        })
        .catch((error) => {
          const type = Object.assign({}, error).response.status;
          console.log("error update", Object.assign({}, error));
          console.log("error data", error.config.data);
          if (type == 404) {
            Alert.fire({ icon: "success", title: "Atualizado com sucesso" });
            if (fileCmb || fileOutros) enviarArquivo(id);
            else {
              setTimeout(() => {
                // window.location.reload()
              }, 1500);
            }
            console.log("ATUALIZADO COM SUCESSO");
          }
        });
    } else {
      if (clientePessoaFisica == user.id) {
        await alvaraService
          .inserirPf(clientePessoaFisica, alvaraPF)
          .then((response) => {
            console.log("ENVIADO COM SUCESSO | PF");
            Alert.fire({ icon: "success", title: "Solicitado com Sucesso" });
            if (fileCmb || fileOutros) enviarArquivo(response.data.id);
            else {
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          })
          .catch((error) => {
            var type = Object.assign({}, error).response.status;
            if (type == 400)
              Alert.fire({
                icon: "warning",
                title: "Há uma solicitação em andamento",
              });
            if (type == 500)
              Alert.fire({ icon: "error", title: "Preencha todos os campos" });
            console.log("error | PF", Object.assign({}, error));
            console.log("error data", error.config.data);
          });
      } else {
        await alvaraService
          .inserirPj(clientePessoaJuridica, alvaraPJ)
          .then((response) => {
            console.log("ENVIADO COM SUCESSO | PJ");
            console.log(response.data);
            Alert.fire({ icon: "success", title: "Solicitado com Sucesso" });
            if (fileCmb || fileOutros) enviarArquivo(response.data.id);
            else {
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
            response.preventDefault();
          })
          .catch((error) => {
            var type = Object.assign({}, error).response.status;
            if (type == 400)
              Alert.fire({
                icon: "warning",
                title: "Há uma solicitação em andamento",
              });
            if (type == 500)
              Alert.fire({ icon: "error", title: "Preencha todos os campos" });
            console.log("error | PJ", Object.assign({}, error));
            console.log("error data", error.config.data);
          });
      }
    }
  };

  useEffect(() => {
    if (id == 0) {
      alvaraAll
        .listarSolicitacoes()
        .then((response) => {
          console.log(response.data);
          setListaAlvara(response.data);
        })
        .catch((error) => {
          console.log(Object.assign({}, error));
        });
    }
    /*pessoaFisica.listarId(user.id).then((response) => {
      console.log("DADOS", response.data);
      setDadosUser(response.data);
      if (response.data?.estabelecimento) {
        setEstabelecimento(false);
      }
    });*/

    if (id) {
      alvaraService
        .listarId(id)
        .then((response) => {
          setAlvara(response.data);
          console.log(response.data);
          setTrocarView(id);
        })
        .catch((error) => {
          console.log("error | ID", error);
        });
      Files.listarFiles(id).then((response) => {
        console.log("FILE", response.data);
        setListaFiles(response.data);
      });
    }
  }, [trocarView, id]);

  useEffect(() => {}, []);

  return (
    <>
      {trocarView == 0 ? (
        <>
          <Container>
            <Title>ALVARÁS DE FUNCIONAMENTO</Title>
            <Title>
              <p
                onClick={(e) => {
                  setTrocarView(1);
                }}
              >
                <CgAddR />
              </p>
            </Title>
          </Container>

          <Form>
            <FormGroup>
              <FormItem>
                <Select
                  label={"Solicitante"}
                  onChange={(e) => {
                    buscar(e.target.value);
                  }}
                >
                  <option value="" selected>
                    {" "}
                    Selecionar
                  </option>
                  <option value={0}>
                    CPF - {dadosUser?.cpf} - {dadosUser?.nome.toUpperCase()}
                  </option>
                  {empresa?.map((obj, id) => (
                    <option key={id} value={obj.id}>
                      CNPJ - {obj.cnpj} - {obj.nomeFantasia}
                    </option>
                  ))}
                </Select>
              </FormItem>
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
            </FormGroup>

            <FormGroup>
              <FormItem>
                <Table
                  total={ListaAlvara.length}
                  offSet={offSet}
                  setOffSet={setOffSet}
                  full
                >
                  <thead>
                    <td>SOLICITANTE </td>
                    <td>DATA INICIO</td>
                    <td>DATA TERMINO</td>
                    <td>STATUS</td>
                    <td>AÇÕES</td>
                  </thead>
                  <tbody>
                    {ListaAlvara?.map((obj, key) =>
                      key < ValuesGlobais.ItensPage * offSet &&
                      key >=
                        ValuesGlobais.ItensPage * offSet -
                          ValuesGlobais.ItensPage ? (
                        obj.tipo != "EVENTO" ? (
                          <tr key={key}>
                            <td>
                              {obj.clientePessoaFisica != null
                                ? obj.clientePessoaFisica.nome.toUpperCase()
                                : obj.clientePessoaJuridica?.razaoSocial.toUpperCase()}
                            </td>
                            <td>
                              {obj?.dataInicio.split("-").reverse().join("/")}
                            </td>
                            <td>
                              {obj.dataTermino == null
                                ? "-"
                                : obj.dataTermino
                                    .split("-")
                                    .reverse()
                                    .join("/")}
                            </td>
                            <td>
                              <Status>{obj.status}</Status>
                            </td>
                            <td>
                              <p
                                onClick={(e) => {
                                  setId(obj.id);
                                }}
                              >
                                <RiPencilFill />
                              </p>
                              <p>
                                <p
                                  onClick={(e) => {
                                    setShow(!show);
                                  }}
                                >
                                  <RiDeleteBin7Fill />
                                  <ModalGlobal
                                    value={show}
                                    title={`Deletar solicitação selecionada?`}
                                  >
                                    <Button secondary>CANCELAR</Button>
                                    <Button
                                      onClick={(e) => {
                                        deletar(obj.id);
                                      }}
                                    >
                                      CONFIRMAR
                                    </Button>
                                  </ModalGlobal>
                                </p>
                              </p>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    )}
                  </tbody>
                </Table>
              </FormItem>
            </FormGroup>
          </Form>
        </>
      ) : (
        <div>
          {id ? (
            <Container>
              <Title>
                SOLICITAÇÃO -{" "}
                {alvara.clientePessoaFisica
                  ? alvara.clientePessoaFisica.nome.toUpperCase()
                  : alvara.clientePessoaJuridica.razaoSocial.toUpperCase()}
              </Title>
              <Title>
                <p
                  onClick={(e) => {
                    window.location.reload();
                  }}
                >
                  <BsFillArrowLeftSquareFill />
                </p>
              </Title>
            </Container>
          ) : (
            <Container>
              <Title>FORMULÁRIO PARA SOLICITAÇÃO DE ALVARÁS</Title>
              <Title>
                <p
                  onClick={(e) => {
                    setTrocarView(0);
                  }}
                >
                  <BsFillArrowLeftSquareFill />
                </p>
              </Title>
            </Container>
          )}

          <Form>
            {id ? (
              <>
                <FormGroup>
                  <FormItem>
                    <div style={{ marginTop: "20px" }}>
                      <SubTitle>INFORMAÇÕES DO SOLICITANTE</SubTitle>
                    </div>
                  </FormItem>
                  <FormItem>
                    <div className={global.right} style={{ marginTop: "0rem" }}>
                      <Status>{alvara?.status}</Status>
                    </div>
                  </FormItem>
                </FormGroup>
                <FormGroup>
                  <FormItem>
                    <Input
                      value={
                        alvara?.clientePessoaFisica
                          ? alvara.clientePessoaFisica.nome
                          : alvara.clientePessoaJuridica.razaoSocial
                      }
                      secondary
                      full
                      placeholder={"Nome do solicitante"}
                    />
                  </FormItem>
                  <FormItem>
                    <Input
                      value={
                        alvara?.clientePessoaFisica
                          ? alvara.clientePessoaFisica.telefoneCelular
                          : alvara.clientePessoaJuridica.telefoneCelular
                      }
                      secondary
                      full
                      placeholder={"Telefone celular"}
                    />
                  </FormItem>
                  <FormItem>
                    <Input
                      value={
                        alvara?.clientePessoaFisica
                          ? alvara.clientePessoaFisica.telefoneComercial
                          : alvara.clientePessoaJuridica.telefoneComercial
                      }
                      secondary
                      full
                      placeholder={"Telefone Comercial"}
                    />
                  </FormItem>
                </FormGroup>
              </>
            ) : (
              ""
            )}
            <FormGroup>
              <FormItem>
                <SubTitle>ATIVIDADE DO ESTABELECIMENTO</SubTitle>
              </FormItem>
            </FormGroup>

            <FormGroup>
              <FormItem>
                <Select
                  disabled={id ? true : false}
                  value={
                    clientePessoaJuridica
                      ? clientePessoaJuridica
                      : clientePessoaFisica
                      ? 0
                      : ""
                  }
                  label={"Solicitante"}
                  onChange={(e) => {
                    setSolicitante(e.target.value);
                    {
                      e.target.value == 0
                        ? setClientePessoaFisica(user.id)
                        : setClientePessoaJuridica(
                            parseInt(e.target.value?.replace(/"/g, ""))
                          );
                    }
                    {
                      e.target.value == 0
                        ? setClientePessoaJuridica("")
                        : setClientePessoaFisica("");
                    }
                    if (e.target.value == 0 && modalEstabelecimento == 0) {
                      setEstabelecimento(true);
                    }
                  }}
                >
                  <option value="" selected>
                    {" "}
                    Selecionar
                  </option>
                  <option value={0}>
                    CPF - {dadosUser?.cpf} - {dadosUser?.nome.toUpperCase()}
                  </option>
                  {empresa?.map((obj, id) => (
                    <option key={id} value={obj.id}>
                      CNPJ - {obj.cnpj} - {obj.nomeFantasia}
                    </option>
                  ))}
                </Select>
              </FormItem>
              {clientePessoaFisica == user.id && estabelecimento == true ? (
                <ModalGlobal
                  value={estabelecimento}
                  title={`Estabelecimeto não encontrado!`}
                  msg={
                    "Para fazer uma solicitação de funcionamento com o seu CPF você precisa cadastrar um estabelecimeto "
                  }
                >
                  <Button
                    danger
                    onClick={(e) => {
                      setSolicitante("");
                      setEstabelecimento(false);
                      setModalEstabelecimento(0);
                    }}
                  >
                    CANCELAR
                  </Button>
                  <Button
                    onClick={(e) => {
                      navigate("/estabelecimento/");
                    }}
                  >
                    CADASTRAR
                  </Button>
                </ModalGlobal>
              ) : (
                ""
              )}
              <FormItem>
                <Select
                  label={"Fornecimento de bebida alcoólica"}
                  full
                  value={
                    id && editar == false
                      ? alvara.alvara.restricaoMenores
                      : restricaoMenores
                  }
                  onChange={(e) => {
                    setRestricaoMenores(e.target.value);
                  }}
                >
                  <option value="">Selecionar</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </Select>
              </FormItem>
            </FormGroup>

            <FormGroup>
              <FormItem>
                <Select
                  label={"Selecione um Período"}
                  value={
                    id && editar == false
                      ? alvara.alvara.periodo == "ANUAL"
                        ? 1
                        : 0
                      : periodo
                  }
                  onChange={(e) => {
                    setPeriodo(e.target.value);
                  }}
                >
                  <option value="" selected>
                    Selecionar
                  </option>
                  <option value={"0"}>30 dias</option>
                  <option value={"1"}>1 ano</option>
                </Select>
              </FormItem>
            </FormGroup>

            {editar == false && id != 0 ? (
              <>
                {listaFiles?.length > 0 ? (
                  <>
                    <FormGroup>
                      <FormItem>
                        <SubTitle>DOCUMENTOS ANEXADOS</SubTitle>
                      </FormItem>
                    </FormGroup>

                    <FormGroup>
                      <FormItem>
                        <Table full>
                          <thead>
                            <td>NOME</td>
                            <td>TIPO</td>
                            <td>DATA/HORA DO ENVIO</td>
                            <td>AÇÕES</td>
                          </thead>
                          <tbody>
                            {listaFiles?.map((obj, id) => (
                              <tr key={id}>
                                <td>{obj.nomeArquivo}</td>
                                <td>{obj.tipo}</td>
                                <td>{obj.dataHoraEnvio}</td>

                                <td
                                  onClick={(e) => {
                                    Files.downloadFile(obj.link);
                                  }}
                                >
                                  <p
                                    onClick={(e) => {
                                      Files.downloadFile(obj.link);
                                    }}
                                  >
                                    <BsFillEyeFill />
                                  </p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </FormItem>
                    </FormGroup>

                    {id && alvara?.status == "Pendente" ? (
                      <>
                        <FormGroup>
                          <FormItem>
                            <SubTitle>OBSERVAÇÕES DA SOLICITAÇÃO</SubTitle>
                          </FormItem>
                        </FormGroup>

                        <FormGroup>
                          <FormItem>
                            <TextArea
                              label={"Observações"}
                              value={
                                alvara
                                  ? alvara?.alvara.observacaoAlvara
                                  : "Sem observações"
                              }
                            />
                          </FormItem>
                        </FormGroup>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <FormGroup>
                    <FormItem>
                      <SubTitle>DOCUMENTOS ANEXADOS (0)</SubTitle>
                    </FormItem>
                  </FormGroup>
                )}

                {alvara?.status == "Pendente" && (
                  <div className={global.right}>
                    <Button
                      onClick={(e) => {
                        setEditar(true);
                        e.preventDefault();
                      }}
                    >
                      Editar
                    </Button>
                  </div>
                )}
              </>
            ) : (
              ""
            )}

            {editar == true || id == 0 ? (
              <>
                <FormGroup>
                  <FormItem>
                    <SubTitle>ANEXAR DOCUMENTOS</SubTitle>
                  </FormItem>
                </FormGroup>

                <FormGroup>
                  <FormItem>
                    <Input
                      placeholder={"Laudo do Corpo de Bombeiro"}
                      type={"file"}
                      accept={".pdf, .docx, image/*"}
                      onChange={(e) => {
                        console.log(e.target.files);
                        console.log(e.target.files[0]);
                        setFileCmb(e.target.files);
                      }}
                    />
                  </FormItem>
                  <FormItem />
                </FormGroup>

                <FormGroup>
                  <FormItem>
                    <Input
                      multiple
                      placeholder={"Outros arquivos"}
                      type={"file"}
                      accept={".pdf, .docx, image/*"}
                      onChange={(e) => {
                        console.log(e.target.files);
                        console.log(e.target.files[0]);
                        setFileOutros(e.target.files);
                      }}
                    />
                  </FormItem>
                  <FormItem />
                </FormGroup>

                {alvara?.status ? (
                  <div className={global.right}>
                    <Button
                      secondary
                      mr
                      onClick={(e) => {
                        setEditar(false);
                        e.preventDefault();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={inserir}>Salvar</Button>
                  </div>
                ) : (
                  <div className={global.right}>
                    <Button onClick={inserir}>Enviar</Button>
                  </div>
                )}
                {showInadimplente ? (
                  <ModalGlobal
                    value={showInadimplente}
                    title={`⚠️ EMPRESA INADIMPLENTE`}
                    msg={`Sua empresa está inadimplente e isso resultará em combranças adicionais`}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={(e) => {
                          window.location.reload();
                        }}
                      >
                        OK
                      </Button>
                    </div>
                  </ModalGlobal>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </Form>

          {alvara?.status == "Aguardando Pagamento" &&
          alvara?.dataPagamento == null ? (
            <Form>
              <FormGroup>
                <FormItem>
                  <SubTitle>DOCUMENTO DE PAGAMENTO</SubTitle>
                </FormItem>
              </FormGroup>

              <FormGroup>
                <FormItem>
                  <Input
                    placeholder={"Comprovante de pagamento"}
                    type={"file"}
                    accept={".pdf, .docx, image/*"}
                    onChange={(e) => {
                      setFileComprovante(e.target.files);
                    }}
                  />
                </FormItem>
                <FormItem />
                <FormItem>
                  <div style={{ marginTop: 12 }}>
                    <Input
                      type={"date"}
                      label={"Data de Pagamento"}
                      onChange={(e) => {
                        setDataPagamento(e.target.value);
                      }}
                    />
                  </div>
                </FormItem>
              </FormGroup>
              <div className={global.right}>
                <Button
                  success
                  onClick={(e) => {
                    inserirComprovante(e);
                  }}
                >
                  Enviar Comprovante
                </Button>
              </div>
            </Form>
          ) : alvara?.status == "Aguardando Pagamento" &&
            alvara?.pago == false ? (
            <Container position>
              <Title>
                <div style={{ justifyContent: "center" }}>
                  AGUARDANDO CONFIRMAÇÃO DO PAGAMENTO 💸
                </div>
              </Title>
            </Container>
          ) : (
            ""
          )}

          {alvara?.status == "Aguardando Despacho" ? (
            <Container position>
              <Title>
                <div style={{ justifyContent: "center" }}>
                  PAGAMENTO CONFIRMADO, ESPERANDO DESPACHO DO DELEGADO 😎
                </div>
              </Title>
            </Container>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};
