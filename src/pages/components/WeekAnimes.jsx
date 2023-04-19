import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AnimeCard from "./AnimeCard";

import styles from "../../styles/WeekAnimes.module.css";

export default function WeekAnimes({ props }) {
  const [animes, setAnimes] = useState([]);
  const [week, setWeek] = useState([]);
  useEffect(() => {
    setAnimes(props.data);
    setWeek(props.weekDays)
  }, [props]);

  return (
    <>
      <div>
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
      </div>
    </>
  );
}