import * as React from "react";
import L from "leaflet";
import { useEffect } from "react";
import './LeafletMap.scss';
import { GeoAlt } from "react-bootstrap-icons";

export default function LeafletMap() {
    // const mapStyles = {
    //     overflow: "hidden",
    //     width: "100%",
    //     height: "100vh"
    // };

    const mapParams = {
        center: [51.5, -0.09],
        zoom: 17,
        zoomControl: false,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        dragging: false,
        boxZoom: false,
        touchZoom: false,
        doubleClickZomm: false,
        scrollWheelZoom: false,
        keyboard: false,
    };

    var myIcon = L.icon({
        iconUrl: '/images/logo192.png',
        iconSize: [40, 40],
        iconAnchor: [20, 94],
        popupAnchor: [-3, -76],
        shadowAnchor: [22, 94]
    });

    useEffect(() => {
        const map = L.map("map", mapParams);
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 19,
        }).addTo(map);
        L.marker([51.5, -0.09], { icon: myIcon }).addTo(map);
    }, []);


    return (
        <div className="customLeafletMapBox">
            <div id="map" />
        </div>
    )
}
