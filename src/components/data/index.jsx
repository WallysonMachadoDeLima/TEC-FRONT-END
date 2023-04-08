import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";
import global from "../../styles/globals.module.scss";

export default function Data({ children, text, value, ...props }) {

    const classes = classNames({
        [style.pendente]: props.pendente,
        [style.analize]: props.analize,
        [style.despacho]: props.despacho,
        [style.agPagamento]: props.agPagamento,
        [style.pagamento]: props.pagamento,
        [style.liberado]: props.liberado,
        [style.cancelado]: props.cancelado,
        [style.suspenso]: props.suspenso,
        [style.inativo]: props.inativo,
    });

    return (
        <div className={style.container}>
            <div className={classes} {...props}>
                {children}
            </div>
            <div className={style.text}>
                <div className={style.textT}>{text}</div>
                <div className={style.value}>{value}</div>
            </div>
        </div>)

}