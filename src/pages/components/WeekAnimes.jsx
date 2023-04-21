import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import AnimeCard from "./AnimeCard";

import styles from "../../styles/WeekAnimes.module.css";

export default function WeekAnimes({ props }) {
  const [animes, setAnimes] = useState([]);
  const [week, setWeek] = useState(props.weekDays);
  useEffect(() => {
    setAnimes(props.data);
    setWeek(props.weekDays)
  }, [props]);

  const [currentTab, setCurrentTab] = useState(week[0])

  if (animes.length >= 1) {
    return (
      <>
        <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>
          All Week
        </Typography>

        <div className={styles.tabContainer}>
          {week.map((day) => (
            <Typography variant="h5" color="text.primary" className={`${styles.tab} ${currentTab === day ? styles.tabActive : ''}`} onClick={() => setCurrentTab(day)}>{day}</Typography>
          ))}
        </div>

        {animes.filter((anime) => anime.release.release_in_brazil_streamings.day === currentTab)
          .map((anime) => (
          <AnimeCard anime={anime} key={anime.title}/>
        ))}

        {/* <div className={styles.weekAnimesContainer}>
          {week.map((day) => (
            <div className={styles.weekAnimes} key={day}>
              <Typography variant="h5" className={styles.weekAnimesTitle}>
                {day}
              </Typography>

              <div>
                {animes.filter((anime) => anime.release.release_in_brazil_streamings.day === day)
                  .map((anime) => (
                  <AnimeCard anime={anime} key={anime.title}/>
                  ))}
              </div>
            </div>
          ))}
        </div> */}
      </>
    );
  } else {
    return (
      <>
        <div>
            <div >
              <Typography variant="h5" className={styles.weekAnimesTitle}>
                <Skeleton animation="wave" width={'150px'} sx={{m: '0 auto'}}/>
              </Typography>

              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
            </div>
        </div>
      </>
    );
  }
}