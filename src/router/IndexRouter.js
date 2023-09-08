import React from "react"
import { HashRouter, Route } from "react-router-dom"
import Login from "../views/login/Login"
import NewsSandBox from "../views/sandbox/NewsSandBox"

export default function IndexRouter() {
    return (
        <HashRouter>
            <Route path="/login" Component={Login} />
            <Route path="/" Component={NewsSandBox} />
        </HashRouter>
    )
}