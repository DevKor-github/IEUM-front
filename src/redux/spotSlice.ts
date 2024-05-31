import { createAppSlice } from './createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SpotType } from '../types/map.type';

export interface SpotSliceState {
  spotList: SpotType[];
  markerList: SpotType[];
  selectedSpotId: number | null;
}

const initialState: SpotSliceState = {
  spotList: [],
  markerList: [],
  selectedSpotId: null,
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
  }),
  selectors: {
    getSpotListProps: (spotState) => spotState.spotList,
    getMarkerListProps: (spotState) => spotState.markerList,
    getSelectedSpotIdProps: (spotState) => spotState.selectedSpotId,
  },
});

export const { setSpotList, setMarkerList, setSelectedSpotId } =
  spotSlice.actions;
export const { getSpotListProps, getMarkerListProps, getSelectedSpotIdProps } =
  spotSlice.selectors;
