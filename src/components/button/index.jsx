import React from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import global from "../../styles/globals.module.scss";

export default function Button({
  id,
  name,
  onClick,
  type,
  children,
  ...props
}) {
  const classes = classNames({
    [styles.primary]: true,
    [styles.secondary]: props.secondary,
    [styles.success]: props.success,
    [styles.danger]: props.danger,
    [styles.warning]: props.warning,
    [global.full]: props.full,
    [styles.medium]: props.medium,
    [styles.large]: props.large,
    [styles.small]: props.small,
    [global.ml]: props.ml,
    [global.mr]: props.mr,
    [global.mb]: props.mb,
  });
  return (
    <button
      id={id}
      name={name}
      onClick={onClick}
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
