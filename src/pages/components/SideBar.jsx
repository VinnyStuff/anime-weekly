import React, { useState, useEffect } from "react";
import styles from "../../styles/SideBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../images/logo.png";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon'
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';

import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';

import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';

export default function SideBar({props , getCurrentTab}) {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    setAnimes(props.data);
  }, [props]);

  const [currentTab, setCurrentTab] = useState("Today");

  function Tab(props){
    const { children, onClick, iconInactive, iconActive,...other } = props;

    return(
    <>
      <div className={`${styles.tab} ${currentTab === children ? styles.tabActive : ''}`} onClick={() => setCurrentTab(children)}>
        <Icon component={currentTab === children ? iconActive : iconInactive} sx={{ml: '15px'}} />
        <Typography variant="subtitle1" sx={{ml: '25px', fontWeight: currentTab === children ? 'bold' : ''}}>{children}</Typography>
        <div className={styles.tabOverlay}></div>
      </div>
    </>
    );
  }

  Tab.propTypes = {
    children: PropTypes.node,
    iconInactive: PropTypes.object,
    iconActive: PropTypes.object,
  };

  useEffect(() => {
    getCurrentTab(currentTab)
  }, [currentTab]);

  return (
    <>
      <Paper className={styles.sideBarContainer}>
        <div className={styles.iconsContainer}>
          <IconButton type="button" sx={{ p: "10px", ml: "5px" }}>
            <MenuIcon sx={{ height: "26px", width: "26px" }} />
          </IconButton>
          <img
            className={styles.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
            alt="Anime Week"
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Tab iconInactive={WatchLaterOutlinedIcon} iconActive={WatchLaterIcon}>Today</Tab>
          <Tab iconInactive={DateRangeOutlinedIcon} iconActive={DateRangeIcon}>All Week</Tab>
          <Tab iconInactive={GradeOutlinedIcon} iconActive={GradeIcon}>Favorites</Tab>
        </div>
        <Divider sx={{mt: '10px'}}/>
        <div className={styles.favoritesQuickViewContainer}>
          <Paper sx={{position: 'sticky', top: '0', boxShadow: 'none', zIndex: '99'}}>
            <Typography variant="subtitle1" sx={{ml: '12px'}}>Favorites quick view</Typography>
          </Paper>

          {animes.map((anime) =>(
              <div className={styles.favoritedAnimeCard} key={anime.title}>
                <img src={anime.images.jpg.large_image_url} alt="Anime Image" className={styles.favoritedAnimeCardImage}/>
                <Typography variant="subtitle1" className={styles.favoritedAnimeCardTitle}>{anime.title}</Typography>
                <div className={styles.overlay}></div>
              </div>
            ))}
        </div>
      </Paper>
    </>
  );
}
