import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import styles from "../../styles/WeekAnimes.module.css";

export default function WeekAnimes({ props }) {
  console.log(props);

  return (
    <>
      <div>
        {props.weekDays.map((day) => (
          <div className={styles.weekAnimes} key={day}>
            <Typography variant="h5" className={styles.weekAnimesTitle}>
              {day}
            </Typography>

            <div>
              {/* {props.data.filter((anime) => anime.release.release_in_brazil_streamings.day === day)
                .map((anime) => (
                 <AnimeCardComponent anime={anime}/>
                ))} */}
            </div>
          </div>
        ))}

        {/*         {animesToShow.map((anime) => (
            <AnimeCardComponent anime={anime} />
        ))} */}
      </div>
    </>
  );
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
            value={rating / 2}
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
