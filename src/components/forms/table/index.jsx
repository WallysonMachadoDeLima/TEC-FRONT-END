import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";
import global from "../../../styles/globals.module.scss";
import Pagination from "../pagination";
import { ValuesGlobais } from "../../../global/Variable";

export default function Table({ total, offSet, setOffSet, children, ...props }) {
  const limit = 9
  const classname = classNames({
    [style.table]: true,
    [global.full]: props.full,
  });
  return (
    <>
      <table className={classname} {...props} cellspacing="10">
        {children}
      </table>
      <Pagination
        limit={ValuesGlobais.ItensPage}
        total={total}
        offSet={offSet}
        setOffSet={setOffSet}
      />

    </>
  )
}
