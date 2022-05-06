import * as React from "react";
import L from "leaflet";
import { useEffect } from "react";
import './LeafletMap.scss';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom";
import ZiwgSkeleton from "Utils/Skeletons";

export type LeafletMapProps = {
    currentPoint?: { lat: number, lng: number },
    isReadOnly?: boolean,
    mapID: string,
    zoom?: number,
    maxZoom?: number,
    isLoading?: boolean,
    isRevealed?: boolean,
}

export default function LeafletMap(props: LeafletMapProps) {
    const [currentPoint, setCurrentPoint] = React.useState(props.currentPoint ? props.currentPoint : [51.5, -0.11]);
    const [leafletMap, setLeafletMap] = React.useState();
    const mapParams = {
        center: currentPoint,
        zoom: props.zoom ? props.zoom : 17,
        zoomControl: true,
        //maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        dragging: true,
        boxZoom: true,
    };

    const readonlyProperties = {
        dragging: false,
        boxZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
        zoomControl: false,
    }

    const myIcon = L.icon({
        iconUrl: '/images/map-pin.png',
        iconSize: [31, 41],
        iconAnchor: [16, 35],
        popupAnchor: [0, -35],
        shadowAnchor: [22, 94]
    });

    useEffect(() => {
        console.log("leafletLoaded " + props.mapID);
        if (!props.isLoading) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
            });
            let map: any;
            if (props.isReadOnly)
                map = L.map(props.mapID, { ...mapParams, ...readonlyProperties });
            else
                map = L.map(props.mapID, mapParams);
            L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: props.maxZoom ? props.maxZoom : 19,
            }).addTo(map);
            L.marker(L.latLng(currentPoint), { icon: myIcon }).addTo(map)
                .bindPopup('Tu będzie text z nominatim').openPopup();
            setLeafletMap(map);
        }
    }, []);

    if (props.isLoading)
        return (
            <ZiwgSkeleton containerClassName="leaflet-skeleton" />
        )
    else
        return (
            <div id={props.mapID} />
        )
}
