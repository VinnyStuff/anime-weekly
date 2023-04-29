import moment from "moment";

const delay = 1200;
let currentPage = 1;
const animes = [];

async function fetchSeasonData(page) {

  try {
    const response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`);
    const jsondata = await response.json();
    const apiData = jsondata.data

    for (let i = 0; i < apiData.length; i++) {
        apiData[i].release = getAnimesReleaseDate(apiData[i]);
        animes.push(apiData[i]);
    }

    if (jsondata.pagination.has_next_page) {
      currentPage++;
      await new Promise(resolve => setTimeout(resolve, delay));
      await fetchSeasonData(currentPage);
    }
  } catch (error) {
    console.error(error)
  }
}

async function fetchAnimes() {
  await fetchSeasonData(currentPage);
  //sideBar update favorites animes
  //side bar is a controller about everything in page
  return animes;
}

export default fetchAnimes();

function getAnimesReleaseDate(anime) {
  const weekday = anime.broadcast.day;
  const time = anime.broadcast.time;

  const releaseInTokyoTimeZone = moment(`${weekday} ${time}`, "dddd HH:mm"); 
  const simulcastInTokyoTimeZone = releaseInTokyoTimeZone.clone().add({ hours: 1 })
  const simulcastInBrazilTimeZone = simulcastInTokyoTimeZone.clone().subtract({ hours: 12 });
  const releaseInBrazilStreamings = simulcastInBrazilTimeZone.clone().add({ hours: 2 });

  return {
    release_tokyo: {
      day: releaseInTokyoTimeZone.format("dddd") + "s",
      hour: releaseInTokyoTimeZone.format("HH:mm")
    },
    simulcast_tokyo: {
      day: simulcastInTokyoTimeZone.format("dddd") + "s",
      hour: simulcastInTokyoTimeZone.format("HH:mm")
    },
    simulcast_brazil: {
      day: simulcastInBrazilTimeZone.format("dddd") + "s",
      hour: simulcastInBrazilTimeZone.format("HH:mm")
    },
    release_brazil_streamings: {
      day: releaseInBrazilStreamings.format("dddd") + "s",
      hour: releaseInBrazilStreamings.format("HH:mm")
    }
  }
}
