import React, { useState, useEffect } from "react";
import animesPromise from '../api/animes'
import styles from '../../styles/anime.module.css'
import Typography from '@mui/material/Typography';

export async function getStaticProps(context) {
  const { params } = context
  const data = await fetch(
    `https://api.jikan.moe/v4/anime/${params.id}/full`,
  )

  const jsonData = await data.json()
  const anime = jsonData.data;

/* 
  const bla = await fetch(
    `https://api.jikan.moe/v4/anime/${params.id}/pictures`,
  )

  const bla2 = await bla.json()
  const bla3 = bla2.data; */


  return {
    props: { anime: anime},
  };
}

export async function getStaticPaths() {

  const animes = await animesPromise;

  const paths = animes.map((anime) => {
    return {
      params: {
        id: `${anime.mal_id}`,
      },
    }
  });

  return { paths, fallback: false }
}

export default function Anime({ anime, animeCharacters }) {  
  console.log(anime);
  console.log(animeCharacters);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.animeContainer}>
          <Typography>{anime.title}</Typography>
        </div>
      </div>
    </> 
  );
}