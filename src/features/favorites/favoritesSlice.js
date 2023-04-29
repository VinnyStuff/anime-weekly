import { createSlice } from '@reduxjs/toolkit';
import animesPromise from '../../pages/api/animes';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    value: [],
  },
  reducers: {
    updateFavoritesAnimes: (state, action) => {
      state.value = action.payload;
    },
    clear: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const updateFavorites = () => async (dispatch) => { //updateFavoritesAnimes make this
    const animes = await animesPromise.then((data) => data);
  
    const favorites = animes.filter((anime) => localStorage.getItem(anime.title))
  
    dispatch(updateFavoritesAnimes(favorites));
};
export const clearFavorites = () => async (dispatch) => { //clear make this
  const animes = await animesPromise.then((data) => data);
  
  Object.keys(localStorage).forEach(function(key) { //forEach in localStorage
    animes.forEach(anime => {
      if(anime.title === key){
        localStorage.removeItem(key);
      }
    });
  });
  
  dispatch(updateFavoritesAnimes([]));
};

export const { updateFavoritesAnimes } = favoritesSlice.actions;

export const favoritesAnimes = (state) => state.favorites.value;

export default favoritesSlice.reducer;