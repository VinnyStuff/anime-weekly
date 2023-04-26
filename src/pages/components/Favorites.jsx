import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import AnimeCard from "./AnimeCard";
import EmptyStateCard from './EmptyStateCard'

import styles from "../../styles/TabsPage.module.css";

export default function Favorites({ props, AnimeCardClick }) {
  const [animes, setAnimes] = useState([]);
  const [week, setWeek] = useState(props.weekDays);
  const [currentTab, setCurrentTab] = useState('All')
  const [localStorageAnimes, setLocalStorageAnimes] = useState([]);

  useEffect(() => {
    setAnimes(props.data);
  }, [props.data]);
  useEffect(() => {
    setLocalStorageAnimes(props.localStorageAnimes)
  }, [props.localStorageAnimes]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          {animes.length >= 1 ? (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              Favorites
            </Typography>
          ) :  (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              <Skeleton animation="wave" width={'30%'}/>
            </Typography>
          )}
        </div>

        <div className={styles.tabContainer}>
            <Typography variant="h5" color="text.primary" className={`${styles.tab} ${currentTab === 'All' ? styles.tabActive : ''}`} onClick={() => setCurrentTab('All')}>All</Typography>
            {week.map((day) => (
              <Typography variant="h5" key={day} color="text.primary" className={`${styles.tab} ${currentTab === day ? styles.tabActive : ''}`} onClick={() => setCurrentTab(day)}>{day}</Typography>
            ))}
          </div>
        
        <div className={styles.animeCardContainer}>
            {currentTab === "All" ? (
              <>
                 {localStorageAnimes.length >= 1 ? (
                    localStorageAnimes.map((anime) => (
                      <AnimeCard anime={anime} key={anime.title} onClick={() => AnimeCardClick(anime)}/>
                    ))
                  ) : (
                    <EmptyStateCard/>
                  )}
              </>
            ) : (
              <>
                {localStorageAnimes.filter((anime) => anime.release.release_brazil_streamings.day === currentTab).length >= 1 ? (
                  localStorageAnimes.filter((anime) => anime.release.release_brazil_streamings.day === currentTab).map((anime) => (
                    <AnimeCard anime={anime} key={anime.title} onClick={() => AnimeCardClick(anime)}/>
                  ))
                ) : (
                  <EmptyStateCard/>
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
}
