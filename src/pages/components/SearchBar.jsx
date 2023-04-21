import React, { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../styles/SearchBar.module.css";

export default function SearchBar({ props }) {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    setAnimes(props.data);
  }, [props]);

  const [animesToShow, setAnimesToShow] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    setAnimesToShow(animes);
    setGenres([
      ...new Set(
        animes.flatMap((anime) => anime.genres.map((genre) => genre.name))
      ),
    ]); //this get all genres presents in current animes
  }, [animes]);

  const [activeGenres, setActiveGenres] = useState([]);
  const [animesFilteredByTags, setAnimesFilteredByTags] = useState([]);
  const genresControl = (genre) => {
    if (!activeGenres.includes(genre)) {
      //put
      setActiveGenres([...activeGenres, genre]);
    } else {
      //remove
      setActiveGenres(
        activeGenres.filter((currentGenre) => currentGenre !== genre)
      );
    }
  };
  useEffect(() => {
    let animesFiltered = animes;
    for (let i = 0; i < activeGenres.length; i++) {
      animesFiltered = animesFiltered.filter((anime) =>
        anime.genres.some((genre) =>
          genre.name.toLowerCase().includes(activeGenres[i].toLowerCase())
        )
      );
    }
    setAnimesFilteredByTags(animesFiltered);
    setAnimesToShow(animesFiltered);
  }, [activeGenres]);

  const [text, setText] = useState("");
  useEffect(() => {
    setText(text);

    if (activeGenres.length === 0) {
      //search without tags
      setAnimesToShow(
        animes.filter((anime) =>
          anime.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      //search animes with current tag
      setAnimesToShow(
        animesFilteredByTags.filter((anime) =>
          anime.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  }, [text]);

  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showTags, setShowTags] = useState(true);
  const searchBar = useRef(null);
  const searchInput = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBar.current && !searchBar.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchBar]);

  return (
    <>
      <div
        className={styles.searchBarContainer}
        ref={searchBar}
        onClick={() => {
          setShowAutocomplete(true);
          searchInput.current.focus();
        }}
      >
        <Paper className={styles.searchBar}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setShowAutocomplete(false);
            }}
            type="button"
            sx={{ ml: "8px", mr: "-15px" }}
            style={{
              display:
                showAutocomplete && animes.length >= 1 ? "inherit" : "none",
            }}
          >
            <CloseIcon />
          </IconButton>

          <InputBase
            sx={{ ml: "8px", flex: 1, pl: 2 }}
            placeholder="Search Animes..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={animes.length === 0}
            className={styles.searchInput}
            ref={searchInput}
            inputRef={searchInput}
          />

          <IconButton
            style={{
              display: showAutocomplete ? "inherit" : "none",
            }}
            type="button"
            sx={{ p: "10px", mr: "6px" }}
            aria-label="search"
            onClick={(e) => {
              e.stopPropagation();
              setShowTags(!showTags);
              setActiveGenres([]);
            }}
          >
            {showTags ? <RemoveIcon /> : <AddIcon />}
          </IconButton>

          <Divider
            sx={{ height: 25, mt: 1.1, mr: 0.5 }}
            orientation="vertical"
          />

          <IconButton
            type="button"
            sx={{ p: "10px", pr: "18px" }}
            aria-label="search"
            disabled
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <Paper
          className={styles.autoCompleteContainer}
          style={{
            display:
              showAutocomplete && animes.length >= 1 ? "inherit" : "none",
          }}
        >
          <div
            className={styles.chipsContainer}
            style={{
              display:
              showTags ? "inherit" : "none",
            }}
          >
            {genres.map((genre) => (
              <Chip
                label={genre}
                key={genre}
                sx={{ mx: 0.3, mb: 0.8 }}
                color={activeGenres.includes(genre) ? "primary" : "default"}
                onClick={() => genresControl(genre)}
              />
            ))}
          </div>

          {animesToShow.slice(0, 5).map((anime) => (
            <div key={anime.title}>
              <Divider variant="middle"/>
              <AnimeCardSearch anime={anime}/>
            </div>
          ))}

          {animesToShow <= 0 && animes.length >= 1 ? (
            <div>
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", p: "10px", py: "20px" }}
              >
                No options
              </Typography>
            </div>
          ) : null}
        </Paper>
      </div>
    </>
  );
}

function AnimeCardSearch({ anime }) {
  if (anime) {
    const image = anime.images.jpg.large_image_url;
    const title = anime.title;
    const genres = anime.genres;
    const score = anime.score.toFixed(2);
    const release = anime.release.release_in_brazil_streamings.day;

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

            <div className={styles.animeCardGenresContainer}>
              {genres.map((genre, index) => (
                <Typography color="text.secondary" key={genre.name}>
                  {genre.name}
                  {index !== genres.length - 1 ? ",\u00A0" : ""}
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
          <div className={styles.overlay}></div>
        </div>
      </>
    );
  }
}
