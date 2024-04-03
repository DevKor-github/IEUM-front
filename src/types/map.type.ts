export enum MarkerIcon {
  BAKERY = 'bakery_marker.png',
  BAR = 'bar_marker.png',
  CAFE = 'cafe_marker.png',
  DOG = 'dog_marker.png',
  FOOD = 'food_marker.png',
  MUSEUM = 'museum_marker.png',
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
