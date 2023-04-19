import React, { useState, useEffect } from "react";

import styles from "../../styles/AnimeCardExpand.module.css";

export default function AnimeCardExpand({ props }) {
  if (props.data.length >= 1) {
    console.log(props.data[1]);
    return (
        <>
          <div className={styles.animeCardExpand}>{props.data[0].title}</div>
        </>
      );
  }
}
