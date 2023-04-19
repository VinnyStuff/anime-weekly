import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import styles from "../../styles/AnimeCard.module.css";

export default function AnimeCard({ anime }) {
  let image = "";
  let title = "";
  let genres = "";
  let rating = "";
  let subtitle = "";
  let release = "";

  if (anime) {
    image = anime.images.jpg.large_image_url;
    title = anime.title;
    genres = anime.genres;
    rating = anime.score;
    subtitle = anime.synopsis;
    release = anime.release.release_in_brazil_streamings.day;
  }

  return (
    <Card className={styles.animeCard}>
      <img className={styles.image} src={image} alt="current anime image" />
      <div className={styles.animeInformationsContainer}>
        <p>{release}</p>
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
