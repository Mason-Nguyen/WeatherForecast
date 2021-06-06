import {render} from "react-dom"
import Weather from "./components/Weather"
import Map from "./components/Map"
import React from 'react'

render(
    <Weather />,
    document.getElementById("react-container")
)