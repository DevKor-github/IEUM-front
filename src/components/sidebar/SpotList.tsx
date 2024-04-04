import React from 'react';
import Area_Select from '../../assets/images/area_select.svg';
import Sample_Image_1 from '../../assets/images/sample_image_1.svg';
import Sample_Image_2 from '../../assets/images/sample_image_2.svg';
import '../../assets/styles/spot.css';
const SpotList = () => {
  return (
    <div className="spot-container">
      <div className="category">
        <div className="dropdown">
          <span>지역 </span>
          <button>
            <img src={Area_Select} alt="" />
          </button>
        </div>
        <button className="category-button">
          <span>서울</span>
        </button>
        <button>
          <span>부산</span>
        </button>
      </div>
      <hr />

      <div className="spot-list">
        <div className="spot-info">
          <div className="image-container">
            <img src={Sample_Image_1} alt="" />
            <img src={Sample_Image_2} alt="" />
          </div>
          <div>
            <span className="spot-name">소연옥 해리단길점</span>
            <span className="spot-type">일식</span>
          </div>
          <span className="address">부산 해운대구</span>
          <div className="content">
            <span className="hashtag">#일식 #해운대 맛집</span>
            <p>
              어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔
            </p>
          </div>
        </div>
        <hr />
        <div className="spot-info">
          <div className="image-container">
            <img src={Sample_Image_1} alt="" />
            <img src={Sample_Image_2} alt="" />
          </div>
          <div>
            <span className="spot-name">소연옥 해리단길점</span>
            <span className="spot-type">일식</span>
          </div>
          <span className="address">부산 해운대구</span>
          <div className="content">
            <span className="hashtag">#일식 #해운대 맛집</span>
            <p>
              어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotList;
