import React, {useEffect, useRef, useState} from "react";
import "../../assets/styles/map.css"

const MapView = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    // const [naverMap, setNaverMap] = useState<naver.maps.Map | undefined>(undefined);

    let naverMap : naver.maps.Map;
    useEffect(() => {
        if (!mapRef.current) return;

        const center = new naver.maps.LatLng(37.511337, 127.012084);
        const mapOptions: naver.maps.MapOptions = {
            center: center,
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
        naverMap = new naver.maps.Map(mapRef.current, mapOptions);
        setMarker();
    }, [mapRef]);

    const setMarker = () => {
        const position = new naver.maps.LatLng(37.511337, 127.012084);
        let markerOptions: naver.maps.MarkerOptions = {
            position: position,
            map: naverMap,
            icon: {
                content: '<img alt="marker" class="marker" src="img/dog_marker.png"/>',
                // url: "img/dog_marker.png",
                size: new naver.maps.Size(10, 10),
                origin: new naver.maps.Point(0, 0),
                // anchor: new naver.maps.Point(11, 35)
            }
        };
        new naver.maps.Marker(markerOptions);
    }

    return (<div id="naver-map" ref={mapRef}></div>)
}

export default MapView;