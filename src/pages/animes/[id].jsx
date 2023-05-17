import React, { useState, useEffect } from "react";
import animesPromise from '../api/animes'
import styles from '../../styles/anime.module.css'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

export async function getStaticProps(context) {

  const { params } = context

  const anime = (await animesPromise).find(anime => Number(anime.mal_id) === Number(params.id));

  const charactersData = await fetch(
    `https://api.jikan.moe/v4/anime/${params.id}/characters`,
  )
  const jsonData = await charactersData.json()
  const characters = jsonData.data;

  return {
    props: { anime, characters}
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

export default function Anime({ anime, characters }) {  
  const [charactersToShow, setNumToShow] = useState(10);

  function showAllCharacters() {
    if (charactersToShow === 10){
      setNumToShow(characters.length);
    }
    else{
      setNumToShow(10);
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.animeContainer}>
          <Typography variant="h4" color="text.primary">{anime.title}</Typography>

          <div className={styles.charactersContainer}>
            <Typography variant="h5" color="text.primary">Characters</Typography>

            <div className={styles.charactersListContainer}>
              {characters.slice(0, charactersToShow).map((character) => (
                <CharacterCard character={character} key={character.id} />
              ))}
              <IconButton onClick={showAllCharacters} sx={{width: '100%', borderRadius: '0'}} aria-label="Read more">
                {charactersToShow === 10 ? (
                  <>
                    <KeyboardArrowDownIcon />
                  </>
                ) :
                  <>
                    <KeyboardArrowUpIcon />
                  </>
                }
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
}


const CharacterCard = ({character}) =>{
  console.log(character);
  const handleCharacterClick = () => {
    event.stopPropagation();
    window.open(character.character.url, '_blank');
  };

  return(
  <>
    <Card className={styles.characterCardContainer} onClick={handleCharacterClick}>
      <img
        className={styles.CharacterCardImage}
        src={character.character.images.jpg.image_url}
        alt="Character Image"
      />
      <Divider orientation="vertical" flexItem />
      <div className={styles.characterCardText}>
        <Typography variant="body1" color="text.primary" sx={{mb: '2px'}}>{character.character.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary">{character.role}</Typography>
      </div>
    </Card>
  </>
  );
}