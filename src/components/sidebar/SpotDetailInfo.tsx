import { SpotContent } from '../../types/map.type';
import Sample_Image_1 from '../../assets/images/sample_image_1.svg';
import Sample_Image_2 from '../../assets/images/sample_image_2.svg';
import InstaIcon from '../../assets/images/insta_icon.svg';
import MetaIcon from '../../assets/images/meta_info_icon.svg';
import React from 'react';
import FullImageContainer from '../image/FullImageContainer';

interface SpotDetailInfoPropsType {
  spotContent: SpotContent;
}
const SpotDetailInfo = (props: SpotDetailInfoPropsType) => {
  const spotContent = props.spotContent;
  return (
    <>
      <FullImageContainer tempImage={[Sample_Image_1, Sample_Image_2]} />
      <div className="spot-info">
        <div style={{ display: 'flex' }}>
          <div>
            <div>
              <span className="spot-name">{spotContent.name}</span>
              <span className="spot-type">{spotContent.category}</span>
            </div>
            <div>
              <span className="address">{spotContent.address}</span>
            </div>
          </div>

          <div className="share-insta">
            <button>
              <img src={InstaIcon} alt="share_button" />
            </button>
            <span>바로가기</span>
          </div>
        </div>

        <div className="content">
          <span className="hashtag">{spotContent.category}</span>
          <p>{spotContent.content}</p>
        </div>

        <div className="meta-info">
          <div>
            <img src={MetaIcon} alt="address" />
            <span>부산 해운대구 우동1로38번길 14-7 주택 1층</span>
          </div>
          <div>
            <img src={MetaIcon} alt="office-hour" />
            <span>11:30 - 22:30 브레이크타임: 15:00 - 16:30</span>
          </div>
          <div>
            <img src={MetaIcon} alt="contact-number" />
            <span>0507-1314-1795</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
export default SpotDetailInfo;
