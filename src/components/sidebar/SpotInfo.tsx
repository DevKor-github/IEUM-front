import React, { useEffect, useState } from 'react';
import { SpotType } from '../../types/map.type';
import { useAppDispatch } from '../../redux/hook';
import { setSelectedSpotId } from '../../redux/spotSlice';

interface SpotInfoPropsType {
  spotType: SpotType;
}

const SpotInfo = (props: SpotInfoPropsType) => {
  const dispatch = useAppDispatch();
  const { spotContent, position, icon } = props.spotType;
  const [instaContent, setInstaContent] = useState<string>('');

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
        <div className="content summary">
          <span className="hashtag">{spotContent.tags?.join(',')}</span>
          <p>{spotContent.instagramDescription}</p>
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
