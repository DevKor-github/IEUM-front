import { SpotContent } from '../../types/map.type';
import InstaIcon from '../../assets/images/insta_icon.svg';
import MetaIcon from '../../assets/images/meta_info_icon.svg';
import React, { useEffect, useState } from 'react';
import { getSpotListProps } from '../../redux/spotSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import { getInstaCollectionDetail } from '../../api/instagram';

interface SpotDetailInfoPropsType {
  selectedId: number;
}

const SpotDetailInfo = (props: SpotDetailInfoPropsType) => {
  const selectedId = props.selectedId;
  const params = useParams();

  const [spotContent, setSpotContent] = useState<SpotContent>();
  const [instaContent, setInstaContent] = useState<string>('');

  const [address, setAddress] = useState<string>('');
  const [openHours, setOpenHours] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    getSpotInfo();
  }, [selectedId]);

  const getSpotInfo = async () => {
    const spot = await getInstaCollectionDetail(
      params?.userId || '',
      selectedId,
    );
    setSpotContent(spot);
    setAddress(spot?.address || '');
    setOpenHours(spot?.openHours?.join('\n') || '');
    setPhoneNumber(spot?.phoneNumber || '');
    const parser = new DOMParser();
    const doc = parser.parseFromString(spot?.embeddedTag || '', 'text/html');
    setInstaContent(doc.documentElement.textContent || '');
  };

  useEffect(() => {
    if (window?.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [instaContent]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: instaContent }}></div>

      <div className="spot-info">
        <div style={{ display: 'flex' }}>
          <div>
            <div>
              <span className="spot-name">{spotContent?.placeName}</span>
              <span className="spot-type">{spotContent?.category}</span>
            </div>
            <div>
              <span className="address">{spotContent?.address}</span>
            </div>
          </div>

          {/*<div className="share-insta">*/}
          {/*  <button>*/}
          {/*    <img src={InstaIcon} alt="share_button" />*/}
          {/*  </button>*/}
          {/*  <span>바로가기</span>*/}
          {/*</div>*/}
        </div>

        <div className="content">
          <span className="hashtag">{spotContent?.tags?.join(',')}</span>
          <p>{spotContent?.instagramDescription}</p>
        </div>

        <div className="meta-info">
          {address && (
            <div>
              <img src={MetaIcon} alt="address" />
              <span>{address}</span>
            </div>
          )}
          {openHours && (
            <div>
              <img src={MetaIcon} alt="office-hour" />
              <span>{openHours}</span>
            </div>
          )}
          {phoneNumber && (
            <div>
              <img src={MetaIcon} alt="contact-number" />
              <span>{phoneNumber}</span>
            </div>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
export default SpotDetailInfo;
