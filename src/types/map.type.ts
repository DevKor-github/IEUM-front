export enum MarkerIcon {
  BAKERY = 'bakery',
  BAR = 'bar',
  CAFE = 'cafe',
  DOG = 'dog',
  RESTAUTANT = 'restaurant',
  MUSEUM = 'museum',
}

export interface SpotType {
  // id: number;
  position: naver.maps.LatLng;
  icon: MarkerIcon;
  spotContent: SpotContent;
}

export interface SpotContent {
  instaGuestCollectionId: number;
  placeId: number;
  placeName: string;
  latitude: number;
  longitude: number;
  category: string;
  instagramDescription: string;
  embeddedTag: string;
  tags: [string];
  addressLevel1: string;
  addressLevel2: string;
  link: string;
  address: string;
  openHours: [string];
  phoneNumber: string;
}
