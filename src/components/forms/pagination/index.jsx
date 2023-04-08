import React, { useState } from "react"
import { Pagination } from "react-bootstrap";
import { ValuesGlobais } from "../../../global/Variable";
import style from "./style.module.scss"
const maxItens = 9;
const maxLeft = (maxItens - 1) / 2;

export default function Pagina({ limit, total, offSet, setOffSet }) {

    const current = offSet;
    console.log(current)
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - maxLeft, 1);

    function onPageChange(page) {

        console.log(page)
        setOffSet(page)
    }

    return (
        <div className={style.noSelect}>
            <Pagination style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <li
                    style={current === 1 ? { cursor: "not-allowed", margin: "0.5rem" } : { cursor: "pointer", margin: "0.5rem" }}>
                    <Pagination.First
                        disabled={current === 1}
                        onClick={(e) => {
                            onPageChange(current - 1)
                        }}>

                    </Pagination.First >
                </li >
                {Array.from({ length: Math.min(maxItens, pages) })
                    .map((_, index) => index + first)
                    .map((page) => (
                        <li key={page} >
                            <Pagination.Item
                                active={page === current ? true : false}
                                style={{ cursor: "pointer", margin: "0.5rem" }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(page)
                                }} >
                                {page}
                            </Pagination.Item>
                        </li>
                    ))
                }
                <li draggable="false"
                    style={current === pages ? { cursor: "not-allowed", margin: "0.5rem" } : { cursor: "pointer", margin: "0.5rem" }}>
                    <Pagination.Last
                        disabled={current === pages}
                        onClick={(e) => {
                            onPageChange(current + 1)
                        }}>

                    </Pagination.Last  >
                </li>
            </Pagination >
        </div>

    )
}