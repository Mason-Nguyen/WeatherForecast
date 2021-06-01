import {render} from "react-dom"
import Weather from "./components/Weather"
import Map from "./components/Map"
import React from 'react'

render(
    <Map latitude={10.7409752} longitude={106.650883}/>,
    document.getElementById("react-container")
)