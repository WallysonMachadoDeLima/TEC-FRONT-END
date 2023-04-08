import React from "react";
import style from "./style.module.scss";
export default function FormGroup({ children }) {
  return <div className={style.primary}>{children}</div>;
}
