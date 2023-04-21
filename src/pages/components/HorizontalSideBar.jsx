import React, { useState, useEffect } from "react";
import styles from "../../styles/HorizontalSideBar.module.css";
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon'
import PropTypes from 'prop-types';

import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';

import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';

export default function HorizontalSideBar({props , getCurrentTab}) {
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
        <Icon className={styles.icon} component={currentTab === children ? iconActive : iconInactive}/>
        <Typography className={styles.title} variant="subtitle1" sx={{mt: '2px' , fontWeight: currentTab === children ? 'bold' : ''}}>{children}</Typography>
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
    <div className={styles.buttonsContainer}>
        <Tab iconInactive={WatchLaterOutlinedIcon} iconActive={WatchLaterIcon}>Today</Tab>
        <Tab iconInactive={DateRangeOutlinedIcon} iconActive={DateRangeIcon}>All Week</Tab>
        <Tab iconInactive={GradeOutlinedIcon} iconActive={GradeIcon}>Favorites</Tab>
    </div>
    </>
  );
}
