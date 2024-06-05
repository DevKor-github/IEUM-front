import React from 'react';
import MapView from './map/MapView';
import '../assets/styles/main.css';
import SideInfo from './sidebar/SideInfo';
import '../assets/styles/sideinfo.css';
import { isMobile } from 'react-device-detect';
import BottomSheet from './BottomSheet/BottomSheet';
import MobileProfile from './sidebar/MobileProfile';
import { useAppSelector } from '../redux/hook';
import { getIsValidUser } from '../redux/spotSlice';
import ErrorLogo from '../assets/images/error_icon.svg';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Main = () => {
  const isValidUser = useAppSelector(getIsValidUser);
  const params = useParams();
  const sideView = () => {
    if (!isValidUser) {
      return (
        <div id="side-bar-view" className="invalid">
          <div>
            <img src={ErrorLogo} alt="error" />
            <div>
              <p>
                <b>존재하지 않는 사용자 입니다!</b>
              </p>
              <p>인스타 아이디를 다시 한번 확인해 보세요 :)</p>
            </div>
          </div>
        </div>
      );
    }
    return !isMobile ? (
      <div id="side-bar-view">
        <SideInfo />
      </div>
    ) : (
      <>
        <MobileProfile />
        <BottomSheet />
      </>
    );
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{params.userId || ''}님의 지도</title>
      </Helmet>
      <div id="main">
        {sideView()}
        <div id="map-view">
          <MapView />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
