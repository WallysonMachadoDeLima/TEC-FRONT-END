import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";
import global from "../../../styles/globals.module.scss";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';;

export default function Select({ disabled, label, children, ...props }) {
  const classes = classNames({
    [style.select]: true,
    [style.increase]: props.increase,
  });
  return (
    <FloatingLabel label={label}>
      <Form.Select {...props} disabled={disabled ? disabled : false} >
        {children}
      </Form.Select>
    </FloatingLabel>
  );
}
