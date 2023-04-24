import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import SaveButton from './SaveButton'

import styles from "../../styles/AnimeCard.module.css";

export default function AnimeCard({ anime, onClick }) {
  if (anime) {
    const image = anime.images.jpg.large_image_url;
    const title = anime.title;
    const genres = anime.genres;
    const rating = anime.score;

    return (
      <>
        <Card className={styles.animeCard} onClick={onClick}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={image}
              alt="current anime image"
            />
            <div className={styles.saveButton} >
              <SaveButton anime={anime}/>
            </div>
          </div>
          <div className={styles.animeInformationsContainer}>
            <Typography color="text.primary" variant="h5" className={styles.title}>
              {title}
            </Typography>

            <Typography color="text.secondary" sx={{mr: '8px'}}>
              {genres.map((genre, index) => (
                 <span key={genre.name}>
                  {genre.name}
                  {index !== genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </Typography>
          </div>

          <div className={styles.overlay}></div>
        </Card>
      </>
    );
  } else {
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
            <Typography variant="h5">
              <Skeleton animation="wave" />
            </Typography>

            <Typography color="text.secondary">
              <Skeleton animation="wave" />
            </Typography>
          </div>
        </Card>
      </>
    );
  }
}
