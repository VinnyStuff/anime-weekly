import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import animesPromise from '../api/animes'
import styles from '../../styles/anime.module.css'
import { Typography } from '@mui/material';
import SaveButton from '../components/SaveButton'

export default function Anime() {
  const router = useRouter();
  const [anime, setAnime] = useState();

  useEffect(() => {
    if (router.query.id) {
      animesPromise.then(result => {
        setAnime(result.find(anime => anime.mal_id === Number(router.query.id[0])));
        console.log(result.find(anime => anime.mal_id === Number(router.query.id[0])));
      });
    }
  }, [router.query.id]);

  return (
    <>

      {anime ? (
        <>
          <div className={styles.wrapper}>
            <div className={styles.animeContainer}>

              <Typography variant="h4" color="text.primary">{anime.title}</Typography>
              <Typography color="text.primary">score {anime.score}</Typography>
              <Typography color="text.primary">rank {anime.rank}</Typography>
              <Typography color="text.primary">release {anime.release.release_brazil_streamings.day}</Typography>

              <Typography color="text.secondary" sx={{mr: '8px'}}>
              {anime.genres.map((genre, index) => (
                 <span key={genre.name}>
                  {genre.name}
                  {index !== anime.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </Typography>

              <div className={styles.audioVisualContent}>
                <img src={anime.images.jpg.large_image_url} alt="anime poster" />
                <img src={anime.trailer.images.maximum_image_url} alt="anime video" />
              </div>
              <Typography color="text.primary">{anime.synopsis}</Typography>
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