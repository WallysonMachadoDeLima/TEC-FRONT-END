import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import classNames from "classnames";
import styles from "./style.module.scss";
import global from "../../../styles/globals.module.scss";
import ReactInputMask from "react-input-mask";
export default function Input({
  id,
  nome,
  type,
  value,
  isValid,
  disabled,
  mask,
  onChange,
  name,
  pattern,
  placeholder,
  children,
  ...props
}) {
  const classes = classNames({
    [styles.primary]: true,
    [styles.login]: props.login == true,
    [styles.secondary]: props.secondary,
    [styles.full]: props.full == true,
    [styles.height]: props.height,
    [styles.medium]: props.medium,
    [styles.large]: props.large,
    [styles.ml]: props.ml,
    [styles.mr]: props.mr,
    [styles.mt]: props.mt,
    [styles.mb]: props.mb,
    [styles.half]: props.half,
    [styles.together]: props.together,
  });

  const tipo = type ? type : "text";

  if (type == "file") {
    return (
      <div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>{placeholder}</Form.Label>
          <Form.Control
            type="file"
            onChange={onChange}
            className={classes}
            {...props}
          />
        </Form.Group>
      </div>
    );
  } else {
    return (
      <div>
        <FloatingLabel
          required
          onChange={onChange}
          label={placeholder}
          name={name}
          className={"mb-3"}
          {...props}
        >
          <Form.Control
            id={id}
            name={nome}
            as="input"
            type={type ? type : "text"}
            placeholder="name@example.com"
            onChange={onChange}
            value={value}
            isValid={isValid}
            {...props}
          />
        </FloatingLabel>
      </div>
    );
  }
}
