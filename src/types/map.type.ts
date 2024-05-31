export enum MarkerIcon {
  BAKERY = 'Bakery',
  BAR = 'Bar',
  CAFE = 'Cafe',
  DOG = 'Dog',
  RESTAURANT = 'Restaurant',
  CULTURE = 'Culture',
  STAY = 'Stay',
  SHOPPING = 'Shopping',
  OTHERS = 'Others',
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
