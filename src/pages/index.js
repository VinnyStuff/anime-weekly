import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import AnimeCard from './AnimeCard'
import React, { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SellIcon from "@mui/icons-material/Sell";
import styles from "../styles/AnimeCard.module.css";



export default function Home() {
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

  const [searchText, setSearchText] = useState("");

  const handleTextChange = (text) => {
    setSearchText(text);
  };

  const filteredData = useMemo(() => {
    return data.filter((anime) => anime.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [data, searchText]);


  return (
    <>
      <AnimeCard onTextChange={handleTextChange} />

      {filteredData.map((anime) => (
        <div key={anime.title}>
          <AnimeCardComponent anime={anime} />
        </div>
      ))}
    </>
  )
}

function AnimeCardComponent({ anime }) {
  let image = "";
  let title = "";
  let genres = "";
  let rating = "";
  let subtitle = "";

  if (anime) {
    image = anime.images.jpg.large_image_url;
    title = anime.title;
    genres = anime.genres;
    rating = anime.score;
    subtitle = anime.synopsis;
  }

  return (
    <Card className={styles.animeCard}>
      <img className={styles.image} src={image} alt="current anime image" />
      <div className={styles.animeInformationsContainer}>
        <Typography variant="h5" className={styles.title}>
          {title}
        </Typography>

        <div className={styles.ratingContainer}>
          <Rating
            name="half-rating-read"
            defaultValue={rating / 2}
            precision={0.1}
            readOnly
          />
          <Typography color="text.primary">{rating}</Typography>
        </div>

        <Typography color="text.secondary" align="justify">
          {subtitle}
        </Typography>

        <Button className={styles.seeMoreButton} variant="contained">
          Read More
        </Button>
      </div>
    </Card>
  );
}

