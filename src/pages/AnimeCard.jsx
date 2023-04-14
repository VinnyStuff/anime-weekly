import React, { useState, useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SellIcon from "@mui/icons-material/Sell";

export default function AnimeCard({ animes, onValueEmit}) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(text);

    //console.log(animes.filter(anime => anime.title.toLowerCase().includes(text.toLowerCase())));
    //console.log(animes);

    onValueEmit(animes.filter(anime => anime.title.toLowerCase().includes(text.toLowerCase())));
  }, [text]);

  
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
          onClick={() =>  onValueEmit(animes)}
        />

        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {text}
    </>
  );
}