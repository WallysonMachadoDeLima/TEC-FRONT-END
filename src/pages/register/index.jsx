import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./Registration.module.scss";
import global from "../../styles/globals.module.scss";
import Button from "../../components/button";
import Modal from "../../components/modals/modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import RegisterService from "../../services/register/registerService";

export default () => {
  const navegate = useNavigate();
  const [formInvalido, setFormInvalido] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmarSenha: false,
  });

  const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    senha: Yup.string().required("Senha é obrigatório"),
    confirmarSenha: Yup.string()
      .required("Confimar senha é obrigatório")
      .oneOf([Yup.ref("senha"), null], "As senhas devem ser iguais"),
  });

  // FEEADBACK
  const Alert = Swal.mixin({
    toast: true,
    position: `${window.innerWidth > 960 ? "top-end" : "top"}`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // CONECTION API
  const inserir = async (e) => {
    await RegisterService.inserir(e)
      .then((res) => {
        Alert.fire({
          icon: "success",
          title: "Cadastrado com sucesso 😎",
        });
        setTimeout(() => {
          navegate("/");
        }, 1000 * 3);
      })
      .catch((error) => {
        console.log(Object.assign({}, error));
        Alert.fire({
          icon: "error",
          title: `${Object.assign({}, error).response.data.mensagem}`,
        });
      });
  };

  return (
    <>
      <div className={global.body}>
        <Modal>
          <Formik
            validationSchema={schema}
            onSubmit={(e) => {
              inserir(e);
            }}
            initialValues={{
              nome: "",
              email: "",
              senha: "",
              confirmarSenha: "",
            }}
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
                <div className={style.center}>
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

                  <FloatingLabel label="Senha">
                    <Form.Control
                      type="password"
                      name="senha"
                      placeholder="Senha"
                      value={values.senha}
                      onChange={handleChange}
                      onBlur={() =>
                        setFormInvalido({
                          ...formInvalido,
                          senha: !!errors.senha,
                        })
                      }
                      isInvalid={formInvalido.senha}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.senha}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel label="Confirmar senha">
                    <Form.Control
                      type="password"
                      name="confirmarSenha"
                      placeholder="Confirmar senha"
                      value={values.confirmarSenha}
                      onChange={handleChange}
                      onBlur={() =>
                        setFormInvalido({
                          ...formInvalido,
                          confirmarSenha: !!errors.confirmarSenha,
                        })
                      }
                      isInvalid={formInvalido.confirmarSenha}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmarSenha}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <div className={style.buttons}>
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
                        console.log(updatedFormInvalido);
                        setFormInvalido(updatedFormInvalido);
                      }}
                      type="submit"
                    >
                      CADASTRAR
                    </Button>
                    <Button
                      secondary
                      full
                      onClick={(e) => {
                        navegate("/");
                      }}
                    >
                      VOLTAR
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </>
  );
};
