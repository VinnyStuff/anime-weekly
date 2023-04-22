import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import AnimeCard from "./AnimeCard";
import EmptyStateCard from './EmptyStateCard'

import styles from "../../styles/TabsPage.module.css";

export default function Favorites({ props }) {
  const [animes, setAnimes] = useState([]);
  const [week, setWeek] = useState(props.weekDays);
  useEffect(() => {
    setAnimes(props.data);
    setWeek(props.weekDays)
  }, [props]);

  const [currentTab, setCurrentTab] = useState('All')

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
            <EmptyStateCard/>
        </div>
      </div>
    </>
  );
}
