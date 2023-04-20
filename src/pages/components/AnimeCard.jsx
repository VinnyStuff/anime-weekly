import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Skeleton from '@mui/material/Skeleton';

import styles from "../../styles/AnimeCard.module.css";

export default function AnimeCard({ anime }) {
  if (anime) {
    const image = anime.images.jpg.large_image_url;
    const title = anime.title;
    const genres = anime.genres;
    const rating = anime.score;
    const subtitle = anime.synopsis;
    const release = anime.release.release_in_brazil_streamings.day;

    return (
      <>
        <Card className={styles.animeCard}>
          <img className={styles.image} src={image} alt="current anime image" />
          <div className={styles.animeInformationsContainer}>
            <p>{release}</p>
            <Typography variant="h5" className={styles.title}>
              {title}
            </Typography>

            <div className={styles.genresContainer}>
              {genres.map((genre, index) => (
                <Typography color="text.secondary" key={genre.name}>
                  {genre.name}
                  {index !== genres.length - 1 ? ",\u00A0" : ""}
                </Typography>
              ))}
            </div>

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
      </>
    );
  }
  else{
    return (
      <>
        <Card className={styles.animeCard}>
          <div className={styles.imageContainer}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"100%"}
              animation="wave"
            />
          </div>
          <div className={styles.animeInformationsContainer}>
            <Typography variant="h5" className={styles.title}>
              <Skeleton animation="wave"/>
            </Typography>

            <div className={styles.ratingContainer}>
              <Skeleton width={125} sx={{ mr: 1 }} animation="wave" />
              <Skeleton width={30} animation="wave" />
            </div>

            <Typography>
              <Skeleton animation="wave"/>
              <Skeleton animation="wave"/>
            </Typography>
          </div>
        </Card>
      </>
    );
  }
}
