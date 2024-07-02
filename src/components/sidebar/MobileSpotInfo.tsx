import React, { useEffect, useState } from 'react';
import { SpotType } from '../../types/map.type';
import { setSelectedSpotId } from '../../redux/spotSlice';
import { useAppDispatch } from '../../redux/hook';

interface SpotInfoPropsType {
  spotType: SpotType;
}

const MobileSpotInfo = (props: SpotInfoPropsType) => {
  const { spotContent, position, icon } = props.spotType;
  const [instaContent, setInstaContent] = useState<string>('');
  const dispatch = useAppDispatch();
  // const [moreInfo, setMoreInfo] = useState(false);

  useEffect(() => {
    if (window?.instgrm) {
      window.instgrm.Embeds.process();
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(spotContent.embeddedTag, 'text/html');
    setInstaContent(doc.documentElement.textContent || '');
  }, [instaContent]);

  const handleSpot = (id: number) => {
    dispatch(setSelectedSpotId(id));
  };

  return (
    <>
      <div
        className="spot-info"
        onClick={() => {
          handleSpot(spotContent.instaGuestCollectionId);
        }}
      >
        <div>
          <span className="spot-name">{spotContent.placeName}</span>
          <span className="spot-type">{spotContent.category}</span>
        </div>
        <span className="address">{spotContent.address}</span>
        {/* {!moreInfo ? (
          <div className="content summary">
            <span className="hashtag">{spotContent.tags?.join(',')}</span>
            <p>{spotContent.instagramDescription}</p>
            <button
              className="info button"
              onClick={() => setMoreInfo(!moreInfo)}
            >
              더보기
            </button>
          </div>
        ) : (
          <div className="content summary">
            <span className="hashtag">{spotContent.tags?.join(',')}</span>
            <p>{spotContent.instagramDescription}</p>
          </div>
        )} */}
        <div className="content summary">
          <span className="hashtag">{spotContent.tags?.join(',')}</span>
          <p>{spotContent.instagramDescription}</p>
        </div>
      </div>
      <div
        className="imbed"
        dangerouslySetInnerHTML={{ __html: instaContent }}
      ></div>
      <div style={{ height: '45px' }}></div>
    </>
  );
};
export default MobileSpotInfo;
