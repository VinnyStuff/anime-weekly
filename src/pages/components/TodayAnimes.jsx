import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import AnimeCard from "./AnimeCard";

import styles from "../../styles/TodayAnimes.module.css";

export default function TodayAnimes({ props }) {
  const [animes, setAnimes] = useState([]);
  const [today, setToday] = useState();
  useEffect(() => {
    setAnimes(props.data);
    setToday(props.today)
  }, [props]);

  return (
    <>
      <div>
          <div className={styles.weekAnimes}>
            <Typography variant="h5" className={styles.weekAnimesTitle}>{today}</Typography>
            <div>
              {animes.filter((anime) => anime.release.release_in_brazil_streamings.day === today)
                .map((anime) => (
                 <AnimeCard anime={anime} key={anime.title}/>
                ))}
            </div>
          </div>
      </div>
    </>
  );
}