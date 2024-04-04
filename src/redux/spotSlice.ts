import { createAppSlice } from './createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SpotType } from '../types/map.type';

export interface SpotSliceState {
  spotList: SpotType[];
}

const initialState: SpotSliceState = {
  spotList: [],
};

export const spotSlice = createAppSlice({
  name: 'spot',
  initialState,
  reducers: (create) => ({
    setSpotList: create.reducer(
      (state, action: PayloadAction<SpotSliceState>) => {
        state.spotList = action.payload.spotList;
      },
    ),
  }),
  selectors: { getSpotListProps: (spotList) => spotList },
});

export const { setSpotList } = spotSlice.actions;
export const { getSpotListProps } = spotSlice.selectors;
