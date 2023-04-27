import React, { useState, useEffect } from "react";
import animesPromise from "../api/animes";
import SideBar from "./SideBar";

export default function Layout({ children }) {

    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        animesPromise.then(result => {
        setAnimes(result);
        });
    }, []);

    useEffect(() =>{
        if (animes.length > 0) {
        console.log(animes);
        }
    }, [animes])

  return (
    <>
        <SideBar/>
        {children}
    </>
  );
}