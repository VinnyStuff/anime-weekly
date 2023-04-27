import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import EmptyStateCard from './components/EmptyStateCard'
import AnimeCard from "./components/AnimeCard";
import styles from "../styles/TabsPage.module.css";
import animesPromise from './api/animes'

export default function Today() {
  const weekDays = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];
  const today = weekDays[new Date().getDay()]
  const localStorageAnimes = [];
  const [animes, setAnimes] = useState();

  useEffect(() => {
    animesPromise.then(result => {
      setAnimes(result);
    });
  }, []);

  const [currentTab, setCurrentTab] = useState('All')

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
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
                      <AnimeCard anime={anime} key={anime.title}/>
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
                  <>
                    {localStorageAnimes.filter((anime) => anime.release.release_brazil_streamings.day === today).length > 0 ? (
                      localStorageAnimes.filter((anime) => anime.release.release_brazil_streamings.day === today).map((anime) => (
                        <AnimeCard anime={anime} key={anime.title}/>
                      ))
                    ) : (
                      <EmptyStateCard/>
                    )}
                  </>
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
      </div>
    </>
  );
}
