import React from "react";
import style from "./style.module.scss";
export default ({ children, onSubmit, center, small }) => {
  return (
    <form onSubmit={onSubmit} className={center ? style.center : small ? style.small : style.form}>
      {children}
    </form>
  );
};
