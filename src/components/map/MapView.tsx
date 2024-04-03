import React, { useEffect, useRef } from 'react';
import '../../assets/styles/map.css';
import { MarkerIcon, MarkerType } from '../../types/map.type';

const MapView = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerList: MarkerType[] = [
    {
      position: new naver.maps.LatLng(37.511337, 127.012084),
      icon: MarkerIcon.DOG,
      spotContent: {
        name: 'test',
        category: '일식',
        shortAddress: '잠실',
        address: '잠실',
        hashtag: '#강아지 #맛집',
        content:
          '재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가 준용되어야 한다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요.',
        officeHour: '11:00 ~ 23:00',
        phoneNumber: ' 0000',
      },
    },
    {
      position: new naver.maps.LatLng(37.51264, 127.00734),
      icon: MarkerIcon.BAKERY,
      spotContent: {
        name: 'test1',
        category: '빵',
        shortAddress: '잠실',
        address: '잠실',
        hashtag: '#빵 #맛집',
        content:
          '재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가 준용되어야 한다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요.',
        officeHour: '11:00 ~ 23:00',
        phoneNumber: ' 0000',
      },
    },
    {
      position: new naver.maps.LatLng(37.517459, 127.02078),
      icon: MarkerIcon.BAR,
      spotContent: {
        name: '바바',
        category: '양식',
        shortAddress: '잠실',
        address: '잠실',
        hashtag: '#술 #맛집',
        content:
          '재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가 준용되어야 한다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요.',
        officeHour: '11:00 ~ 23:00',
        phoneNumber: ' 0000',
      },
    },
  ];

  let naverMap: naver.maps.Map;
  useEffect(() => {
    if (!mapRef.current) return;
    const center = new naver.maps.LatLng(37.511337, 127.012084);
    const mapOptions: naver.maps.MapOptions = {
      center: center,
      zoom: 15,
      minZoom: 10,
      maxZoom: 20,
      zoomControl: false,
    };
    naverMap = new naver.maps.Map(mapRef.current, mapOptions);
    setMarker();
  }, [mapRef]);

  const setMarker = () => {
    markerList.forEach((marker: MarkerType, idx: number) => {
      const markerHtml = `<img alt="marker" class="marker" src="img/${marker.icon}"/>`;
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
      naver.maps.Event.addListener(newMarker, 'click', () => {
        handleMarker(idx);
      });
    });
  };
  const handleMarker = (idx: number) => {
    console.log(markerList[idx].spotContent);
  };

  return <div id="naver-map" ref={mapRef}></div>;
};

export default MapView;
