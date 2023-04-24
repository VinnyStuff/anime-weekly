import React, { useState, useEffect } from "react";
import styles from "../../styles/SideBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
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

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function SideBar({props, getCurrentTab, changeThemeClick}) {
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

  //MUI material
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //--

  return (
    <>
      <Paper className={styles.sideBarContainer}>
        <div className={styles.iconsContainer}>
          <IconButton type="button" sx={{ p: "10px", ml: "5px", mt: '16px' }} onClick={handleClick}>
            <MenuIcon sx={{ height: "26px", width: "26px" }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => {localStorage.clear(); handleClose() }}>
              <ListItemIcon>
                <DeleteIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Clear Favorites</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {changeThemeClick(); handleClose() }}>
              <ListItemIcon>
                {props.currentTheme === 'light' ? (
                  <DarkModeIcon fontSize="medium" />
                ) :  (
                  <LightModeIcon fontSize="medium" />
                )}
              </ListItemIcon>
              <ListItemText>Change to {props.currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</ListItemText>
            </MenuItem>
          </Menu>
          <img
            className={styles.logo}
            src={props.currentTheme === 'light' ? '/images/logo-light-mode.png' : '/images/logo-dark-mode.png'}
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

          {props.localStorageAnimes.map((anime) =>(
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
