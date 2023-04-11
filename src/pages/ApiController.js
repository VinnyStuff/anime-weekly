async function getPageData(pageIndex){
  try {
    const page = await fetch('https://api.jikan.moe/v4/seasons/now?limit=25&page=' + pageIndex) //current season
    //const page = await fetch('https://api.jikan.moe/v4/seasons/2023/winter?limit=25&page=' + pageIndex) //winter
    const pageData = await page.json();
    //console.log(pageData);
  
    return pageData.data;

  } catch (error) {
    console.error(error);
  }
}

async function getAllPagesData(){
  const currentSeasonAnimes = []
  const pages = []
  let i = 0;

  let page = await getPageData(i + 1)
  pages.push(page);

  while(page && page.length !== 0){
    //console.log(i);
    //console.log(pages);
    i++;
    page = await getPageData(i + 1);

    if(page && page.length !== 0){
      pages.push(page);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    else{
      break
    }
  }

  return pages;
}

async function getAnimesDayInWeek(animes){
  const weekDays = [  
  { name: "Sundays", animes: [] },
  { name: "Mondays", animes: [] },
  { name: "Tuesdays", animes: [] },
  { name: "Wednesdays", animes: [] },
  { name: "Thursdays", animes: [] },
  { name: "Fridays", animes: [] },
  { name: "Saturdays", animes: [] }
  ]; //in japan
  //console.log(weekDays[0].name)

  for (let i = 0; i < animes.length; i++) {
    for (let x = 0; x < weekDays.length; x++) {
      if (animes[i].broadcast.day === weekDays[x].name){
        if(weekDays[x].name === "Sundays"){
          weekDays[6].animes.push(animes[i]);
        }
        else{
          weekDays[x - 1].animes.push(animes[i]);
        }
      }
    } 
  }
  //console.log(weekDays)

  return weekDays;
}

export async function getCurrentAnimesSeason(){ //já retorna para o componente os animes divididos em cada dia da semana
  // Asynchronously retrieves all anime data for the current season using getAllPagesData function, and getAllPagesData use getPageData function to get each page
  const allPagesAnimes = await getAllPagesData()
  //allPagesAnimes = [page1, page2, page3...]

  // concatenating all arrays in the resulting "allPagesAnimes" array into a single array called "currentSeasonAnimes"
  // Uses the reduce() method to concatenate all arrays into a single array
  const currentSeasonAnimes = allPagesAnimes.reduce((acc, cur) => acc.concat(cur), []);

  //return the all animes from this season
  return getAnimesDayInWeek(currentSeasonAnimes);
}