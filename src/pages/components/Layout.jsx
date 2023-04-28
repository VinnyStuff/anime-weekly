import React, { useState, useEffect } from "react";
import animesPromise from "../api/animes";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useSelector } from 'react-redux';
import {
  themeSelect,
} from '../../features/theme/themeSlice';

export default function Layout({ children }) {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    animesPromise.then((result) => {
      setAnimes(result);
    });
  }, []);

  const [selectTheme, setSelectTheme] = useState('light')
  const themeSlice = useSelector(themeSelect) //pass this directly in mode dont work
  useEffect(() => {
    setSelectTheme(themeSlice);
  }, [useSelector(themeSelect)]);

  const theme = createTheme({
    palette: {
      mode: selectTheme,
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchBar />
        <SideBar />
        {children}
      </ThemeProvider>
    </>
  );
}
