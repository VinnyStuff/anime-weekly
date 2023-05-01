import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import animesPromise from '../api/animes'
import styles from '../../styles/anime.module.css'
import { Typography } from '@mui/material';

export default function Anime() {
  const router = useRouter();
  const [anime, setAnime] = useState();

  useEffect(() => {
    if (router.query.id) {
      animesPromise.then(result => {
        setAnime(result.find(anime => anime.mal_id === Number(router.query.id[0])));
      });
    }
  }, [router.query.id]);

  console.log(anime);

  return (
    <>

      {anime ? (
        <>
          <div className={styles.wrapper}>
            <div className={styles.animeContainer}>

              <Typography variant="h3" color="text.primary" sx={{ pb: '10px'}}>{anime.title}</Typography>

              <div className={styles.audioVisualContent}>
                
              </div>
            </div>
          </div>
         
        </>
      ) :  (
        <>
          null
        </>
    )}
    </> 
  );
}