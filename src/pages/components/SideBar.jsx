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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import animesPromise from '../api/animes'
import { useRouter } from "next/router";


import { useSelector, useDispatch } from 'react-redux';
import {
  favoritesAnimes,
  updateFavorites,
  clearFavorites,
} from '../../features/favorites/favoritesSlice'
import {
  themeSelect,
  changeTheme,
} from '../../features/theme/themeSlice';

export default function SideBar() {
  const dispatch = useDispatch();

  const localStorageAnimes = useSelector(favoritesAnimes);
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    animesPromise.then(result => {
      setAnimes(result);
    });
    dispatch(updateFavorites());
  }, []);

  const [currentTab, setCurrentTab] = useState('Today')

  const router = useRouter()

  if(typeof window !== 'undefined'){

    const path = window.location.pathname;

    useEffect(() => { 
      if (path === '/') {
        setCurrentTab('Today');
      } 
      else if(path === '/today'){
        setCurrentTab('Today');
      }
      else if (path === '/all-week') {
        setCurrentTab('All Week');
      } 
      else if (path === '/favorites') {
        setCurrentTab('Favorites');
      }
    }, [path]);
  }

  function handleRouter(tab){

    setCurrentTab(tab)

    if(tab === 'Today'){
      router.push('/');
    }
    else if(tab === 'All Week'){
      router.push('/all-week');
    }
    else if(tab === 'Favorites'){
      router.push('/favorites');
    }
  }

  function Tab(props){
    const { children, onClick, iconInactive, iconActive,...other } = props;

    return(
    <>
      <div className={styles.tab} onClick={() => handleRouter(children)}>
          <div className={styles.iconContainer}>
            <Icon component={currentTab === children ? iconActive : iconInactive}/>
          </div>
          <Typography sx={{mt: '2px', whiteSpace: 'nowrap', fontWeight: currentTab === children ? 'bold' : '400' }}>{children}</Typography>
          <div className={styles.overlay} style={{ visibility: currentTab  === children ? 'visible' : 'normal'}}></div>
        </div>
    </>
    );
  }

  Tab.propTypes = {
    children: PropTypes.node,
    iconInactive: PropTypes.object,
    iconActive: PropTypes.object,
  };

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
      <div className={styles.sideBarContainer}>
        <div className={styles.menuContainer}>
            <IconButton type="button" sx={{ p: "10px", ml: "20px" }} onClick={handleClick}>
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
              <MenuItem onClick={() => {handleClose(); dispatch(clearFavorites());}}>
                <ListItemIcon>
                  <DeleteIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Clear Favorites</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => {dispatch(changeTheme()); handleClose()}}>
                <ListItemIcon>
                    <DarkModeIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Appearance: {useSelector(themeSelect) === 'dark' ?  'Dark mode': 'Light mode' }</ListItemText>
              </MenuItem>
            </Menu>
            <img
              src='/images/logo-light-mode.png'
              alt="Anime Week"
            />
          </div>

          <div className={styles.buttons}>
            <Tab iconInactive={WatchLaterOutlinedIcon} iconActive={WatchLaterIcon}>Today</Tab>
            <Tab iconInactive={DateRangeOutlinedIcon} iconActive={DateRangeIcon}>All Week</Tab>
            <Tab iconInactive={FavoriteBorderIcon} iconActive={FavoriteIcon}>Favorites</Tab>
            <Divider sx={{mt: '10px'}}/>
          </div>
            
          <div className={styles.favoritesQuickViewTextContainer}> 
            <Paper sx={{position: 'sticky', top: '0', boxShadow: 'none', zIndex: '99', pt: '8px', pb: '3px', pl: '10px', borderRadius: '0'}}>
              <Typography variant="subtitle1" sx={{ml: '12px'}}>Favorites quick view</Typography>
            </Paper>
          </div>

          <div className={styles.favoritedAnimeCardContainer}>
            {animes ? (
              <>
                {localStorageAnimes.map((anime) =>(
                  <FavoritedAnimeCard anime={anime} key={anime.title}/>
                ))}
              </>
            ) :  (
              <Typography variant="subtitle2" sx={{textAlign: 'center', pt: '10px'}}>No animes in Favorites</Typography>
            )}
          </div>
      </div>
    </>
  );
}


function FavoritedAnimeCard({anime}){

  const title = anime.title
  const image = anime.images.jpg.large_image_url;

  return (
    <>
      <div className={styles.favoritedAnimeCard}>
        <img src={image} alt="Anime Image"/>
        <Typography sx={{ml: '8px', mr: '8px', lineHeight: '20px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '4', lineClamp: '4', WebkitBoxOrient: 'vertical'}} className={styles.favoritedAnimeCardTitle}>{title}</Typography>
        <div className={styles.overlay}></div>
      </div>
    </>
  );
}