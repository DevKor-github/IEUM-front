import React, {useEffect, useRef, useState} from "react";
import "../../assets/styles/map.css"

const MapView = () => {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);

    let map : naver.maps.Map;

    useEffect(() => {
        if(!mapElement.current) return;

        const center = new naver.maps.LatLng(37.511337, 127.012084);
        const mapOptions : naver.maps.MapOptions = {
            center : center,
            zoom: 15,
            minZoom: 10,
            maxZoom: 20,
            zoomControl: false,
            // zoomControlOptions: {
            //     style: naver.maps.ZoomControlStyle.SMALL,
            //     position: naver.maps.Position.TOP_RIGHT,
            // },
            // mapDataControl: false,
            // scaleControl: false,
        };
        map = new naver.maps.Map(mapElement.current, mapOptions);
        setNewMap(map);
    }, [mapElement]);

    return (
            <div id="naver-map" ref={mapElement}></div>
    )
}

export default MapView;