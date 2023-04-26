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

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function SideBar({animes, currentTheme, localStorageAnimes, getCurrentTab, onThemeChange, clearFavorites}) {
  const [currentTab, setCurrentTab] = useState("Today");

  function Tab(props){
    const { children, onClick, iconInactive, iconActive, version,...other } = props;

    return(
    <>
      <div className={`${styles.tab} ${currentTab === children ? styles.tabActive : ''}`} onClick={() => setCurrentTab(children)}>
        <Icon className={styles.iconTab} component={currentTab === children ? iconActive : iconInactive} sx={{color: currentTab === children && version === 'mobile' ? 'background.paper': ''}}/>
        <Typography className={styles.textTab} variant="subtitle1" sx={{mt: '2px', fontWeight: currentTab === children ? 'bold' : '', color: currentTab === children && version === 'mobile' ? 'background.paper': ''}}>{children}</Typography>
        <div className={styles.tabOverlay}></div>
      </div>
    </>
    );
  }

  Tab.propTypes = {
    children: PropTypes.node,
    iconInactive: PropTypes.object,
    iconActive: PropTypes.object,
    version: PropTypes.string,
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
      <Paper className={styles.sideBarDesktopContainer}>
        <div className={styles.iconsContainer}>
          <IconButton type="button" sx={{ p: "10px", ml: "5px" }} onClick={handleClick}>
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
            <MenuItem onClick={() => {clearFavorites(); handleClose() }}>
              <ListItemIcon>
                <DeleteIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Clear Favorites</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {onThemeChange(); handleClose() }}>
              <ListItemIcon>
                  <DarkModeIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Appearance: {currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}</ListItemText>
            </MenuItem>
          </Menu>
          <img
            className={styles.logo}
            src={currentTheme === 'light' ? '/images/logo-light-mode.png' : '/images/logo-dark-mode.png'}
            alt="Anime Week"
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Tab iconInactive={WatchLaterOutlinedIcon} iconActive={WatchLaterIcon}>Today</Tab>
          <Tab iconInactive={DateRangeOutlinedIcon} iconActive={DateRangeIcon}>All Week</Tab>
          <Tab iconInactive={FavoriteBorderIcon} iconActive={FavoriteIcon}>Favorites</Tab>
          <Divider sx={{mt: '10px'}}/>
        </div>
        <div className={styles.favoritesQuickViewContainer}>
          <Paper sx={{position: 'sticky', top: '0', boxShadow: 'none', zIndex: '99'}}>
            <Typography variant="subtitle1" sx={{ml: '12px'}}>Favorites quick view</Typography>
          </Paper>

          {localStorageAnimes ? (
            <>
              {localStorageAnimes.map((anime) =>(
              <div className={styles.favoritedAnimeCard} key={anime.title}>
                <img src={anime.images.jpg.large_image_url} alt="Anime Image" className={styles.favoritedAnimeCardImage}/>
                <Typography variant="subtitle1" className={styles.favoritedAnimeCardTitle}>{anime.title}</Typography>
                <div className={styles.animeOverlay}></div>
              </div>
              ))}
            </>
          ) :  (
            <Typography variant="subtitle2" sx={{textAlign: 'center', pt: '10px'}}>No animes in Favorites</Typography>
          )}

        </div>
      </Paper>

      <div className={styles.sideBarMobileContainer}>
        <div className={styles.buttonsMobileContainer}>
          <Tab iconInactive={WatchLaterOutlinedIcon} iconActive={WatchLaterIcon} version={'mobile'}>Today</Tab>
          <Tab iconInactive={DateRangeOutlinedIcon} iconActive={DateRangeIcon} version={'mobile'}>All Week</Tab>
          <Tab iconInactive={FavoriteBorderIcon} iconActive={FavoriteIcon} version={'mobile'}>Favorites</Tab>
        </div>
      </div>
    </>
  );
}
