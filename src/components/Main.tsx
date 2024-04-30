import React from 'react';
import MapView from './map/MapView';
import '../assets/styles/main.css';
import SideInfo from './sidebar/SideInfo';
import '../assets/styles/sideinfo.css';
import { isMobile } from 'react-device-detect';
import BottomSheet from './BottomSheet/BottomSheet';
import MobileProfile from './sidebar/MobileProfile';

const Main = () => {
  return (
    <React.Fragment>
      <div id="main">
        {!isMobile ? (
          <div id="side-bar-view">
            <SideInfo />
          </div>
        ) : (
          <>
            <MobileProfile />
            <BottomSheet />
          </>
        )}

        <div id="map-view">
          <MapView />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
