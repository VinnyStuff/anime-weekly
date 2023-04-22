import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "../../styles/EmptyStateCard.module.css";

export default function Favorites({ props }) {
  return (
    <>
      <div>
        <Card className={styles.card}>
          <div className={styles.imageContainer}>
            <img
            className={styles.image}
              src="/images/empty.png"
              alt=""
            />
          </div>
          <div className={styles.textContainer}>
            <Typography color="text.primary" variant="h5">
              No Favorites Animes
            </Typography>
            <Typography color="text.secondary">
              Add some anime to your favorites section
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "70%", mt: "20px", borderRadius: "20px" }}
            >
              See Animes
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
