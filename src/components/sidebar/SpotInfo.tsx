import React, { useEffect, useState } from 'react';
import { SpotType } from '../../types/map.type';

interface SpotInfoPropsType {
  spotType: SpotType;
}

const SpotInfo = (props: SpotInfoPropsType) => {
  const { spotContent, position, icon } = props.spotType;
  const [instaContent, setInstaContent] = useState<string>('');
  useEffect(() => {
    if (window?.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(spotContent.embeddedTag, 'text/html');
    setInstaContent(doc.documentElement.textContent || '');
  }, [instaContent]);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: instaContent }}></div>

      <div className="spot-info">
        <div>
          <span className="spot-name">{spotContent.placeName}</span>
          <span className="spot-type">{spotContent.category}</span>
        </div>
        <span className="address">{spotContent.address}</span>
        <div className="content">
          <span className="hashtag">{spotContent.tags?.join(',')}</span>
          <p>{spotContent.instagramDescription}</p>
        </div>
      </div>
      <hr />
    </>
  );
};
export default SpotInfo;
