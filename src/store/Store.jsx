import { configureStore } from '@reduxjs/toolkit'
import SelectedRoadFeatureSlice from './SelectedRoadFeatureSlice'

export default configureStore({
  reducer: {
    selectedRoadFeatures: SelectedRoadFeatureSlice
  }
})