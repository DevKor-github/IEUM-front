import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import '../../assets/styles/bottomsheet.css';
import Area_Select from '../../assets/images/area_select.svg';
import { useAppSelector } from '../../redux/hook';
import { getSelectedSpotProps, getSpotListProps } from '../../redux/spotSlice';
import MobileSpotInfo from '../sidebar/MobileSpotInfo';
import MobileSpotDetailInfo from '../sidebar/MobileSpotDetailInfo';
import { SpotType } from '../../types/map.type';

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
  const [isOpened, setIsOpened] = useState(false);
  const [view, setView] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [spots, setSpots] = useState<SpotType[]>([]);

  const spotListState = useAppSelector(getSpotListProps);
  const selectedSpotState = useAppSelector(getSelectedSpotProps);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      // 아이템 로드 로직 추가 (API 호출?)
      // setSpots 함수로 spots 상태에 추가
    }
  }, [page]);

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
            {!selectedSpotState ? (
              <div className="spot-list">
                {spots.map((spot, idx) => (
                  <MobileSpotInfo key={idx} spotType={spot} />
                ))}
                {loading && <p>Loading...</p>}
              </div>
            ) : (
              <div className="spot-list">
                <MobileSpotDetailInfo spotContent={selectedSpotState} />
              </div>
            )}
          </div>
        </div>
      </SheetBackground>
    </>
  );
};
export default BottomSheet;
