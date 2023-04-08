import React from "react";
import style from "./style.module.scss"
import classNames from "classnames";
import { TbCircleMinus } from "react-icons/tb"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { TbCircleX } from "react-icons/tb"
import { TbCircleCheck } from "react-icons/tb"
import { BsSlashCircle } from "react-icons/bs"

export default function Status({ children }) {
    const classes = classNames({
        [style.status]: true,
        [style.pendente]: children == "Pendente",
        [style.analize]: children == "Em Análise",
        [style.devolvido]: children == "Devolvida",
        [style.despacho]: children == "Aguardando Despacho",
        [style.pagamento]: children == "Aguardando Pagamento",
        [style.liberado]: children == "Liberada",
        [style.cancelado]: children == "Cancelada" || children == "Recusada",
        [style.suspenso]: children == "Suspensa",
        [style.inativo]: children == "Inativa",
    });
    return (
        <div>
            <a className={classes}>
                {children == "Cancelada" || children == "Suspensa" || children == "Recusada" ? <TbCircleX />
                    :
                    children == "Liberada" ? <TbCircleCheck />
                        :
                        children == "Aguardando Pagamento" ? <RiMoneyDollarCircleLine />
                            :
                            children == "Inativo" ? <BsSlashCircle />
                                : <TbCircleMinus />
                }
            </a>
            {children == "Aguardando Despacho" ? "Ag. despacho"
                :
                children == "Aguardando Pagamento" ? "Ag. Pagamento"
                    :
                    children
            }
        </div>
    )
}