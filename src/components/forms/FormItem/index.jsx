import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";

export default function FormItem({ children, position }) {
  const classes = classNames({
    [style.primary]: true,
    [style.center]: position == "center",
  })
  return <div className={classes} >{children}</div>;
}
