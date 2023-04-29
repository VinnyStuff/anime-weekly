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
  },
});
export const updateFavorites = () => async (dispatch) => { //updateFavoritesAnimes make this
    const animes = await animesPromise.then((data) => data);
  
    const favorites = animes.filter((anime) => localStorage.getItem(anime.title))
  
    dispatch(updateFavoritesAnimes(favorites));
};

export const { updateFavoritesAnimes } = favoritesSlice.actions;

export const favoritesAnimes = (state) => state.favorites.value;

export default favoritesSlice.reducer;