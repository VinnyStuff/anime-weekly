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

  if (animes.length >= 1) {
    return (
      <>
        <div>
          <div className={styles.weekAnimes}>
            <Typography variant="h3" color="text.primary" sx={{ pb: '20px'}}>
              {today}
            </Typography>

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
          </div>
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
