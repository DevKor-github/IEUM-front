import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/spot.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  getSelectedPlaceIdProps,
  getSelectedSpotIdProps,
  setIsValidUser,
  setSpotList,
} from '../../redux/spotSlice';
import SpotDetailInfo from './SpotDetailInfo';
import { SpotType } from '../../types/map.type';
import { getUserCollectionList } from '../../api/instagram';
import { useParams } from 'react-router-dom';
import { useIntersectionObserver } from '../UseIntersectionObserver';
import SpotInfo from './SpotInfo';

const SpotList = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const [spots, setSpots] = useState<SpotType[]>([]);
  const selectedSpotIdState = useAppSelector(getSelectedSpotIdProps);
  const selectedPlaceIdState = useAppSelector(getSelectedPlaceIdProps);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const nextCursorId = useRef<number>();
  const hasNextPage = useRef<boolean>(true);
  const loading = useRef<boolean>(false);

  useEffect(() => {
    hasNextPage.current = true;
    setSpots([]);
    if (!selectedPlaceIdState) return;

    getNextCollectionList(selectedPlaceIdState);
  }, [selectedPlaceIdState]);

  const { observe, unobserve } = useIntersectionObserver({
    onIntersection({ target }) {
      getNextCollectionList();
    },
  });

  useEffect(() => {
    const lastElement = lastElementRef?.current;
    if (!lastElement) return;
    if (loading.current) return;
    observe(lastElement);
    return () => {
      unobserve(lastElement);
    };
  }, [spots]);

  const getNextCollectionList = async (
    placeId: number | undefined = undefined,
  ) => {
    try {
      console.log(hasNextPage.current);
      if (!hasNextPage.current || loading.current) return;
      loading.current = true;
      const res = await getUserCollectionList(
        params.userId || '',
        nextCursorId.current,
        placeId,
      );
      setSpots((prevSpots: SpotType[]) => [...prevSpots, ...res?.spotData]);
      hasNextPage.current = res?.hasNextPage;
      nextCursorId.current = res?.nextCursorId;
    } catch (err) {
      dispatch(setIsValidUser(false));
    }
    loading.current = false;
  };

  useEffect(() => {
    dispatch(setSpotList(spots));
  }, [spots]);

  return (
    <div className="spot-container" id="spot-container">
      {/*<div className="category">*/}
      {/*  <div className="header">*/}
      {/*    <div className="dropdown">*/}
      {/*      <span>지역 </span>*/}
      {/*      <button onClick={() => setView(!view)}>*/}
      {/*        <img src={Area_Select} alt="" />*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <button className="category-button">*/}
      {/*      <span>서울</span>*/}
      {/*    </button>*/}
      {/*    <button className="category-button">*/}
      {/*      <span>부산</span>*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*  {view && <Dropdown />}*/}
      {/*</div>*/}
      <hr />

      {!selectedSpotIdState ? (
        <div className="spot-list">
          {spots.map((spot, idx) => (
            <SpotInfo key={idx} spotType={spot} />
          ))}

          {!loading.current && (
            <p
              ref={lastElementRef}
              style={{ height: '10px', margin: '0px' }}
            ></p>
          )}
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
