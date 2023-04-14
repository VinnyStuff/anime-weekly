import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/AnimeCard.module.css";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export default function AnimeCard({ animes }) {
  const [animesToShow, setAnimesToShow] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(text);

    //console.log(animes);

    const bla = animes.map(anime => anime.genres); //get all genres
    console.log(bla);

    const bla2 = bla.flatMap(arr => arr.map(obj => obj.name)); //put all genres in a single array
    console.log(bla2);

    const bla3 = bla2.filter((value, index) => bla2.indexOf(value) === index); //remove duplicate genres
    console.log(bla3);

    setAnimesToShow(
      animes.filter((anime) =>
        anime.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  }, [text]);

  return (
    <>
      <div className={styles.searchBarContainer}>
        <Paper className={styles.searchBar}>
          <IconButton sx={{ p: "10px" }}>
            <MenuIcon />
          </IconButton>

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Animes"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={() => setAnimesToShow(animes)}
            onBlur={() => setAnimesToShow([])}
          />

          <IconButton
            type="button"
            disabled
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <div className={styles.autoCompleteContainer}>
          {animesToShow.map((currentAnime) => (
            <AnimeCardSearch anime={currentAnime} key={currentAnime.title} />
          ))}
        </div>
      </div>
    </>
  );
}

const AnimeCardSearch = (anime) => {
  let image = "";
  let title = "";
  let score = "";
  let release = "";

  if (anime) {
    /*     image = anime.images.jpg.large_image_url;
    title = anime.title;
    score = anime.score;
    release = anime.broadcast.day; */

    image = anime.anime.images.jpg.large_image_url;
    title = anime.anime.title;
    score = anime.anime.score;
    release = anime.anime.broadcast.day;
  }

  return (
    <>
      <div className={styles.animeCardSearch}>
        <img
          className={styles.animeCardSearchImage}
          src={image}
          alt="current anime image"
        />

        <div className={styles.animeCardSearchInformations}>
          <Typography
            color="text.primary"
            variant="h6"
            className={styles.animeCardSearchTitle}
          >
            {title}
          </Typography>

          <Typography color="text.secondary">Score: {score}</Typography>

          <Typography color="text.secondary" sx={{ mt: "-4px" }}>
            Release: {release}
          </Typography>
        </div>
      </div>
      <Divider />
    </>
  );
}