import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import global from "../../styles/globals.module.scss";
import ContainerTitle from "../../components/container/index";
import Button from "../../components/button";
import Input from "../../components/forms/input";
import Title from "../../components/forms/title";
import SubTitle from "../../components/forms/titleSub";
import ContainerForm from "../../components/forms/Form";
import Select from "../../components/forms/Select";
import FormGroup from "../../components/forms/FormGroup/index";
import FormItem from "../../components/forms/FormItem/index";
import Status from "../../components/forms/status/index";
import Table from "../../components/forms/table";
import { BsFillArrowLeftSquareFill, BsUpload } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import Files from "../../services/file/fileService";
import integracoesSevice from "../../services/integracoes/integracoesService";
import alvaraService from "../../services/alvara/alvaraEventoService";
import alvaraServiceAll from "../../services/alvara/alvaraAll";
import { User } from "../../global/Variable";
import ModalGlobal from "../../components/modals/modalText/Modal";
import Swal from "sweetalert2";
import { RiPencilFill } from "react-icons/ri";
import alvaraAll from "../../services/alvara/alvaraAll";
import TextArea from "../../components/forms/textArea";
import { ValuesGlobais } from "../../global/Variable";

// NEW
import * as ValidatorCpf from "gerador-validador-cpf";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import PessoaService from "../../services/pessoa/perfilService";
// NEW

export default () => {
  const [offSet, setOffSet] = useState(1);
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navegate = useNavigate();
  const [action, setAction] = useState("list");
  const [pessoas, setPessoas] = useState([]);
  const [pessoa, setPessoa] = useState({});
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");

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

  // NEW
  const [initialValuesPessoa, setInitialValuesPessoa] = useState({
    nome: "",
    cpf: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    nomePai: "",
    nomeMae: "",
    responsavel: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    numero: "",
  });
  const [formInvalido, setFormInvalido] = useState({
    nome: false,
    cpf: false,
    email: false,
    dataNascimento: false,
    telefone: false,
    nomePai: false,
    nomeMae: false,
    cep: false,
    estado: false,
    cidade: false,
    bairro: false,
    logradouro: false,
    numero: false,
  });
  const formValid = Object.values(formInvalido).every((value) => !value);

  const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .test("cpf", "CPF inválido", (value) => {
        return ValidatorCpf.validate(value);
      }),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    dataNascimento: Yup.string().required("Data de nascimento é obrigatório"),
    telefone: Yup.string().required("Telefone é obrigatório"),
    nomePai: Yup.string().required("Nome do pai é obrigatório"),
    nomeMae: Yup.string().required("Nome da mãe é obrigatório"),
    responsavel: Yup.string(),
    cep: Yup.string().required("CEP é obrigatório"),
    estado: Yup.string().required("Estado é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatório"),
    bairro: Yup.string().required("Bairro é obrigatório"),
    logradouro: Yup.string().required("Logradouro é obrigatório"),
    numero: Yup.string().required("numero é obrigatório"),
  });
  // NEW

  // CONECTION API
  const Deletar = async (e) => {
    PessoaService.Deletar(e).then((response) => {
      Alert.fire({
        icon: "success",
        title: "Pessoa removida com sucesso ",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };
  const Inserir = async (e) => {
    if (action === "register") {
      await PessoaService.Inserir(e)
        .then((res) => {
          Alert.fire({
            icon: "success",
            title: "Cadastrado com sucesso ",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000 * 3);
        })
        .catch((error) => {
          console.log(Object.assign({}, error));
          Alert.fire({
            icon: "error",
            title: `${Object.assign({}, error).response.data.mensagem}`,
          });
        });
    } else {
      await PessoaService.Update(id, e)
        .then((res) => {
          Alert.fire({
            icon: "success",
            title: "Atualizado com sucesso ",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000 * 3);
        })
        .catch((error) => {
          console.log(Object.assign({}, error));
          Alert.fire({
            icon: "error",
            title: `${Object.assign({}, error).response.data.mensagem}`,
          });
        });
    }
  };

  // HOOKS
  useEffect(() => {
    if (id) {
      PessoaService.ListarId(id).then((response) => {
        setPessoa(response.data.pessoa);
        console.log(response.data.pessoa);
        setAction("upload");
        setInitialValuesPessoa({
          nome: response.data.pessoa?.nome,
          cpf: response.data.pessoa?.cpf,
          email: response.data.pessoa?.email,
          dataNascimento: response.data.pessoa?.dataNascimento,
          telefone: response.data.pessoa?.telefone,
          nomePai: response.data.pessoa?.nomePai,
          nomeMae: response.data.pessoa?.nomeMae,
          responsavel: response.data.pessoa?.responsavel,
          cep: response.data.pessoa?.cep,
          estado: response.data.pessoa?.estado,
          cidade: response.data.pessoa?.cidade,
          bairro: response.data.pessoa?.bairro,
          logradouro: response.data.pessoa?.logradouro,
          numero: response.data.pessoa?.numero,
        });
      });
    } else {
    }
  }, [id]);

  useEffect(() => {
    PessoaService.Listar(search).then((response) => {
      setPessoas(response.data.pessoa);
      console.log(response.data);
    });
  }, [search]);
  /*
  useEffect(() => {
    if (trocarView == 1 || editar == true) {
      if (cep.length == 8) {
        integracoesSevice
          .cep(cep)
          .then((response) => {
            setBairro(response.data.neighborhood);
            integracoesSevice.cidade().then((res) => {
              for (var i in res.data) {
                if (response.data.city === res.data[i].nome) {
                  setCidade({ id: res.data[i].id, nome: res.data[i].nome });
                }
              }
            });
            setLogradouro(response.data.street);
          })
          .catch((error) => {
            Alert.fire({ icon: "error", title: "CEP não encontrado" });
          });
      }
    }
  }, [cep]);
*/
  return (
    <>
      {action === "list" && (
        <>
          <ContainerTitle>
            <Title>CADASTRO DE PESSOAS</Title>
            <Title>
              <p
                onClick={(e) => {
                  setAction("register");
                }}
              >
                <CgAddR />
              </p>
            </Title>
          </ContainerTitle>

          <ContainerForm>
            <Row>
              <Col md={5}>
                <FormItem>
                  <FloatingLabel label="Buscar">
                    <Form.Control
                      type="text"
                      name="nome"
                      placeholder="Buscar pessoa"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </FormItem>
              </Col>
            </Row>

            <FormItem>
              <Table
                total={pessoas.length}
                offSet={offSet}
                setOffSet={setOffSet}
                full
              >
                <thead>
                  <td>NOME</td>

                  {window.innerWidth > 1000 ? (
                    <>
                      <td>CPF</td>
                      <td>EMAIL</td>
                    </>
                  ) : (
                    ""
                  )}
                  {window.innerWidth > 600 ? <td>DATA NASCIMENTO</td> : ""}

                  <td>AÇÕES</td>
                </thead>
                <tbody>
                  {pessoas &&
                    pessoas?.map((obj, key) =>
                      key < ValuesGlobais.ItensPage * offSet &&
                      key >=
                        ValuesGlobais.ItensPage * offSet -
                          ValuesGlobais.ItensPage ? (
                        <tr key={key}>
                          <td>{obj?.nome}</td>
                          {window.innerWidth > 1000 ? (
                            <>
                              <td>{obj?.cpf}</td>
                              <td>{obj?.email}</td>
                            </>
                          ) : (
                            ""
                          )}
                          {window.innerWidth > 600 ? (
                            <td>
                              {obj?.dataNacimento
                                .substring(0, 10)
                                ?.split("-")
                                .reverse()
                                .join("/")}
                            </td>
                          ) : (
                            ""
                          )}

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
                                  title={`Deletar pessoa selecionada?`}
                                >
                                  <Button secondary>CANCELAR</Button>
                                  <Button
                                    onClick={(e) => {
                                      Deletar(obj.id);
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
                    )}
                </tbody>
              </Table>
            </FormItem>
          </ContainerForm>
        </>
      )}
      {action === "register" || action === "upload" ? (
        <>
          <ContainerTitle>
            <Title>CADASTRO DE PESSOAS</Title>
            <Title>
              <p
                onClick={(e) => {
                  if (action == "upload") window.location.reload();
                  else setAction("list");
                }}
              >
                <BsFillArrowLeftSquareFill />
              </p>
            </Title>
          </ContainerTitle>
          <ContainerForm>
            <Formik
              validationSchema={schema}
              onSubmit={(e) => {
                Inserir(e);
              }}
              initialValues={initialValuesPessoa}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <FormItem>
                        <SubTitle>INFORMAÇÕES GERAIS</SubTitle>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Nome">
                          <Form.Control
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={values.nome}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                nome: !!errors.nome,
                              })
                            }
                            isInvalid={formInvalido.nome}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nome}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="CPF">
                          <Form.Control
                            type="text"
                            name="cpf"
                            placeholder="CPF"
                            value={values.cpf}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                cpf: !!errors.cpf,
                              })
                            }
                            isInvalid={formInvalido.cpf}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cpf}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Email">
                          <Form.Control
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                email: !!errors.email,
                              })
                            }
                            isInvalid={formInvalido.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormItem>
                        <FloatingLabel label="Data Nacimento">
                          <Form.Control
                            type="date"
                            name="dataNascimento"
                            placeholder="Data Nacimento"
                            value={values.dataNascimento}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                dataNascimento: !!errors.dataNascimento,
                              })
                            }
                            isInvalid={formInvalido.dataNascimento}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.dataNascimento}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={6}>
                      <FormItem>
                        <FloatingLabel label="Telefone">
                          <Form.Control
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            value={values.telefone}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                telefone: !!errors.telefone,
                              })
                            }
                            isInvalid={formInvalido.telefone}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.telefone}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <FormItem>
                        <SubTitle>AFILIAÇÃO</SubTitle>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Nome do Pai">
                          <Form.Control
                            type="text"
                            name="nomePai"
                            placeholder="Nome do Pai"
                            value={values.nomePai}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                nomePai: !!errors.nomePai,
                              })
                            }
                            isInvalid={formInvalido.nomePai}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nomePai}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Nome da mãe">
                          <Form.Control
                            type="text"
                            name="nomeMae"
                            placeholder="Nome da mãe"
                            value={values.nomeMae}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                nomeMae: !!errors.nomeMae,
                              })
                            }
                            isInvalid={formInvalido.nomeMae}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nomeMae}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Responsável">
                          <Form.Control
                            type="text"
                            name="responsavel"
                            placeholder="Responsável"
                            value={values.responsavel}
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <FormItem>
                        <SubTitle>ENDEREÇO</SubTitle>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="CEP">
                          <Form.Control
                            type="text"
                            name="cep"
                            placeholder="CEP"
                            value={values.cep}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                cep: !!errors.cep,
                              })
                            }
                            isInvalid={formInvalido.cep}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cep}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Estado">
                          <Form.Control
                            type="text"
                            name="estado"
                            placeholder="Estado"
                            value={values.estado}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                estado: !!errors.estado,
                              })
                            }
                            isInvalid={formInvalido.estado}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.estado}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Cidade">
                          <Form.Control
                            type="text"
                            name="cidade"
                            placeholder="Cidade"
                            value={values.cidade}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                cidade: !!errors.cidade,
                              })
                            }
                            isInvalid={formInvalido.cidade}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cidade}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Bairro">
                          <Form.Control
                            type="text"
                            name="bairro"
                            placeholder="Bairro"
                            value={values.bairro}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                bairro: !!errors.bairro,
                              })
                            }
                            isInvalid={formInvalido.bairro}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.bairro}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Logradouro">
                          <Form.Control
                            type="text"
                            name="logradouro"
                            placeholder="Logradouro"
                            value={values.logradouro}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                logradouro: !!errors.logradouro,
                              })
                            }
                            isInvalid={formInvalido.logradouro}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.logradouro}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                    <Col md={4}>
                      <FormItem>
                        <FloatingLabel label="Número">
                          <Form.Control
                            type="text"
                            name="numero"
                            placeholder="Número"
                            value={values.numero}
                            onChange={handleChange}
                            onBlur={() =>
                              setFormInvalido({
                                ...formInvalido,
                                numero: !!errors.numero,
                              })
                            }
                            isInvalid={formInvalido.numero}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.numero}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "2rem" }}>
                    <Col md={4} className="text-end"></Col>
                    <Col md={4} className="text-end"></Col>
                    <Col md={4} className="text-end">
                      <Button
                        full
                        onClick={(e) => {
                          const updatedFormInvalido = {};
                          for (let i in values) {
                            if (!values[i] && formInvalido[i] === false) {
                              updatedFormInvalido[i] = true;
                              console.log(values[i]);
                            } else {
                              updatedFormInvalido[i] = false;
                            }
                          }
                          setFormInvalido(updatedFormInvalido);
                          console.log(formInvalido);
                          if (formValid) {
                            handleSubmit();
                          }

                          e.preventDefault();
                        }}
                      >
                        CADASTRAR
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </ContainerForm>
        </>
      ) : (
        ""
      )}
    </>
  );
};
