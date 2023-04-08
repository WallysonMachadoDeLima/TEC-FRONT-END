import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";

export default function Container({ children, ...props }) {
  const classes = classNames({
    [style.container]: true,
    [style.position]: props.position,
    [style.vertical]: props.vertical,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
