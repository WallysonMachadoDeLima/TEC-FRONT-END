import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import global from "../../styles/globals.module.scss";
import Logo from "../../images/logohome.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import ModalGlobal from "../../components/modals/modalText/Modal";
import Button from "../../components/button";
import Painel from "../painel";
import Pessoas from "../pessoas";
export default () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navegate = useNavigate();
  const [show, setShow] = useState(false);
  const [page, usePage] = useState("painel");
  const [firstName, setFirstName] = useState(null);
  useEffect(() => {
    setFirstName(user.nome.substr(0, user.nome.indexOf(" ")));

    if (user.nome.indexOf(" ") == -1) {
      setFirstName(user.nome);
    }
  }, [user.nome]);

  const pages = () => {
    switch (page) {
      case "painel":
        return <Painel />;
        break;
      case "pessoas":
        return <Pessoas />;
        break;
      default:
        navegate("*");
    }
  };

  return (
    <>
      <div
        className={page == "painel" ? global.body : ""}
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className={style.navbar}>
          <div>
            <div style={{ position: "absolute" }}>
              <img src={Logo}></img>
            </div>
          </div>
          <ul className={style.list}>
            <>
              <li
                onClick={(e) => {
                  usePage("painel");
                }}
              >
                Painel
              </li>
              <li
                onClick={(e) => {
                  usePage("pessoas");
                }}
              >
                Pessoas
              </li>
            </>
            <li className={style.user}>
              <div style={{ display: "inline" }}>
                <NavDropdown title={<span>{firstName}</span>}>
                  <NavDropdown.Item
                    onClick={(e) => {
                      setShow(!show);
                    }}
                  >
                    Sair
                  </NavDropdown.Item>
                  <ModalGlobal value={show} title={`Deseja sair desta conta?`}>
                    <Button
                      danger
                      mr
                      onClick={(e) => {
                        setShow(!show);
                      }}
                    >
                      CANCELAR
                    </Button>
                    <Button
                      onClick={(e) => {
                        localStorage.clear();
                        navegate("/");
                      }}
                    >
                      CONFIRMAR
                    </Button>
                  </ModalGlobal>
                </NavDropdown>
              </div>
            </li>
          </ul>
        </div>
        <div>{pages()}</div>
      </div>
    </>
  );
};
