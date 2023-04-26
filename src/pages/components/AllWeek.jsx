import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import AnimeCard from "./AnimeCard";

import styles from "../../styles/TabsPage.module.css";

export default function AllWeek({ props, AnimeCardClick }) {
  const [animes, setAnimes] = useState([]);
  const [week, setWeek] = useState(props.weekDays);

  useEffect(() => {
    setAnimes(props.data);
  }, [props.data]);

  const [currentTab, setCurrentTab] = useState(week[0])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          {animes.length >= 1 ? (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              {animes[0].season.charAt(0).toUpperCase() + animes[0].season.slice(1).toLowerCase()}
            </Typography>
          ) :  (
            <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
              <Skeleton animation="wave" width={'30%'}/>
            </Typography> 
          )}

          <div className={styles.tabContainer}>
            {week.map((day) => (
              <Typography variant="h5" key={day} color="text.primary" className={`${styles.tab} ${currentTab === day ? styles.tabActive : ''}`} onClick={() => setCurrentTab(day)}>{day}</Typography>
            ))}
          </div>
        </div>


        {animes.length >= 1 ? (
          <div className={styles.animeCardContainer}>
            {animes.filter((anime) => anime.release.release_brazil_streamings.day === currentTab)
            .map((anime) => (
              <AnimeCard anime={anime} key={anime.title} onClick={() => AnimeCardClick(anime)}/>
            ))}
          </div>
        ) :  (
          <div className={styles.animeCardContainer}>
            <AnimeCard />
            <AnimeCard />
            <AnimeCard />
          </div>
        )}
      </div>
    </>
  );
}