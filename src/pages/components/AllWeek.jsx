import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import AnimeCard from "./AnimeCard";

import styles from "../../styles/TabsPage.module.css";

export default function AllWeek({ props }) {
  const [animes, setAnimes] = useState([]);
  const [week, setWeek] = useState(props.weekDays);

  useEffect(() => {
    setAnimes(props.data);
    setWeek(props.weekDays)
  }, [props]);

  const [currentTab, setCurrentTab] = useState(week[0])

  return (
    <>
      <div className={styles.wrapper}>
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

        {animes.length >= 1 ? (
          <div className={styles.animeCardContainer}>
            {animes.filter((anime) => anime.release.release_in_brazil_streamings.day === currentTab)
            .map((anime) => (
              <AnimeCard anime={anime} key={anime.title}/>
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