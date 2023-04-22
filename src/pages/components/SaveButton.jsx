import React, { useState, useEffect } from "react";

export default function SaveButton({props}) {
    function saveAnime(){
        if (localStorage.getItem(props.anime.title)){
            localStorage.removeItem(props.anime.title);
        }
        else{
            localStorage.setItem(props.anime.title, "Anime Title");
        }
    }

    return (
      <>
      <button onClick={() => saveAnime()}>save</button>
      </>
    );
  }