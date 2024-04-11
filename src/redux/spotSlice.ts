import { createAppSlice } from './createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SpotContent, SpotType } from '../types/map.type';

export interface SpotSliceState {
  spotList: SpotType[];
  selectedSpot: SpotContent | null;
}

const initialState: SpotSliceState = {
  spotList: [],
  selectedSpot: null,
};

export const spotSlice = createAppSlice({
  name: 'spot',
  initialState,
  reducers: (create) => ({
    setSpotList: create.reducer((state, action: PayloadAction<SpotType[]>) => {
      state.spotList = action.payload;
    }),
    setSelectedSpot: create.reducer(
      (state, action: PayloadAction<SpotContent | null>) => {
        state.selectedSpot = action.payload;
      },
    ),
  }),
  selectors: {
    getSpotListProps: (spotState) => spotState.spotList,
    getSelectedSpotProps: (spotState) => spotState.selectedSpot,
  },
});

export const { setSpotList, setSelectedSpot } = spotSlice.actions;
export const { getSpotListProps, getSelectedSpotProps } = spotSlice.selectors;
