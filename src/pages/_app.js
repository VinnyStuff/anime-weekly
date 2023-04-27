import React, { useState, useEffect, forwardRef } from "react";
import '@/styles/globals.css'
import Today from './components/Today'
import animesPromise from './api/animes'
import Layout from "./components/Layout";

export default function App({ Component, pageProps }) {

/*   const [animes, setAnimes] = useState([]);

  useEffect(() => {
    animesPromise.then(result => {
      setAnimes(result);
    });
  }, []);

  useEffect(() =>{
    if (animes.length > 0) {
      console.log(animes);
    }
  }, [animes]) */

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
