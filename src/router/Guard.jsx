import React from "react";
import { Navigate } from "react-router-dom";

export default function GuardRoute({ children }) {
    const token = JSON.parse(localStorage.getItem("token"))
    return token ? children : <Navigate to={"/"} />
}
