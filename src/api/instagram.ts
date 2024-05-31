import { API } from '../util/api';
import { MarkerIcon, SpotContent, SpotType } from '../types/map.type';
import { setSpotList } from '../redux/spotSlice';
import { useAppDispatch } from '../redux/hook';

export const getUserMarker = async (instaId: string) => {
  // const res = await API.get(`/instagram/markers/${params?.userId}`);
  const res = await API.get(`/instagram/markers/${instaId}`);
  const { data } = res.data;
  const spotData: SpotType[] = data.map((item: any) => {
    const content = {
      instaGuestCollectionId: item?.instaGuestCollectionId,
      placeId: item?.placeId,
      placeName: item?.placeName,
      latitude: item?.latitude,
      longitude: item?.longitude,
      category: item?.category,
      instagramDescription: item?.instagramDescription,
      embeddedTag: item?.embeddedTag,
      tags: item?.tags,
      addressLevel1: item?.address_level1,
      addressLevel2: item?.address_level2,
      link: item?.link,
      address: item?.address,
      openHours: item?.openHours,
      phoneNumber: item?.phoneNumber,
    };

    return {
      position: new naver.maps.LatLng(content.latitude, content.longitude),
      icon: MarkerIcon.RESTAUTANT,
      spotContent: content,
    };
  });
  return spotData;
};

export const getUserCollectionList = async (instaId: string) => {
  // const res = await API.get(`/instagram/markers/${params?.userId}`);
  const res = await API.get(`/instagram/collections/${instaId}`);
  const { data, hasNextPage, nextCursorId } = res.data;
  const spotData: SpotType[] = data.map((item: any) => {
    const content = {
      instaGuestCollectionId: item?.instaGuestCollectionId,
      placeId: item?.placeId,
      placeName: item?.placeName,
      latitude: item?.latitude,
      longitude: item?.longitude,
      category: item?.category,
      instagramDescription: item?.instagramDescription,
      embeddedTag: item?.embeddedTag,
      tags: item?.tags,
      addressLevel1: item?.address_level1,
      addressLevel2: item?.address_level2,
      link: item?.link,
      address: item?.address,
      openHours: item?.openHours,
      phoneNumber: item?.phoneNumber,
    };

    return {
      position: new naver.maps.LatLng(content.latitude, content.longitude),
      icon: MarkerIcon.RESTAUTANT,
      spotContent: content,
    };
  });
  return { spotData, hasNextPage, nextCursorId };
};

export const getInstaCollectionDetail = async (
  instaId: string,
  instaGuestCollectionId: number,
) => {
  if (!instaId || !instaGuestCollectionId) return;
  const res = await API.get(
    `/instagram/collections/${instaId}/${instaGuestCollectionId.toString()}`,
  );
  const { data } = res;

  const spotData: SpotContent = {
    instaGuestCollectionId: data?.instaGuestCollectionId,
    placeId: data?.placeId,
    placeName: data?.placeName,
    latitude: data?.latitude,
    longitude: data?.longitude,
    category: data?.category,
    instagramDescription: data?.instagramDescription,
    embeddedTag: data?.embeddedTag,
    tags: data?.tags,
    addressLevel1: data?.address_level1,
    addressLevel2: data?.address_level2,
    link: data?.link,
    address: data?.address,
    openHours: data?.openHours,
    phoneNumber: data?.phoneNumber,
  };
  return spotData;
};
