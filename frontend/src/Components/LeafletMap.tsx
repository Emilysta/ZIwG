import * as React from "react";
import './LeafletMap.scss';
import 'leaflet/dist/leaflet.css';
import ZiwgSkeleton from "Utils/Skeletons";


export type LeafletMapProps = {
    mapID: string,
    isLoading?: boolean,
}

export default function LeafletMap(props: LeafletMapProps) {
    if (props.isLoading)
        return (
            <ZiwgSkeleton containerClassName="leaflet-skeleton" />
        )
    else {
        return (<>
            <div id={props.mapID} />
        </>
        )
    }
}
