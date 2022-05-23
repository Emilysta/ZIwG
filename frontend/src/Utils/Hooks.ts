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
        center: [52.237049, 21.017532],
        zoom: 10,
        zoomControl: true,
        dragging: true,
        boxZoom: true,
        maxZoom: 18,
        doubleClickZoom: false,
    }

    const [map, setMap] = useState(undefined);
    const [layerGroup, setLayerGroup] = useState(undefined);
    const initializeMap = (id: string, options?: any) => {
        try {
            let tempMap = L.map(id, { ...mapParams, ...options });
            L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            }).addTo(tempMap);
            const resizeObserver = new ResizeObserver(() => tempMap.invalidateSize());
            resizeObserver.observe(document.getElementById(id));
            let lGroup = L.layerGroup().addTo(tempMap);
            setMap(tempMap);
            setLayerGroup(lGroup);
        }
        catch (e) { console.log(e) }
    }
    const setViewMap = (options: any) => setMap(map.setView(options));
    const locateOnMap = (onLocationFound?: (e: any) => void, onLocationError?: (e: any) => void) => {
        if (onLocationFound) map.on('locationfound', onLocationFound);
        if (onLocationError) map.on('locationerror', onLocationError);
        map.locate({ setView: true })
    };
    const panToMap = (center: [number, number]) => map.panTo(center);
    const removeMarkerMap = () => layerGroup.clearLayers();
    const addMarkerMap = (marker: any) => {
        map.panTo(marker.getLatLng());
        layerGroup.addLayer(marker);
    }
    return [initializeMap, setViewMap, locateOnMap, removeMarkerMap, addMarkerMap, map, panToMap] as const;
}
