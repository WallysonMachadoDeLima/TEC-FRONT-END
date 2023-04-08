import React from "react";
import style from "./style.module.scss";

export default function Label({ children }) {
  return <label className={style.label}>{children}</label>;
}
