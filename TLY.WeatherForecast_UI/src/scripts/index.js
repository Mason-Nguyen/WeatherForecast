import React from "react"
import ReactDOM from "react-dom"
import Weather from "./components/Weather"

window.React = React

ReactDOM.render(
    <Weather/>,
    document.getElementById("react-container")
)