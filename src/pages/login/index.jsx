import React, { useState } from "react";
import style from "./Login.module.scss";
import global from "../../styles/globals.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/index";
import Input from "../../components/forms/input/index";
import Checkbox from "../../components/forms/checkbox/index";
import Modal from "../../components/modals/modal";
import Swal from "sweetalert2";
import axios from "axios";
import { API_CONFIG } from "../../config/api.config";
import { useForm } from "react-hook-form";
import AuthService from "../../services/login/auth.service";
import jwt_decode from "jwt-decode";

export default () => {
  const navegate = useNavigate();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

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
  const inserir = async (e) => {
    const Cadastro = {
      email: login,
      senha: password,
    };
    e.preventDefault();

    await axios
      .post(`${API_CONFIG.baseUrl}/usuarios/login`, Cadastro, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response?.data?.Authorization) {
          localStorage.setItem(
            "token",
            JSON.stringify(response?.data?.Authorization)
          );
        }
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const payload = jwt_decode(token);

        console.log(payload);
        localStorage.setItem("user", JSON.stringify(payload));
        setTimeout(() => {
          navegate("/home/");
        }, 1000 * 3);
      })
      .catch((error) => {
        Alert.fire({
          icon: "error",
          title: `${Object.assign({}, error).response?.data?.mensagem}`,
        });
      });
  };

  return (
    <>
      <div className={global.body}>
        <Modal>
          <div className={style.title}>Bem-vindo</div>
          <div className={style.inputs}>
            <Input
              id="login-nome"
              nome="login-nome"
              placeholder="Email"
              login="true"
              full={true}
              mb="true"
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <Input
              id="login-senha"
              nome="login-senha"
              type="password"
              placeholder="Senha"
              login="true"
              mt="true"
              full={true}
              mb="true"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Checkbox label={"Lembrar-me"}></Checkbox>
          </div>
          <div className={style.buttons}>
            <Button full={true} mb onClick={inserir}>
              Entrar
            </Button>
            <div className="sub">
              <Button
                secondary={"true"}
                full={true}
                onClick={(e) => {
                  navigate("/cadastro/");
                }}
              >
                não tenho conta
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
