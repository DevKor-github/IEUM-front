import React from 'react';
import Blank_Profile from '../../assets/images/blank_profile.svg';
import Location_Num_Icon from '../../assets/images/location_num_icon.svg';
import Share_Icon from '../../assets/images/share_icon.svg';
import '../../assets/styles/profile.css';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import { getMarkerListProps } from '../../redux/spotSlice';

const MobileProfile = () => {
  const params = useParams();
  const location = useLocation();
  const baseUrl = 'https://ieum.devkor.club';
  const markerListState = useAppSelector(getMarkerListProps);
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="mobile-profile-container"
        style={{ width: `${window.screen.width}px` }}
      >
        <div className="mobile-profile">
          <img src={Blank_Profile} alt="profile-img" className="profile-img" />

          <div className="user-info">
            <div>
              <span className="id">{params.userId}</span>
              <span>님의 지도</span>
            </div>

            <div className="spot-info">
              <img src={Location_Num_Icon} alt="spot-icon" />
              <span>{`${markerListState.length}개의 장소`}</span>
            </div>
          </div>

          <div className="share">
            <button
              onClick={() =>
                handleCopyClipBoard(`${baseUrl}${location.pathname}`)
              }
            >
              <img src={Share_Icon} alt="share_button" className="share-icon" />
            </button>
            <span>공유</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileProfile;
