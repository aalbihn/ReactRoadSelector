import { createSlice } from '@reduxjs/toolkit'

export const selectedRoadFeatureSlice = createSlice({
  name: 'selectedRoadFeatures',
  initialState: {
    features: [],
  },
  reducers: {
    setSelectedRoadFeatures: (state, action) => {
      state.features = [...state.features, ...action.payload]
    },
    addSelectedRoadFeature: (state, action) => {
      state.features.push(action.payload);
    },
    removeSelectedRoadFeature: (state, action) => {
      const stateFeaturesCopy = [...state.features]
      const idx = stateFeaturesCopy.findIndex((feature) => {
        return feature.properties.gid === action.payload.properties.gid
      })
      if(idx >= 0) {
        stateFeaturesCopy.splice(idx, 1);
        state.features = [...stateFeaturesCopy]
      }
    }
  }
})
// Action creators are generated for each case reducer function
export const { setSelectedRoadFeatures, addSelectedRoadFeature, removeSelectedRoadFeature } = selectedRoadFeatureSlice.actions;
export default selectedRoadFeatureSlice.reducer