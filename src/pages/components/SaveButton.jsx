import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton, Paper } from '@mui/material'
import { useState, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SaveButton({anime}) {
    const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
    const [openInfoMessage, setOpenInfoMessage] = useState(false);
    const [openErrorMessage, setOpenErrorMessage] = useState(false);

    const handleClickSucess = () => {
        setOpenSuccessMessage(true);
    };
    const handleClickInfo = () => {
        setOpenInfoMessage(true);
    };    
    const handleClickError = () => {
        setOpenErrorMessage(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSuccessMessage(false);
      setOpenInfoMessage(false)
      setOpenErrorMessage(false);
    };


    const [animeSaved, setAnimeSaved] = useState(localStorage.getItem(anime.title));

    function saveAnime(){
        try{
            if (typeof window !== 'undefined' && window.localStorage) {
                
                handleClose();

                if (localStorage.getItem(anime.title)){
                    localStorage.removeItem(anime.title);
                    setAnimeSaved(false);
                    handleClickInfo();
                }
                else{
                    localStorage.setItem(anime.title, "Anime Title");
                    setAnimeSaved(true);
                    handleClickSucess();
                }
            }
        }
        catch{
            handleClickError();
        }
    }

    return (
      <>
        <Paper sx={{borderRadius: '100%'}}>
            <IconButton onClick={() => saveAnime()} color='#ED4956'>
                {   animeSaved ? (
                    <FavoriteIcon sx={{ color: '#ED4956' }}/>
                ) : (
                    <FavoriteBorderIcon/>
                )}
            </IconButton>
        </Paper>

        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSuccessMessage} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Anime has been added to favorites!
                </Alert>
            </Snackbar>

            <Snackbar open={openInfoMessage} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}>
                <Alert onClose={handleClose} severity="info">Anime has been removed from favorites!</Alert>
            </Snackbar>

            <Snackbar open={openErrorMessage} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}>
                <Alert onClose={handleClose} severity="error">Oops! Something went wrong. Please try again later.</Alert>
            </Snackbar>
        </Stack>
      </>
    );
  }