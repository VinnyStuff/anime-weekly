import React, { useState, useEffect } from "react";
import animesPromise from './api/animes'

import { Typography, Box } from "@mui/material";

export default function Ranking() {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        animesPromise.then(result => {
            result.sort(function(a, b) { //reordering the array by ranking
                if (a.rank < b.rank) {
                    return -1;
                }
                if (a.rank > b.rank) {
                    return 1;
                }
                return 0;
            });
            setAnimes(result);
        });
    }, []);

  return (
    <>
        {animes.map((anime, index) => (
            <Box sx={{display: 'flex', my: '10px', alignItems: 'center'}} key={anime.rank}>
                
                <Box sx={{width: '60px'}}>
                    <Typography color="text.secondary" variant="h3">{index + 1}</Typography>
                </Box>
               <RankingAnimeCard anime={anime}/>
            </Box>
         ))}
    </>
  );
}

function RankingAnimeCard({anime}){    
    return (
        <>
            <Box sx={{display: 'flex', height: '110px', cursor: 'pointer', width: '100vw', maxWidth: '950px', mr: '10px', alignItems: 'center', overflow: 'hidden'}} onClick={() => window.open(anime.url, '_blank')}>
                <img
                    height={'100%'}
                    src={anime.images.jpg.large_image_url}
                    alt="Anime Poster"
                />
                <Box sx={{flexGrow: '1', px: '10px', overflow: 'hidden'}}>
                    <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'}}>{anime.title}</Typography>
                    <Typography sx={{whiteSpace: 'nowrap'}} variant="body1">Release: {anime.release.release_brazil_streamings.day}</Typography>
                    <Typography color="text.secondary" variant="body2">Rank geral: {anime.rank.toLocaleString()}°</Typography>
                    <Typography color="text.secondary" variant="body2">Score: {anime.score}</Typography>
                    <Typography color="text.secondary" variant="body2">Members: {anime.members.toLocaleString()}</Typography>
                </Box>
            </Box>
        </>
    );
}
