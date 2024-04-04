import React from 'react';
import Area_Select from '../../assets/images/area_select.svg';
import Sample_Image_1 from '../../assets/images/sample_image_1.svg';
import Sample_Image_2 from '../../assets/images/sample_image_2.svg';
import '../../assets/styles/spot.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { getSpotListProps } from '../../redux/spotSlice';
import SpotInfo from './SpotInfo';
import spotInfo from './SpotInfo';

const SpotList = () => {
  const dispatch = useAppDispatch();
  const spotState = useAppSelector(getSpotListProps);

  const setSpotInfo = () => {
    return (
      <>{spotState.spotList?.map((spot) => <SpotInfo spotType={spot} />)}</>
    );
  };

  return (
    <div className="spot-container">
      <div className="category">
        <div className="dropdown">
          <span>지역 </span>
          <button>
            <img src={Area_Select} alt="" />
          </button>
        </div>
        <button className="category-button">
          <span>서울</span>
        </button>
        <button className="category-button">
          <span>부산</span>
        </button>
      </div>
      <hr />

      <div className="spot-list">{setSpotInfo()}</div>
    </div>
  );
};

export default SpotList;
