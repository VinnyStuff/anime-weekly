import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import EmptyStateCard from './EmptyStateCard'

import AnimeCard from "./AnimeCard";

import styles from "../../styles/TabsPage.module.css";

export default function Today({ animes, today, localStorageAnimes, AnimeCardClick }) {
  const [currentTab, setCurrentTab] = useState('All')

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          {animes.length >= 1 ? (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              {today}
            </Typography>
          ) :  (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              <Skeleton animation="wave" width={'30%'}/>
            </Typography>
          )}

          <div className={styles.tabContainer}>
            <Typography variant="h5" color="text.primary" className={`${styles.tab} ${currentTab === 'All' ? styles.tabActive : ''}`} onClick={() => setCurrentTab('All')}>All</Typography>
            <Typography variant="h5" color="text.primary" className={`${styles.tab} ${currentTab === 'Favorites' ? styles.tabActive : ''}`} onClick={() => setCurrentTab('Favorites')}>Favorites</Typography>
          </div>
        </div>

        {currentTab === 'All' ? (
          <>
            {animes.length >= 1 ? (
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
             {animes.length >= 1 ? (
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
