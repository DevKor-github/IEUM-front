import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import '../../assets/styles/bottomsheet.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  getSelectedSpotIdProps,
  getSpotListProps,
  setIsValidUser,
  setSpotList,
} from '../../redux/spotSlice';
import MobileSpotInfo from '../sidebar/MobileSpotInfo';
import MobileSpotDetailInfo from '../sidebar/MobileSpotDetailInfo';
import { SpotType } from '../../types/map.type';
import { getUserCollectionList } from '../../api/instagram';
import { useParams } from 'react-router-dom';

const SheetBackground = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80lvh;
  background: white;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
  border-radius: 24px 24px 0 0;
  padding: 12px 0 24px 0;
  will-change: transform;
  z-index: 200;
`;

const BottomSheet = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [isOpened, setIsOpened] = useState(false);
  const [view, setView] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [spots, setSpots] = useState<SpotType[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [nextCursorId, setNextCursorId] = useState<number>(0);
  const spotListState = useAppSelector(getSpotListProps);
  const selectedSpotIdState = useAppSelector(getSelectedSpotIdProps);

  useEffect(() => {
    // 초기 랜더링
    if (spotListState.length == 0) {
      getNextCollectionList();
    }
  }, []);

  useEffect(() => {
    if (!loading && hasNextPage && page > 1) {
      setLoading(true);
      // 아이템 로드 로직 추가 (API 호출?)
      // setSpots 함수로 spots 상태에 추가
      getNextCollectionList();
    }
  }, [page]);

  const getNextCollectionList = async () => {
    try {
      const res = await getUserCollectionList(
        params.userId || '',
        nextCursorId,
      );
      dispatch(setSpotList(res.spotData));
      setHasNextPage(res?.hasNextPage);
      setNextCursorId(res?.nextCursorId);
    } catch (err) {
      dispatch(setIsValidUser(false));
    }
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
    <>
      <SheetBackground
        className="bottom-sheet-background"
        animate={isOpened ? { top: `25dvh` } : { top: `calc(100dvh - 50px)` }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onTap={() => setIsOpened(!isOpened)}
      >
        <div className="header">
          <div className="handle-bar" />
        </div>

        <div className="wrapper">
          <div className="content">
            {!selectedSpotIdState ? (
              <div className="spot-list">
                {spots.map((spot, idx) => (
                  <MobileSpotInfo key={idx} spotType={spot} />
                ))}
                {loading && <p>Loading...</p>}
              </div>
            ) : (
              <div className="spot-list">
                <MobileSpotDetailInfo selectedId={selectedSpotIdState} />
              </div>
            )}
          </div>
        </div>
      </SheetBackground>
    </>
  );
};
export default BottomSheet;
