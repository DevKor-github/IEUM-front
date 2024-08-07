import { createAppSlice } from './createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SpotType } from '../types/map.type';

export interface SpotSliceState {
  spotList: SpotType[];
  markerList: SpotType[];
  selectedSpotId: number | null;
  selectedPlaceId: number | null;
  isValidUser: boolean;
}

const initialState: SpotSliceState = {
  spotList: [],
  markerList: [],
  selectedSpotId: null,
  selectedPlaceId: null,
  isValidUser: true,
};

export const spotSlice = createAppSlice({
  name: 'spot',
  initialState,
  reducers: (create) => ({
    setSpotList: create.reducer((state, action: PayloadAction<SpotType[]>) => {
      state.spotList = action.payload;
    }),
    setMarkerList: create.reducer(
      (state, action: PayloadAction<SpotType[]>) => {
        state.markerList = action.payload;
      },
    ),
    setSelectedSpotId: create.reducer(
      (state, action: PayloadAction<number | null>) => {
        state.selectedSpotId = action.payload;
      },
    ),
    setSelectedPlaceId: create.reducer(
      (state, action: PayloadAction<number | null>) => {
        state.selectedPlaceId = action.payload;
      },
    ),
    setIsValidUser: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isValidUser = action.payload;
    }),
  }),
  selectors: {
    getSpotListProps: (spotState) => spotState.spotList,
    getMarkerListProps: (spotState) => spotState.markerList,
    getSelectedSpotIdProps: (spotState) => spotState.selectedSpotId,
    getSelectedPlaceIdProps: (spotState) => spotState.selectedPlaceId,
    getIsValidUser: (spotState) => spotState.isValidUser,
  },
});

export const {
  setSpotList,
  setMarkerList,
  setSelectedSpotId,
  setSelectedPlaceId,
  setIsValidUser,
} = spotSlice.actions;
export const {
  getSpotListProps,
  getMarkerListProps,
  getSelectedSpotIdProps,
  getSelectedPlaceIdProps,
  getIsValidUser,
} = spotSlice.selectors;
