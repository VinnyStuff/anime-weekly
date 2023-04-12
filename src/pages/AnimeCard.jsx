import Button from "@mui/material/Button";
import React, { useState, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SellIcon from "@mui/icons-material/Sell";

import styles from "../styles/AnimeCard.module.css";

export default function AnimeCard({ onTextChange }) {
  const [text, setText] = useState("");

  useEffect(() => {
    onTextChange(text);
  }, [text, onTextChange]);

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
          onChange={(e) => setText(e.target.value)}
        />

        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}