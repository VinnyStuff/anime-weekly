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
    const animes = data;
    const endOfTheDay = moment("00:00", "HH:mm");

    if (data.length > 1) {
      //tokyo time zone
      const releaseHourInTokyoTimeZone = moment(animes[0].broadcast.time,"HH:mm");
      const releaseDayInInTokyoTimeZone = animes[0].broadcast.day;

      const releaseHourSimulcastInTokyoTimeZone =
        releaseHourInTokyoTimeZone.add(1, "hour"); //simulcast in the rest of the world happens 1 hour after the episodes are released
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

      data[0].simulcast_tokyo_timezone = {
        day: releaseDaySimulcastInTokyoTimeZone,
        hour: releaseHourSimulcastInTokyoTimeZone.format("HH:mm"),
      };

      //america time zone - use simulcast hour from tokyo
      const releaseHourSimulcastInAmericaTimeZone = releaseHourSimulcastInTokyoTimeZone.subtract(12, "hour").add(2, "hour"); //it takes 2 hours to reach the streamings
      let releaseDaySimulcastInAmericaTimeZone = "";

      if (releaseHourSimulcastInAmericaTimeZone.isBefore(endOfTheDay)) {
        const currentDayOfWeek = releaseDayInInTokyoTimeZone;
        const currentDayIndex = weekDays.indexOf(currentDayOfWeek);

        const nextDayIndex = (currentDayIndex - 1) % weekDays.length;
        const nextDayOfWeek = weekDays[nextDayIndex];

        releaseDaySimulcastInAmericaTimeZone = nextDayOfWeek;
      } else {
        releaseDaySimulcastInAmericaTimeZone = releaseDayInInTokyoTimeZone;
      }

      //o simulcast acontece 1 hora depois de sair no japão, porem só chega 2 horas depois do simulcast nos streamings
      data[0].release_in_america_streamings = {
        day: releaseDaySimulcastInAmericaTimeZone,
        hour: releaseHourSimulcastInTokyoTimeZone.format("HH:mm"),
      };
      data[0].simulcast_america_timezone = {
        day: releaseDaySimulcastInAmericaTimeZone,
        hour: releaseHourSimulcastInTokyoTimeZone.subtract(2, "hour").format("HH:mm"),
      };

      console.log(data[0]);
    }
  }, [data]);

  return (
    <>
      {/* <SearchBar animes={data}/> */}

      <WeekAnimes animes={data} />
    </>
  );
}
