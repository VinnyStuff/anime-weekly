import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
  memo,
} from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import SearchBar from "./components/SearchBar.jsx";
import WeekAnimes from "./components/WeekAnimes.jsx";
import moment from "moment";

export default function Home() {
  const weekDays = [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.jikan.moe/v4/seasons/now?limit=25&page=1"
      );
      const jsonData = await response.json();
      //console.log(jsonData.data);
      setData(jsonData.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      data[i].release = getAnimesReleaseDate(data[i], weekDays);
    }     
  }, [data]);

  return (
    <>
      {/* <SearchBar animes={{data}}/> */}

      <WeekAnimes props={{data, weekDays}} />
    </>
  );
}

function getAnimesReleaseDate(anime, weekDays){
  const release = {};

  const endOfTheDay = moment("00:00", "HH:mm");
  
  release.release_in_tokyo_timezone = {
    day: anime.broadcast.day,
    hour: anime.broadcast.time,
  };

  //tokyo time zone
  const releaseHourInTokyoTimeZone = moment(anime.broadcast.time,"HH:mm");
  const releaseDayInInTokyoTimeZone = anime.broadcast.day;

  const releaseHourSimulcastInTokyoTimeZone = releaseHourInTokyoTimeZone.add(1, "hour"); //simulcast in the rest of the world happens 1 hour after the episodes are released
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
  const releaseHourSimulcastInBrazilTimeZone = releaseHourSimulcastInTokyoTimeZone.subtract(12, "hour").add(2, "hour"); //it takes 2 hours to reach the streamings
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
    hour: releaseHourSimulcastInTokyoTimeZone.subtract(2, "hour").format("HH:mm"),
  };

  return release;
}