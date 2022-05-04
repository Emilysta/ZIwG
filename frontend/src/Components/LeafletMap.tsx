import * as React from "react";
import L from "leaflet";
import { useEffect } from "react";
import './LeafletMap.scss';

export type LeafletMapProps = {
    currentPoint?: { lat: number, lng: number },
    isReadOnly?: boolean,
}

export default function LeafletMap(props: LeafletMapProps) {
    const [currentPoint, setCurrentPoint] = React.useState(props.currentPoint);

    const mapParams = {
        center: currentPoint,
        zoom: 17,
        zoomControl: false,
        //maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    };


    const readonlyProperties = {
        dragging: false,
        boxZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
    }

    var myIcon = L.icon({
        iconUrl: '/images/logo192.png',
        iconSize: [40, 40],
        //iconAnchor: [20, 94],
        popupAnchor: [-3, -76],
        shadowAnchor: [22, 94]
    });

    useEffect(() => {
        let map: any;
        if (props.isReadOnly)
            map = L.map("map", { ...mapParams, ...readonlyProperties });
        else
            map = L.map("map", mapParams);
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 19,
        }).addTo(map);
        L.marker(L.latLng(currentPoint), { icon: myIcon }).addTo(map);
    }, []);


    return (
        <div id="map" />
    )
}
