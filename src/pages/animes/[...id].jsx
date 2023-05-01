import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import animesPromise from '../api/animes'

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

  return (
    <>
      {anime ? (
        <>
          <h1>{anime.title}</h1>
        </>
      ) :  (
        <>
          null
        </>
    )}
    </> 
  );
}