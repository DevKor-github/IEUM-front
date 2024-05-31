import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/map.css';
import { SpotType } from '../../types/map.type';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  getMarkerListProps,
  setMarkerList,
  setSelectedSpotId,
} from '../../redux/spotSlice';
import { useParams } from 'react-router-dom';
import { getUserMarker } from '../../api/instagram';

const MapView = () => {
  const dispatch = useAppDispatch();
  const markerListState = useAppSelector(getMarkerListProps);
  const params = useParams();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [selectedSpotIdx, setSelectedSpotIdx] = useState<number>(-1);
  const [naverMarkerList, setNaverMarkerList] = useState<
    Map<number, naver.maps.Marker>
  >(new Map<number, naver.maps.Marker>());

  useEffect(() => {
    setMarkerInfo();
  }, []);

  const setMarkerInfo = async () => {
    const spotData = await getUserMarker(params?.userId || '');
    dispatch(setMarkerList(spotData));
  };

  // let naverMap: naver.maps.Map;
  useEffect(() => {
    if (!mapRef.current) return;
    const center = new naver.maps.LatLng(36.788791, 127.987661); // 한반도 중앙 위치 하드코딩
    const mapOptions: naver.maps.MapOptions = {
      center: center,
      zoom: 8, // 한반도 전체 보이게 하드코딩
      minZoom: 5,
      maxZoom: 20,
      zoomControl: false,
    };
    const map = new naver.maps.Map(mapRef.current, mapOptions);
    setNaverMap(map);
  }, [mapRef, markerListState]);

  useEffect(() => {
    if (naverMap && markerListState.length) setMarker();
  }, [markerListState, naverMap]);

  const setMarker = () => {
    markerListState.forEach((marker: SpotType) => {
      const markerHtml = `<div class="marker ${marker.icon} " id="marker_${marker.spotContent.instaGuestCollectionId}"/>`;
      let markerOptions: naver.maps.MarkerOptions = {
        position: marker.position,
        map: naverMap,
        icon: {
          content: markerHtml,
          size: new naver.maps.Size(10, 10),
          origin: new naver.maps.Point(0, 0),
        },
      };
      const newMarker = new naver.maps.Marker(markerOptions);
      setNaverMarkerList((prev) =>
        prev.set(marker.spotContent.instaGuestCollectionId, newMarker),
      );

      naver.maps.Event.addListener(newMarker, 'click', (e) => {
        e.originalEvent.target.className =
          e.originalEvent.target.className.includes('active')
            ? `marker ${marker.icon}`
            : `marker ${marker.icon} active`;
        handleMarker(marker.spotContent.instaGuestCollectionId);
      });
    });
  };

  //다른 active marker 없애기
  const resetMarker = (idx: number) => {
    console.log('reset');
    const spot: SpotType | undefined = markerListState.find(
      (spot) => spot.spotContent.instaGuestCollectionId === idx,
    );
    console.log('idx', idx);
    console.log('spot', spot);
    console.log('naverMarker', naverMarkerList.get(idx));

    if (!spot) return;
    const markerHtml = `<div class="marker ${spot.icon} " id="marker_${spot.spotContent.instaGuestCollectionId}"/>`;
    let markerOptions: naver.maps.MarkerOptions = {
      position: spot.position,
      map: naverMap,
      icon: {
        content: markerHtml,
        size: new naver.maps.Size(10, 10),
        origin: new naver.maps.Point(0, 0),
      },
    };
    const marker = naverMarkerList.get(idx);
    if (!marker) return;
    marker.getElement().className = `marker ${spot.icon}`;
    marker.draw();
    // naverMarkerList.get(idx)?.setIcon({
    //   content: markerHtml,
    //   size: new naver.maps.Size(10, 10),
    //   origin: new naver.maps.Point(0, 0),
    // });

    // const marker = document.getElementById(`marker_${idx}`);
    // console.log('marker', marker);
    // if (!marker) return;
    // marker.className = `marker ${spot?.icon}`;
    // console.log('marker', marker);
  };

  const handleMarker = (idx: number) => {
    setSelectedSpotIdx((prev) => {
      resetMarker(prev);

      // 선택해제
      if (prev === idx) {
        dispatch(setSelectedSpotId(null));
        return -1;
      } else {
        const spot: SpotType | undefined = markerListState.find(
          (spot) => spot.spotContent.instaGuestCollectionId === idx,
        );

        if (!spot) return -1;
        dispatch(setSelectedSpotId(spot.spotContent.instaGuestCollectionId));
        return idx;
      }
    });
  };

  return <div id="naver-map" ref={mapRef}></div>;
};

export default MapView;
