import React, { useState } from 'react';
import Area_Select from '../../assets/images/area_select.svg';
import '../../assets/styles/spot.css';
import { useAppSelector } from '../../redux/hook';
import { getSelectedSpotProps, getSpotListProps } from '../../redux/spotSlice';
import SpotInfo from './SpotInfo';
import SpotDetailInfo from './SpotDetailInfo';
import Dropdown from './Dropdown';

const SpotList = () => {
  const [view, setView] = useState(false);

  const spotListState = useAppSelector(getSpotListProps);
  const selectedSpotState = useAppSelector(getSelectedSpotProps);

  const setSpotInfo = () => {
    return (
      <>
        {spotListState?.map((spot, idx) => (
          <SpotInfo key={idx} spotType={spot} />
        ))}
      </>
    );
  };

  return (
    <div className="spot-container">
      <div className="category">
        <div className="header">
          <div className="dropdown">
            <span>지역 </span>
            <button onClick={() => setView(!view)}>
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
        {view && <Dropdown />}
      </div>
      <hr />

      {!selectedSpotState ? (
        <div className="spot-list">{setSpotInfo()}</div>
      ) : (
        <div className="spot-list">
          <SpotDetailInfo spotContent={selectedSpotState} />
        </div>
      )}
    </div>
  );
};

export default SpotList;
