import React, { useEffect, useState } from 'react';
import { SpotType } from '../../types/map.type';
import { useAppDispatch } from '../../redux/hook';
import { setSelectedPlaceId, setSelectedSpotId } from '../../redux/spotSlice';

interface SpotInfoPropsType {
  spotType: SpotType;
}

const SpotInfo = (props: SpotInfoPropsType) => {
  const dispatch = useAppDispatch();
  const { spotContent, position, icon } = props.spotType;
  const [instaContent, setInstaContent] = useState<string>('');
  const maxLength = 100;

  useEffect(() => {
    if (window?.instgrm) {
      window.instgrm.Embeds.process();
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(spotContent.embeddedTag, 'text/html');
    setInstaContent(doc.documentElement.textContent || '');
  }, [instaContent]);

  const handleSpot = (instaGuestCollectionId: number, placeId: number) => {
    dispatch(setSelectedSpotId(instaGuestCollectionId));
    dispatch(setSelectedPlaceId(placeId));
  };

  const spliceSpotContent = (content: string) => {
    if (content.length < maxLength) return content;
    return content.substring(0, 100) + '...';
  };

  return (
    <>
      <div
        className="spot-info"
        onClick={() => {
          handleSpot(spotContent.instaGuestCollectionId, spotContent.placeId);
        }}
      >
        <div>
          <span className="spot-name">{spotContent.placeName}</span>
          <span className="spot-type">{spotContent.category}</span>
        </div>
        <span className="address">{spotContent.address}</span>
        <div className="content">
          <span className="hashtag">{spotContent.tags?.join(',')}</span>
          <p>
            <span>{spliceSpotContent(spotContent.instagramDescription)}</span>
            <span style={{ color: 'gray' }}>더보기</span>
          </p>
        </div>
      </div>
      <div
        style={{ marginBottom: '55px' }}
        dangerouslySetInnerHTML={{ __html: instaContent }}
      ></div>
    </>
  );
};
export default SpotInfo;
