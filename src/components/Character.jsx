import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid } from "@mui/system";
import { useState } from "react";
import { ButtonBase } from "@mui/material";
import { characterList } from "../content/CharacterList";

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
    fontSize: "22px",
    padding: "20px",
    borderRadius: "15px",
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

const Character = () => {
  const classes = useStyles();
  const [currentCharacter, setCurrentCharacter] = useState(characterList[0]);
  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="flex-start" columnSpacing={2} rowSpacing={1}>
        {characterList.map((c) => (
          <ButtonBase onClick={() => setCurrentCharacter(c)}>
            <Grid item className={classes.characterCardIcon} key={c.name}>
              <div style={{ backgroundColor: "black" }}>
                <img src={c.icon} alt={c.name} className={classes.characterCardIconImage} />
                <div className={classes.characterCardName}>{c.name.substring(0, 15)}</div>
              </div>
            </Grid>
          </ButtonBase>
        ))}
      </Grid>
      <Box className={classes.characterCardInfo}>
        <h2 className={classes.characterCardHeading}>Character card: {currentCharacter.name}</h2>
        <Box sx={{ backgroundImage: `url(${currentCharacter.card})` }} className={classes.characterCardPicture} />
        {currentCharacter.info.map((i) => (
          <>{i}<br /></>
        ))}
      </Box>
    </ThemeProvider>
  )
};
export default Character;
