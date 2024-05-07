import React from 'react';
import Blank_Profile from '../../assets/images/blank_profile.svg';
import Logo from '../../assets/images/logo.svg';
import Share_Icon from '../../assets/images/share_icon.svg';
import Locaiton_Num_Icon from '../../assets/images/location_num_icon.svg';
import '../../assets/styles/profile.css';
import { useParams } from 'react-router-dom';
const Profile = () => {
  const params = useParams();

  return (
    <div className="profile-box">
      <div className="logo-container">
        <img src={Logo} alt="logo" />
      </div>
      <div className="profile-container">
        <img src={Blank_Profile} alt="profile-img" className="profile-img" />
        <div className="user-info">
          <div>
            <span className="id">{params.userId}</span>
            <span>님의 지도</span>
          </div>

          <div className="spot-info">
            <img src={Locaiton_Num_Icon} alt="spot-icon" />
            <span>31개의 장소</span>
          </div>
        </div>
        <div className="share">
          <button>
            <img src={Share_Icon} alt="share_button" />
          </button>
          <span>공유</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
