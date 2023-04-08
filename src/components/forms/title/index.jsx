import React from "react";
import style from "./style.module.scss";
export default function Title({ children }) {
  return <h2 className={style.title}>{children}</h2>;
}
