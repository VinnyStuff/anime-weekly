import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton, Paper } from '@mui/material'
import { useState, forwardRef, useEffect } from 'react';
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


    const [animeSaved, setAnimeSaved] = useState(); 

    useEffect(() =>{
        if (typeof window !== 'undefined' && window.localStorage) {
            setAnimeSaved(localStorage.getItem(anime.title)); //if anime is in localstorage change the style to saved when
        }
    }, []);

    function saveAnime(){
        try{
            if (typeof window !== 'undefined' && window.localStorage) {
                
                handleClose();

                if(localStorage.getItem(anime.title.toString(), JSON.stringify(anime))){
                    localStorage.removeItem(anime.title.toString());
                    setAnimeSaved(false);
                    handleClickInfo();
                }
                else{
                    localStorage.setItem(anime.title.toString(), JSON.stringify(anime))
                    setAnimeSaved(true);
                    handleClickSucess();
                }
            }
        }
        catch{
            handleClickError();
        }
        finally{
            const data = localStorage.getItem(anime.title.toString());
            console.log(JSON.parse(data));
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