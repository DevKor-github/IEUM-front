import React, { useEffect, useState } from 'react';
import Area_Select from '../../assets/images/area_select.svg';
import '../../assets/styles/spot.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  getSelectedSpotIdProps,
  getSpotListProps,
  setSpotList,
} from '../../redux/spotSlice';
import SpotInfo from './SpotInfo';
import SpotDetailInfo from './SpotDetailInfo';
import Dropdown from './Dropdown';
import { SpotType } from '../../types/map.type';
import { getUserCollectionList } from '../../api/instagram';
import { useParams } from 'react-router-dom';

const SpotList = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const [view, setView] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [spots, setSpots] = useState<SpotType[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [nextCursorId, setNextCursorId] = useState<number>(0);
  const spotListState = useAppSelector(getSpotListProps);
  const selectedSpotIdState = useAppSelector(getSelectedSpotIdProps);

  useEffect(() => {
    getNextCollectionList();
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      // 아이템 로드 로직 추가 (API 호출?)
      // setSpots 함수로 spots 상태에 추가
    }
  }, [page]);

  const getNextCollectionList = async () => {
    const res = await getUserCollectionList(params.userId || '');
    dispatch(setSpotList(res.spotData));
    setHasNextPage(res?.hasNextPage);
    setNextCursorId(res?.nextCursorId);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSpots((prevSpots: SpotType[]) => [...prevSpots, ...spotListState]);
    setLoading(false);
  }, [spotListState]);

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

      {!selectedSpotIdState ? (
        <div className="spot-list">
          {spots.map((spot, idx) => (
            <SpotInfo key={idx} spotType={spot} />
          ))}
          {loading && <p>Loading...</p>}
        </div>
      ) : (
        <div className="spot-list">
          <SpotDetailInfo selectedId={selectedSpotIdState} />
        </div>
      )}
    </div>
  );
};

export default SpotList;
