import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid } from "@mui/system";
import { ButtonBase } from "@mui/material";
import { characterList } from "../content/CharacterList";
import { useRef } from "react";
// import HPBar from "./HPBar";

const bg_sr = require("../assets/common_icons/ui_common_bg_thumb_sr.png");
const bg_ssr = require("../assets/common_icons/ui_common_bg_thumb_ssr.png");
const IconPlus = require("../assets/ui/ui_common_icon_plus_white.png");
const IconPlusGrey = require("../assets/ui/ui_common_icon_plus_grey.png");

const theme = createTheme();
const useStyles = makeStyles(() => ({
  "@keyframes selectBorder": {
    "30%, 55%": {
      transform: "scale(0.9) translateX(-2.5%) translateY(-2.5%)",
    },
    "0%, 20%, 45%, 65%, 100%": {
      transform: "scale(0.98) translateX(-2.5%) translateY(-2.5%)",
    },
  },
  border: {
    opacity: 0,
    transform: "scale(1.2)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    animation: "$selectBorder 2s ease-in-out infinite",
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: "22px",
    zIndex: 1,
    transformOrigin: "center center",
    top: 0,
    left: 0,
  },
  selected: {
    border: "5px solid white",
    opacity: 1,
    transform: "scale(1)",
  },
  characterCardIcon: {
    border: "16px double black",
    borderRadius: "28px",
    backgroundColor: "grey",
    width: "136px",
    height: "fit-content",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  characterCardIconImage: {
    borderRadius: "10px",
    overflow: "hidden",
  },
  characterCardName: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 600,
    overflow: "hidden",
    fontFamily: "Antic Cezanne Pro DB, sans-serif",
    fontSize: "20px",
    fontStyle: "italic",
    paddingTop: "3px",
  },
  bgSR: {
    backgroundImage: `url(${bg_sr})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "126px",
    overflow: "hidden",
  },
  bgSSR: {
    backgroundImage: `url(${bg_ssr})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "126px",
    overflow: "hidden",
  },
  partyMembers: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px",
    background: "rgba(0, 0, 0, 0.7)",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  partyPixel: {
    height: "86px",
  },
  characterSelect: {
    height: "40vh",
    overflow: "auto",
    paddingTop: "10px",
    background: "rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    borderLeft: "5px solid rgba(0, 0, 0, 0.4)",
    borderRight: "5px solid rgba(0, 0, 0, 0.4)",
    borderBottom: "15px solid rgba(0, 0, 0, 0.9)",
  },
}));

const MobilePartyCharacterPanel = ({
  partyMembers,
  characterViewing,
  setCharacterViewing,
  selectedPosition,
  setSelectedPosition,
}) => {
  const classes = useStyles();
  const startAnimDate = useRef(Date.now());
  // const [animOffset, setAnimOffset] = useState();
  // const [selectedCharacter, setSelectedCharacter] = useState(characterList[0]);
  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.container}>
        <Grid container className={classes.partyMembers} spacing={4}>
          {[0, 1, 2].map((index) => (
            <Grid item className={classes.partyPixel} key={index} size={3}>
              <ButtonBase
                onClick={() => {
                  if (partyMembers.length < index) {
                  } else if (partyMembers.length <= index) {
                    setSelectedPosition(index);
                  } else {
                    setSelectedPosition(index);
                    setCharacterViewing(partyMembers[index]);
                  }
                }}
                style={{ height: "100%", width: "100%" }}
              >
                <div
                  className={`${classes.border}${
                    selectedPosition === index ? ` ${classes.selected}` : ""
                  }`}
                  style={{
                    animationDelay: `-${startAnimDate % 2000}ms`,
                    margin: "-3px",
                  }}
                />
                {partyMembers.length > index ? (
                  <img
                    src={partyMembers[index].pixels[0]}
                    alt={`${partyMembers[index].name}'s Pixel`}
                    height={90}
                    style={{ imageRendering: "pixelated" }}
                  />
                ) : (
                  <Box
                    style={{
                      border: `${
                        partyMembers.length >= index
                          ? "4px solid grey"
                          : "4px solid #333"
                      }`,
                      borderRadius: "20px",
                      height: "75%",
                      width: "68%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={
                        partyMembers.length >= index ? IconPlus : IconPlusGrey
                      }
                      alt="Select Character"
                    />
                  </Box>
                )}
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
        <Box className={classes.characterSelect}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="center"
            columnSpacing={2}
            rowSpacing={1}
          >
            {characterList.map((c) => (
              <ButtonBase onClick={() => setCharacterViewing(c)}>
                <Grid item className={classes.characterCardIcon} key={c.name}>
                  <div
                    className={`${classes.border}${
                      characterViewing.name === c.name
                        ? ` ${classes.selected}`
                        : ""
                    }`}
                    style={{ animationDelay: `-${startAnimDate % 2000}ms` }}
                  />
                  <div style={{ backgroundColor: "black" }}>
                    <div
                      className={c.rarity === 2 ? classes.bgSR : classes.bgSSR}
                    >
                      <img
                        src={c.portrait ?? null}
                        alt={c.name}
                        className={classes.characterCardIconImage}
                      />
                    </div>
                    <div className={classes.characterCardName}>Lv 60</div>
                  </div>
                  {/* <HPBar width="6em" /> */}
                </Grid>
              </ButtonBase>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default MobilePartyCharacterPanel;
