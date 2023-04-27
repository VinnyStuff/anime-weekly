import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import EmptyStateCard from './EmptyStateCard'

import AnimeCard from "./AnimeCard";

import styles from "../../styles/TabsPage.module.css";

import animesPromise from '../api/animes'

export default function Today() {

  const today = 'Sundays'
  const localStorageAnimes = [];

  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    animesPromise.then(result => {
      setAnimes(result);
    });
  }, []);

  useEffect(() =>{
    if (animes.length > 0) {
      console.log(animes);
    }
  }, [animes])
  const [currentTab, setCurrentTab] = useState('All')



  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          {animes ? (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              {today}
            </Typography>
          ) :  (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              <Skeleton animation="wave" width={'30%'}/>
            </Typography>
          )}

          <div className={styles.tabContainer}>
            <Typography className={`${styles.tab} ${currentTab === 'All' ? styles.tabActive : ''}`} variant="h5" color="text.primary" onClick={() => setCurrentTab('All')}>All</Typography>
            <Typography className={`${styles.tab} ${currentTab === 'Favorites' ? styles.tabActive : ''}`} variant="h5" color="text.primary" onClick={() => setCurrentTab('Favorites')}>Favorites</Typography>
          </div>
        </div>

        {currentTab === 'All' ? (
          <>
            {animes ? (
              <div className={styles.animeCardContainer}>
                {animes.filter((anime) => anime.release.release_brazil_streamings.day === today)
                  .map((anime) => (
                    <AnimeCard anime={anime} key={anime.title} onClick={() => AnimeCardClick(anime)}/>
                  ))}
              </div>
            ) : (
              <div className={styles.animeCardContainer}>
                <AnimeCard />
                <AnimeCard />
                <AnimeCard />
              </div>
            )}
          </>
        ) : currentTab === 'Favorites' ? (
          <>
             {animes ? (
              <div className={styles.animeCardContainer}>
                {localStorageAnimes.filter((anime) => anime.release.release_brazil_streamings.day === today).length >= 1 ? (
                  localStorageAnimes.filter((anime) => anime.release.release_brazil_streamings.day === today).map((anime) => (
                    <AnimeCard anime={anime} key={anime.title} onClick={() => AnimeCardClick(anime)}/>
                  ))
                ) : (
                  <EmptyStateCard/>
                )}
              </div>
            ) : (
              <div className={styles.animeCardContainer}>
                <AnimeCard />
                <AnimeCard />
                <AnimeCard />
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}
