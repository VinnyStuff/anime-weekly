import React, { useState, useEffect } from "react";
import animesPromise from "../api/animes";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";

export default function Layout({ children }) {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        animesPromise.then(result => {
        setAnimes(result);
        });
    }, []);

  return (
    <>
        <SearchBar/>
        <SideBar/>
        {children}
    </>
  );
}