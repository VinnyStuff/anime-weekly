import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import WeekAnimes from "./components/WeekAnimes.jsx";
import TodayAnimes from "./components/TodayAnimes.jsx";
import SideBar from "./components/SideBar.jsx";
import moment from "moment";

import styles from "../styles/Index.module.css";

export default function Index() {
  const weekDays = [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
  ];
  const today = weekDays[new Date().getDay()];
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.jikan.moe/v4/seasons/now?limit=25&page=1"
      );
      const jsonData = await response.json();
      const apiData = jsonData.data;

      //putting my values
      for (let i = 0; i < apiData.length; i++) {
        apiData[i].release = getAnimesReleaseDate(apiData[i], weekDays);
      }
      //console.log(apiData);
      setData(apiData);
    }

    fetchData();
  }, []);

  const getAnimeCardClick = (anime) => {
    //console.log(anime);
  };

  const [currentTab, setCurrentTab] = useState("Today");

  const tabActive = {
    backgroundColor: "#0f0f0f",
    color: "#F2F2F2",
    transition: "none", // remove a transição
    ":hover": {
      backgroundColor: "#3C3C3C",
    },
  };
  const tabInactive = {
    backgroundColor: "#F2F2F2",
    color: "#0f0f0f",
    transition: "none", // remove a transição
    ":hover": {
      backgroundColor: "#E5E5E5",
    },
  };

  return (
    <>
      <div className={styles.sideBarContainer}>
        <SideBar props={{ data }} getCurrentTab={(e) => setCurrentTab(e)} />
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.navbarContainer}>
          <SearchBar props={{ data }} />
        </div>

        {/*  <div className={styles.tabsContainer}>
          <Button className={styles.tabs} sx={{...{textTransform: 'none'}, ...currentTab === "Today" ? tabActive : tabInactive}} variant="contained" onClick={() => setCurrentTab("Today")}>Today</Button>
          <Button className={styles.tabs} sx={{...{textTransform: 'none'}, ...currentTab === "All Week" ? tabActive : tabInactive}} variant="contained" onClick={() => setCurrentTab("All Week")}>All Week</Button>
          <Button className={styles.tabs} sx={{...{textTransform: 'none'}, ...currentTab === "Favorites" ? tabActive : tabInactive}} variant="contained" onClick={() => setCurrentTab("Favorites")}>Favorites</Button>
        </div> */}

        <div className={styles.contentContainer}>
          {currentTab === "Today" ? (
            <TodayAnimes props={{ data, today }} />
          ) : currentTab === "All Week" ? (
            <WeekAnimes props={{ data, weekDays }} />
          ) : (
            <div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

function getAnimesReleaseDate(anime, weekDays) {
  const release = {};

  const endOfTheDay = moment("00:00", "HH:mm");

  release.release_in_tokyo_timezone = {
    day: anime.broadcast.day,
    hour: anime.broadcast.time,
  };

  //tokyo time zone
  const releaseHourInTokyoTimeZone = moment(anime.broadcast.time, "HH:mm");
  const releaseDayInInTokyoTimeZone = anime.broadcast.day;

  const releaseHourSimulcastInTokyoTimeZone = releaseHourInTokyoTimeZone.add(
    1,
    "hour"
  ); //simulcast in the rest of the world happens 1 hour after the episodes are released
  let releaseDaySimulcastInTokyoTimeZone = "";

  if (releaseHourSimulcastInTokyoTimeZone.isAfter(endOfTheDay)) {
    const currentDayOfWeek = releaseDayInInTokyoTimeZone;
    const currentDayIndex = weekDays.indexOf(currentDayOfWeek);

    const nextDayIndex = (currentDayIndex + 1) % weekDays.length;
    const nextDayOfWeek = weekDays[nextDayIndex];

    releaseDaySimulcastInTokyoTimeZone = nextDayOfWeek;
  } else {
    releaseDaySimulcastInTokyoTimeZone = releaseDayInInTokyoTimeZone;
  }

  release.simulcast_tokyo_timezone = {
    day: releaseDaySimulcastInTokyoTimeZone,
    hour: releaseHourSimulcastInTokyoTimeZone.format("HH:mm"),
  };

  //Brazil time zone - use simulcast hour from tokyo
  const releaseHourSimulcastInBrazilTimeZone =
    releaseHourSimulcastInTokyoTimeZone.subtract(12, "hour").add(2, "hour"); //it takes 2 hours to reach the streamings
  let releaseDaySimulcastInBrazilTimeZone = "";

  if (releaseHourSimulcastInBrazilTimeZone.isBefore(endOfTheDay)) {
    const currentDayOfWeek = releaseDayInInTokyoTimeZone;
    const currentDayIndex = weekDays.indexOf(currentDayOfWeek);

    const nextDayIndex = (currentDayIndex - 1) % weekDays.length;
    const nextDayOfWeek = weekDays[nextDayIndex];

    releaseDaySimulcastInBrazilTimeZone = nextDayOfWeek;
  } else {
    releaseDaySimulcastInBrazilTimeZone = releaseDayInInTokyoTimeZone;
  }

  //o simulcast acontece 1 hora depois de sair no japão, porem só chega 2 horas depois do simulcast nos streamings
  release.release_in_brazil_streamings = {
    day: releaseDaySimulcastInBrazilTimeZone,
    hour: releaseHourSimulcastInTokyoTimeZone.format("HH:mm"),
  };
  release.simulcast_brazil_timezone = {
    day: releaseDaySimulcastInBrazilTimeZone,
    hour: releaseHourSimulcastInTokyoTimeZone
      .subtract(2, "hour")
      .format("HH:mm"),
  };

  return release;
}
