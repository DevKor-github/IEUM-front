import React, { useEffect, useRef, useState } from 'react';
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
import { useIntersectionObserver } from '../UseIntersectionObserver';

const SheetBackground = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72lvh;
  background: white;
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

  const [spots, setSpots] = useState<SpotType[]>([]);
  const spotListState = useAppSelector(getSpotListProps);
  const selectedSpotIdState = useAppSelector(getSelectedSpotIdProps);

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const nextCursorId = useRef<number>();
  const hasNextPage = useRef<boolean>(true);
  const loading = useRef<boolean>(false);

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
  }, []);

  const getNextCollectionList = async () => {
    try {
      console.log('hasNextPage', hasNextPage);
      if (!hasNextPage.current || loading.current) return;
      loading.current = true;
      const res = await getUserCollectionList(
        params.userId || '',
        nextCursorId.current,
      );
      console.log('api res', res);
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
    <>
      <SheetBackground
        className="bottom-sheet-background"
        animate={isOpened ? { top: `25dvh` } : { top: `calc(100dvh - 45px)` }}
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

                {!loading.current && (
                  <p
                    ref={lastElementRef}
                    style={{ height: '10px', margin: '0px' }}
                  ></p>
                )}
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
