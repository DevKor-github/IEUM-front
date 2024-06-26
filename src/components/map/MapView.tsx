import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/map.css';
import { SpotType } from '../../types/map.type';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  getMarkerListProps,
  getSelectedSpotIdProps,
  setMarkerList,
  setSelectedSpotId,
} from '../../redux/spotSlice';
import { useParams } from 'react-router-dom';
import { getUserMarker } from '../../api/instagram';

const MapView = () => {
  const dispatch = useAppDispatch();
  const markerListState = useAppSelector(getMarkerListProps);
  const selectedSpotIdProps = useAppSelector(getSelectedSpotIdProps);
  const params = useParams();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [selectedSpotIdx, setSelectedSpotIdx] = useState<number>(-1);
  const selectedMarker = useRef<naver.maps.Marker | null>(null);
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

  // naver marker list에서 value의 id 기준 같은 key를 가져옴
  const findKeyByValue = (marker: naver.maps.Marker | null) => {
    for (let [key, value] of naverMarkerList) {
      const isSameId =
        value.getElement().children[0].id ==
        marker?.getElement().children[0].id;
      if (isSameId) {
        return key;
      }
    }
    return null;
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
    if (!(naverMap && markerListState.length)) return;
    setMarker();
    // 지도 클릭 시 marker active 상태 해제
    naver.maps.Event.addListener(naverMap, 'click', (e) => {
      if (!selectedMarker) return;

      const key = findKeyByValue(selectedMarker.current);
      if (key === null) return;

      const marker = markerListState.find(
        (item) => item.spotContent.instaGuestCollectionId === key,
      );
      if (!marker) return;

      const markerHtml = createMarkerHtml(
        marker.icon,
        marker.spotContent.instaGuestCollectionId,
      );
      selectedMarker.current?.setIcon({
        content: markerHtml,
        size: new naver.maps.Size(10, 10),
        origin: new naver.maps.Point(0, 0),
      });

      selectedMarker.current = null;
      setSelectedSpotIdx(-1);
      dispatch(setSelectedSpotId(null));
    });
  }, [markerListState, naverMap]);

  useEffect(() => {
    if (selectedSpotIdProps) {
      const marker = markerListState.find(
        (item) =>
          item.spotContent.instaGuestCollectionId === selectedSpotIdProps,
      );
      if (!marker) return;

      const selectedNaverMarker = naverMarkerList.get(selectedSpotIdProps);
      if (!selectedNaverMarker) return;

      const highlightMarkerHtml = createMarkerHtml(
        marker.icon,
        marker.spotContent.instaGuestCollectionId,
        true,
      );
      selectedNaverMarker.setIcon({
        content: highlightMarkerHtml,
        size: new naver.maps.Size(10, 10),
        origin: new naver.maps.Point(0, 0),
      });

      selectedMarker.current = selectedNaverMarker;
      setSelectedSpotIdx(selectedSpotIdProps);
    }
  }, [selectedSpotIdProps]);

  const createMarkerHtml = (
    icon: string,
    id: number,
    isActive: boolean = false,
  ) => {
    return `<div class="marker ${icon} ${isActive ? 'active' : ''}" id="marker_${id}"/>`;
  };
  const setMarker = () => {
    markerListState.forEach((marker: SpotType) => {
      const markerHtml = createMarkerHtml(
        marker.icon,
        marker.spotContent.instaGuestCollectionId,
      );
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

      setNaverMarkerList((prevState) => {
        const newMarkerList = new Map(prevState);
        newMarkerList.set(marker.spotContent.instaGuestCollectionId, newMarker);
        return newMarkerList;
      });

      naver.maps.Event.addListener(newMarker, 'click', (e) => {
        if (!selectedMarker.current || selectedMarker.current !== newMarker) {
          if (!!selectedMarker.current) {
            selectedMarker.current?.setIcon({
              content: markerHtml,
              size: new naver.maps.Size(10, 10),
              origin: new naver.maps.Point(0, 0),
            });
          }
          const highlightMarkerHtml = createMarkerHtml(
            marker.icon,
            marker.spotContent.instaGuestCollectionId,
            true,
          );
          newMarker.setIcon({
            content: highlightMarkerHtml,
            size: new naver.maps.Size(10, 10),
            origin: new naver.maps.Point(0, 0),
          });

          selectedMarker.current = newMarker;
        } else {
          // 같은거 클릭
          selectedMarker.current?.setIcon({
            content: markerHtml,
            size: new naver.maps.Size(10, 10),
            origin: new naver.maps.Point(0, 0),
          });
          selectedMarker.current = null;
        }
        handleMarker(marker.spotContent.instaGuestCollectionId);
      });
    });
  };

  const handleMarker = (idx: number) => {
    setSelectedSpotIdx((prev) => {
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
