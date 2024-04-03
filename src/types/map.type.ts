export enum MarkerIcon {
  BAKERY = 'bakery',
  BAR = 'bar',
  CAFE = 'cafe',
  DOG = 'dog',
  RESTAUTANT = 'restaurant',
  MUSEUM = 'museum',
}

export interface MarkerType {
  // id: number;
  position: naver.maps.LatLng;
  icon: MarkerIcon;
  spotContent: SpotContent;
}
export interface SpotContent {
  name: string;
  category: string;
  shortAddress: string;
  address: string;
  hashtag: string;
  content: string;
  officeHour: string;
  phoneNumber: string;
}
