import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid } from "@mui/system";
import { useState } from "react";
import { ButtonBase, Dialog, IconButton } from "@mui/material";
import { characterList } from "../content/CharacterList";
import { closeButton } from "../vars/Icons";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  characterCardIcon: {
    border: "10px double black",
    borderRadius: "20px",
    backgroundColor: "grey",
    width: "156px",
  },
  characterCardIconImage: {
    borderRadius: "10px",
    height: "176px",
  },
  characterCardName: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 600,
    overflow: "hidden",
    fontFamily: "Antic Cezanne Pro DB, sans-serif",
    fontSize: "16px",
  },
  characterCardInfo: {
    background: "rgba(0, 0, 0, 0.8)",
    color: "white",
    textAlign: "left",
    fontWeight: 600,
    fontSize: "16px",
    padding: "20px",
  },
  characterCardPicture: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    width: "100%",
    aspectRatio: "16 / 7",
    marginTop: "20px",
    marginBottom: "20px",
  },
  characterCardHeading: {
    fontStyle: "italic",
    fontWeight: 800,
    margin: 0,
  }
}));

const MobileCharacter = () => {
  const classes = useStyles();
  const [currentCharacter, setCurrentCharacter] = useState(characterList[0]);
  const [showCard, setShowCard] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="flex-start" justifyContent="space-evenly" columnSpacing={1} rowSpacing={0}>
        {characterList.map((c) => (
          <ButtonBase onClick={() => {
            setCurrentCharacter(c);
            setShowCard(true);
          }}>
            <Grid item className={classes.characterCardIcon} key={c.name}>
              <div style={{ backgroundColor: "black" }}>
                <img src={c.icon} alt={c.name} className={classes.characterCardIconImage} />
                <div className={classes.characterCardName}>{c.name.substring(0, 15)}</div>
              </div>
            </Grid>
          </ButtonBase>
        ))}
      </Grid>
      <Dialog open={showCard} slotProps={{
        paper: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "15px"
          }
        }
      }}>
        <Box className={classes.characterCardInfo}>
          <span className={classes.characterCardHeading}>Character card:</span>
          <IconButton onClick={() => setShowCard(false)} style={{ float: "right" }}>
            <img src={closeButton} alt="Close Info" height={36} />
          </IconButton>
          <h3 className={classes.characterCardHeading}>{currentCharacter.name}</h3>
          <Box sx={{ backgroundImage: `url(${currentCharacter.card})` }} className={classes.characterCardPicture} />
          {currentCharacter.info.map((i) => (
            <>{i}<br /></>
          ))}
        </Box>
    </Dialog>
    </ThemeProvider>
  )
};
export default MobileCharacter;
