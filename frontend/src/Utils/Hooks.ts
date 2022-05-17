import { useState } from "react";
import L from "leaflet";

export const useModal = (initialState: boolean = false) => {
    const [isModalOpen, setIsModalOpen] = useState(initialState);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    return [isModalOpen, setIsModalOpen, toggleModal] as const;
}

export const MarkerIcon = L.icon({
    iconUrl: '/images/map-pin.png',
    iconSize: [31, 41],
    iconAnchor: [16, 35],
    popupAnchor: [0, -35],
    shadowAnchor: [22, 94]
});

export const useMap = () => {
    const mapParams = {
        zoom: 10,
        zoomControl: true,
        dragging: true,
        boxZoom: true,
        maxZoom: 18,
        doubleClickZoom: false,
    }

    const readonlyProperties = {
        dragging: false,
        boxZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
        zoomControl: false,
    }

    const [map, setMap] = useState(undefined);
    const initializeMap = (id: string) => {
        try {
            let tempMap = L.map(id, mapParams);
            L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            }).addTo(tempMap);
            const resizeObserver = new ResizeObserver(() => tempMap.invalidateSize());
            resizeObserver.observe(document.getElementById(id));
            setMap(tempMap);
        }
        catch (e) { console.log(e) }
    }
    const setViewMap = (options: any) => setMap(map.setView(options));
    const locateOnMap = (onLocationFound?: (e: any) => void, onLocationError?: (e: any) => void) => {
        let tempMap = map;
        if (onLocationFound) tempMap.on('locationfound', onLocationFound);
        if (onLocationError) tempMap.on('locationerror', onLocationError);
        setMap(tempMap.locate({ setView: true }))
    };
    const panToMap = (center: [number, number]) => setMap(map.panTo(center));
    const removeMarkerMap = (marker: any) => setMap(map.removeLayer(marker));
    const addMarkerMap = (marker: any) => {
        let tempMap = map;
        tempMap.panTo(marker.getLatLng());
        tempMap.addLayer(marker);
        setMap(tempMap);
    }
    return [initializeMap, setViewMap, locateOnMap, removeMarkerMap, addMarkerMap, map] as const;
}
