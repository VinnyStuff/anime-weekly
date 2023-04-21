import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import AnimeCard from "./AnimeCard";

import styles from "../../styles/TodayAnimes.module.css";

export default function TodayAnimes({ props }) {
  const [animes, setAnimes] = useState([]);
  const [today, setToday] = useState();
  useEffect(() => {
    setAnimes(props.data);
    setToday(props.today);
  }, [props]);

  const [currentTab, setCurrentTab] = useState('All')

  if (animes.length >= 1) {
    return (
      <>
        <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
          {today}
        </Typography>

        <div className={styles.tabContainer}>
          <Typography variant="h5" color="text.primary" className={`${styles.tab} ${currentTab === 'All' ? styles.tabActive : ''}`} onClick={() => setCurrentTab('All')}>All</Typography>
          <Typography variant="h5" color="text.primary" className={`${styles.tab} ${currentTab === 'Favorites' ? styles.tabActive : ''}`} onClick={() => setCurrentTab('Favorites')}>Favorites</Typography>
        </div>

        <div>
          {animes.length >= 1 ? (
            <div>
              {animes
                .filter(
                  (anime) =>
                    anime.release.release_in_brazil_streamings.day === today
                )
                .map((anime) => (
                  <AnimeCard anime={anime} key={anime.title} />
                ))}
            </div>
          ) : (
            <div>
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Typography variant="h5" className={styles.weekAnimesTitle}>
            <Skeleton animation="wave" width={'150px'} sx={{m: '0 auto'}}/>
          </Typography>

          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
        </div>
      </>
    );
  }
}
