import React, { useEffect, useRef } from "react"
import config from "../../config/config.json"
import L from "leaflet"
import "../../scss/Map.scss"

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow
});

const Map = ({ latitude, longitude, onMapClick, options }) => {
    const mapRef = useRef(null)
    const markerRef = useRef(null)

    useEffect(() => {
        mapRef.current = L.map('map').setView([latitude, longitude], mapOptions.zoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: mapOptions.maxZoom,
            id: mapOptions.id,
            tileSize: mapOptions.tileSize,
            zoomOffset: mapOptions.zoomOffset,
            accessToken: config.MapBox_AccessToken
        }).addTo(mapRef.current);

        mapRef.current.on('click', onMapClick);
    }, [])

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]);
        } else {
            markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
        }
    }, [latitude, longitude]);

    const defaultMapOptions = {
        zoom: 5,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        className: 'flex-center'
    }

    const mapOptions = { ...options, ...defaultMapOptions }

    return <div id="map" ref={mapRef}></div>
}

export default Map