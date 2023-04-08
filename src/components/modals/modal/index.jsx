import React from "react";
import style from "./style.module.scss";
import Logo from "../../../images/logo.png";

export default function Modal({ children }) {
  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.logo}>
          <img src={Logo} />
        </div>
        <div className={style.form}>{children}</div>
      </div>
    </div>
  );
}
