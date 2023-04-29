import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'

export default configureStore({
  reducer: {
    theme: themeReducer,
    favorites: favoritesReducer,
  },
});
