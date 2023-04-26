import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";

import React, { useState, useEffect, forwardRef } from "react";
import SearchBar from "./components/SearchBar.jsx";
import AllWeek from "./components/AllWeek.jsx";
import Today from "./components/Today.jsx";
import Favorites from './components/Favorites.jsx'
import SideBar from "./components/SideBar.jsx";
import HorizontalSideBar from './components/HorizontalSideBar.jsx';
import moment from "moment";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import styles from "../styles/Index.module.css";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Index() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const weekDays = [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
  ];
  const today = weekDays[new Date().getDay()];
  const [data, setData] = useState([]);
  const [localStorageAnimes, setLocalStorageAnimes] = useState([]);
  const [currentTab, setCurrentTab] = useState("Today");

  useEffect(() => {
    const delay = 1200;
    let currentPage = 1;
    const animes = [];

    async function fetchSeasonData(page) {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`);
        const jsondata = await response.json();
        const apiData = jsondata.data

        for (let i = 0; i < apiData.length; i++) {
          apiData[i].release = getAnimesReleaseDate(apiData[i], weekDays);
          animes.push(apiData[i]);
        }

        
        if (jsondata.pagination.has_next_page) {
          currentPage++;
          await new Promise(resolve => setTimeout(resolve, delay));
          await fetchSeasonData(currentPage);
        }
        else {
          setData(animes);
        }
      } catch (error) {
        handleClick()
      }
    }

    fetchSeasonData(currentPage);
  }, []);
  

  function getAnimeCardClick(e){
    let notAnimes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if (!localStorage.getItem(e.title)){
        notAnimes++;
      }
    }
    if ((localStorage.length - notAnimes) === localStorageAnimes.length){ //if button save is clicked
      console.log('expand this anime ' + e.title); 
    }
    else{
      setLocalStorageAnimes(data.filter((anime) => localStorage.getItem(anime.title)))
    }
  }
  function clearFavorites(){
    localStorage.clear();
    setLocalStorageAnimes([]);
  }

  const [currentTheme, setCurrentTheme] = useState('light')
  useEffect(() => {
    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setCurrentTheme(userPrefersLight ? 'light' : 'dark');
  }, []);

  const changeTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    console.log(ThemeProvider);
  };

  const theme = createTheme({
    palette: {
      mode: currentTheme
    }
  });

  const [searchInFocus, setSearchInFocus] = useState(false);
  const handleSearchBarFocus = () => {
    setSearchInFocus(true)
  };
  const handleSearchBarBlur = () => {
    setSearchInFocus(false)
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={styles.navbarContainer} onFocus={handleSearchBarFocus} onBlur={handleSearchBarBlur}>
          <div className={styles.sideBarContainer}>
            <SideBar props={{ data, currentTheme, localStorageAnimes }} getCurrentTab={(e) => setCurrentTab(e)} onThemeChange={changeTheme} clearFavorites={clearFavorites}/>
          </div>
          <SearchBar props={{ data }}/>
        </div>


        <div className={styles.pageContainer} style={{display: searchInFocus ? 'none' : null}}>
          {   currentTab === "Today" ? (
            <Today props={{ data, today, localStorageAnimes }} AnimeCardClick={(e) => getAnimeCardClick(e)}/>
          ) : currentTab === "All Week" ? (
            <AllWeek props={{ data, weekDays }} AnimeCardClick={(e) => getAnimeCardClick(e)}/>
          ) : (
            <Favorites props={{ data, weekDays, localStorageAnimes}} AnimeCardClick={(e) => getAnimeCardClick(e)}/>
          )}
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Unexpected error occurred. Please try again later.
            </Alert>
          </Snackbar>
        </Stack>
      </ThemeProvider>
    </>
  );
}

function getAnimesReleaseDate(anime) {
    const weekday = anime.broadcast.day;
    const time = anime.broadcast.time;

    const releaseInTokyoTimeZone = moment(`${weekday} ${time}`, "dddd HH:mm"); 
    const simulcastInTokyoTimeZone = releaseInTokyoTimeZone.clone().add({ hours: 1 })
    const simulcastInBrazilTimeZone = simulcastInTokyoTimeZone.clone().subtract({ hours: 12 });
    const releaseInBrazilStreamings = simulcastInBrazilTimeZone.clone().add({ hours: 2 });

    return {
      release_tokyo: {
        day: releaseInTokyoTimeZone.format("dddd") + "s",
        hour: releaseInTokyoTimeZone.format("HH:mm")
      },
      simulcast_tokyo: {
        day: simulcastInTokyoTimeZone.format("dddd") + "s",
        hour: simulcastInTokyoTimeZone.format("HH:mm")
      },
      simulcast_brazil: {
        day: simulcastInBrazilTimeZone.format("dddd") + "s",
        hour: simulcastInBrazilTimeZone.format("HH:mm")
      },
      release_brazil_streamings: {
        day: releaseInBrazilStreamings.format("dddd") + "s",
        hour: releaseInBrazilStreamings.format("HH:mm")
      }
    }
}
