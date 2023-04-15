import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/AnimeCard.module.css";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

export default function AnimeCard({ animes }) {
  const [animesToShow, setAnimesToShow] = useState([]);

  const [genres, setGenres] = useState([]);

  const [genreColors, setGenreColors] = useState({});

  const handleClick = (genre) => {
    setGenreColors((prevState) => ({
      ...prevState,
      [genre]: prevState[genre] === "primary" ? 'default' : "primary",
    }));
  };

  const [text, setText] = useState("");
  useEffect(() => {
    setText(text);

    setAnimesToShow(
      animes.filter((anime) =>
        anime.title.toLowerCase().includes(text.toLowerCase())
      )
    );
    console.log(genreColors);
  }, [text]);

  return (
    <>
      <div className={styles.searchBarContainer}>
        <Paper className={styles.searchBar}>
          <InputBase
            sx={{ ml: 1, flex: 1, pl: 2 }}
            placeholder="Search Animes..."
            value={text}
            //onChange={(e) => setText(e.target.value)}
            onChange={(e) => setText(e.target.value)}
            onClick={() => {
              setAnimesToShow(animes);
              setGenres([
                ...new Set(
                  animes.flatMap((anime) =>
                    anime.genres.map((genre) => genre.name)
                  )
                ),
              ]);
            }}
            //onBlur={() => {setAnimesToShow([]); setGenres([])}}
          />

          <Divider
            sx={{ height: 25, mt: 1.1, mr: 0.5 }}
            orientation="vertical"
          />

          <IconButton
            type="button"
            disabled
            sx={{ p: "10px", pr: "18px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <div className={styles.autoCompleteContainer}>
          <div className={styles.chipsContainer}>
            {genres.map((genre) => (
              <Chip
                label={genre}
                key={genre}
                sx={{ mx: 0.3, mb: 0.8 }}
                color={genreColors[genre] || "default"}
                onClick={() => handleClick(genre)}
              />
            ))}
          </div>

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
  let genres = "";
  let score = "";
  let release = "";

  if (anime) {
    /*     image = anime.images.jpg.large_image_url;
    title = anime.title;
    score = anime.score;
    release = anime.broadcast.day; */

    image = anime.anime.images.jpg.large_image_url;
    title = anime.anime.title;
    genres = anime.anime.genres;
    score = anime.anime.score;
    release = anime.anime.broadcast.day;
  }

  return (
    <>
      <Divider />
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

          <div className={styles.animeCardGenresContainer}>
            {genres.map((genre, index) => (
              <Typography color="text.secondary" key={genre.name}>
                {genre.name}
                {index === genres.length - 1 ? "" : ",\u00A0"}
              </Typography>
            ))}
          </div>

          <Typography color="text.secondary" sx={{ mt: "-4px" }}>
            Score: {score}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: "-4px" }}>
            Release: {release}
          </Typography>
        </div>
      </div>
    </>
  );
};
