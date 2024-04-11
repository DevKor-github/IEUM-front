import { SpotContent } from '../../types/map.type';
import Sample_Image_1 from '../../assets/images/sample_image_1.svg';
import Sample_Image_2 from '../../assets/images/sample_image_2.svg';
import React from 'react';

interface SpotDetailInfoPropsType {
  spotContent: SpotContent;
}
const SpotDetailInfo = (props: SpotDetailInfoPropsType) => {
  const spotContent = props.spotContent;
  return (
    <>
      <div className="spot-info">
        <div className="image-container">
          <img src={Sample_Image_1} alt="" />
          <img src={Sample_Image_2} alt="" />
        </div>
        <div>
          <span className="spot-name">{spotContent.name}</span>
          <span className="spot-type">{spotContent.category}</span>
        </div>
        <span className="address">{spotContent.address}</span>
        <div className="content">
          <span className="hashtag">{spotContent.category}</span>
          <p>{spotContent.content}</p>
        </div>
      </div>
      <hr />
    </>
  );
};
export default SpotDetailInfo;
