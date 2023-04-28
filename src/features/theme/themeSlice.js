import { createSlice } from '@reduxjs/toolkit'


function getInitialTheme(){
    let initialTheme = 'light';

    if (typeof window !== 'undefined' && window.localStorage) {
        if(localStorage.getItem('theme')){
            initialTheme = localStorage.getItem('theme');
        }
        else{
            const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
            initialTheme = userPrefersLight ? 'light' : 'dark';
        }
    }
    return initialTheme;
}

const initialState = {
    theme: getInitialTheme(),
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState, 
  reducers: {
    changeTheme: (state) =>{
        state.theme = (state.theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', state.theme);
     }
  },
})

export const { changeTheme } = themeSlice.actions;

export const themeSelect = (state) => state.theme.theme

export default themeSlice.reducer
