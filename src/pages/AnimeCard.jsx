import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import SellIcon from "@mui/icons-material/Sell";

import styles from "../styles/AnimeCard.module.css";

export default function AnimeCard() {
  //https://api.jikan.moe/v4/seasons/now?limit=25&page=1
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.jikan.moe/v4/seasons/now?limit=25&page=1"
      );
      const jsonData = await response.json();
      console.log(jsonData.data);
      setData(jsonData.data);
    }

    fetchData();
  }, []);

  /* ------------------------------------------------------------------------- */
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
    //console.log(event.target.value); // exibe cada tecla digitada no console

    findAnimesInSearch(event.target.value);
  };

  function findAnimesInSearch(text) {
    console.log(data);
    let animesToShow = data.filter((anime) => anime.title.includes(text));
    //console.log(animesToShow);
  }

  //console.log(data[2]);
  const numbers = [1, 2, 3, 4, 5];

  const value = 3.5;

  const users = [
    { id: 1, name: "João", age: 25 },
    { id: 2, name: "Maria", age: 30 },
    { id: 3, name: "Pedro", age: 20 },
  ];

  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }}>
          <SellIcon fontSize="small" />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Animes"
          value={text}
          onChange={handleInputChange}
        />

        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.age} anos</p>
          </div>
        ))}
      </div>

      <div>
        {data.map((anime, index) => (
          <div key={anime.title}>
            <h1>
              {index + 1} - {anime.title}
            </h1>
          </div>
        ))}
      </div>

      {data.map((anime, index) => (
        <AnimeCardComponent anime={data[index]} key={anime.title}/>
      ))}
    </>
  );
}

function AnimeCardComponent({ anime }) {
  let image = '';
  let title = '';
  let genres = '';
  let rating = '';
  let subtitle = '';


  if(anime){
    image = anime.images.jpg.large_image_url;
    title = anime.title;
    genres = anime.genres;
    rating = anime.score;
    subtitle = anime.synopsis;
  }

  return (
    <Card className={styles.animeCard}>
      <img
        className={styles.image}
        src={image}
        alt="current anime image"
      />
      <div className={styles.animeInformationsContainer}>
        <Typography variant="h5" className={styles.title}>{title}</Typography>

        <div className={styles.chipsContainer}>
          {genres.map((genre) => (
            <Chip label={genre.name} variant="outlined" sx={{ mr:0.75 }}/>
          ))}
        </div>

        <div className={styles.ratingContainer}>
          <Rating
            name="half-rating-read"
            defaultValue={rating / 2}
            precision={0.1}
            readOnly
          />
          <Typography color="text.primary">{rating}</Typography>
        </div>

        <Typography color="text.secondary" align="justify">{subtitle}</Typography>

        <Button className={styles.seeMoreButton} variant="contained">
          Read More
        </Button>

      </div>
    </Card>
  );
}