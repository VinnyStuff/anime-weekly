import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import AnimeCard from "./components/AnimeCard";
import animesPromise from './api/animes'
import styles from "../styles/TabsPage.module.css";

export default function AllWeek() {
  const weekDays = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];
  const [currentTab, setCurrentTab] = useState(weekDays[0]) 
  const [animes, setAnimes] = useState();
  useEffect(() => {
    animesPromise.then(result => {
      setAnimes(result);
    });
  }, []);
  
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            {animes ? (
              <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
                {animes[0].season.charAt(0).toUpperCase() + animes[0].season.slice(1).toLowerCase()} {/* getting current season and putting in uppercase */}
              </Typography>
            ) :  (
              <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
                <Skeleton animation="wave" width={'30%'}/>
              </Typography> 
            )}

            <div className={styles.tabContainer}>
              {weekDays.map((day) => (
                <Typography variant="h5" key={day} color="text.primary" className={`${styles.tab} ${currentTab === day ? styles.tabActive : ''}`} onClick={() => setCurrentTab(day)}>{day}</Typography>
              ))}
            </div>
          </div>


          {animes ? (
            <div className={styles.animeCardContainer}>
              {animes.filter((anime) => anime.release.release_brazil_streamings.day === currentTab)
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
      </div>
    </>
  );
}