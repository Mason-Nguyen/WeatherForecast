import React, { useEffect, useRef } from "react"
import config from "../../config/config.json"
import L from "leaflet"
import "../../scss/Map.scss"

const Map = ({latitude, longitude, options}) => {
    const mapRef = useRef(null)

    useEffect(() => {
        let map = L.map(mapRef.current).setView([latitude, longitude], mapOptions.zoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: mapOptions.maxZoom,
            id: mapOptions.id,
            tileSize: mapOptions.tileSize,
            zoomOffset: mapOptions.zoomOffset,
            accessToken: config.MapBox_AccessToken
        }).addTo(map);

        return (() => mapRef.current = null)
    }, [])

    const defaultMapOptions = {
        zoom: 5,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        className: 'flex-center'
    }

    const mapOptions = {...options, ...defaultMapOptions }

    return <div id="map" ref={mapRef}></div>
}

export default Map