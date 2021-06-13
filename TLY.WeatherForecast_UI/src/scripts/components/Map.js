import React, { useEffect, useRef } from "react"
import config from "../../config/config.json"
import L from "leaflet"
import "../../scss/Map.scss"

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set custom image path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: icon,
    shadowUrl: iconShadow
});

const Map = ({ geoCoordinate, onMapClick, options }) => {
    const mapRef = useRef(null)
    const markerRef = useRef(null)

    useEffect(() => {
        mapRef.current = L.map('map').setView(getCoordinateArr, mapOptions.zoom);
        _setDefaultTitleLayer()
        mapRef.current.on('click', onMapClick);
    }, [])

    const _setDefaultTitleLayer = () => {
        L.tileLayer(mapOptions.tileLayerUrlTemplate, _getTitleLayerOptions()).addTo(mapRef.current);
    }

    const _getTitleLayerOptions = () => {
        return {
            attribution: mapOptions.tileLayerAttribution,
            maxZoom: mapOptions.maxZoom,
            minZoom: mapOptions.minZoom,
            id: mapOptions.id,
            tileSize: mapOptions.tileSize,
            zoomOffset: mapOptions.zoomOffset,
            accessToken: config.MapBox_AccessToken
        }
    }

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setLatLng(getCoordinateArr);
        } else {
            markerRef.current = L.marker(getCoordinateArr).addTo(mapRef.current);
        }
    }, getCoordinateArr);

    const defaultMapOptions = {
        tileLayerUrlTemplate: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        tileLayerAttribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        zoom: 7,
        maxZoom: 7,
        minZoom: 2,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        className: ''
    }

    const mapOptions = { ...options, ...defaultMapOptions }

    const getCoordinateArr = [geoCoordinate.lat, geoCoordinate.lon]

    return <div id="map" ref={mapRef}></div>
}

export default Map