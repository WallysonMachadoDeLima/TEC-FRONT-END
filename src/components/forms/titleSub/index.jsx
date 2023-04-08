import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";

export default function Title({ type, children, ...props }) {
  const classes = classNames({
    [style.subTitle]: true,
    [style.center]: props.center,
    [style.danger]: props.danger,
  });
  return (
    type == 4 ? (<div className={classes} {...props}>
      <h4 className={classes} {...props}>
        {children}
      </h4>
    </div>)
      :
      <div className={classes} {...props}>
        <h2 className={classes} {...props}>
          {children}
        </h2>
      </div>
  );
}
