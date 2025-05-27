import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid } from "@mui/system";
import { useState } from "react";
import { Button, ButtonBase, Dialog, IconButton } from "@mui/material";
import { tensionCardList } from "../content/TensionCardList";
import TensionCardExpanded from "./TensionCardExpanded";
import { closeButton } from "../vars/Icons";

const IconRarity = require("../assets/common_icons/ui_common_icon_rarity.png");
const IconTension0 = require("../assets/common_icons/ui_common_icon_tensionlevel_0.png");
const IconTension1 = require("../assets/common_icons/ui_common_icon_tensionlevel_1.png");
const IconTension2 = require("../assets/common_icons/ui_common_icon_tensionlevel_2.png");
const IconTensionEx = require("../assets/common_icons/ui_common_icon_tensionlevel_ex.png");
const IconTargetAll = require("../assets/tension_misc/ui_tension_card_effect_icon_00001.png");
const IconTargetUnmet = require("../assets/tension_misc/ui_tension_card_effect_icon_00002.png");
const IconTargetMet = require("../assets/tension_misc/ui_tension_card_effect_icon_00003.png");
const IconTargetSpecial = require("../assets/tension_misc/ui_tension_card_effect_icon_00004.png");
const ButtonBg = require("../assets/ui/button_story.png");

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  tensionCardIcon: {
    border: "10px double black",
    borderRadius: "20px",
    backgroundColor: "grey",
  },
  tensionCardIconImage: {
    borderRadius: "10px",
    borderBottomRightRadius: 0,
    height: "15vh",
  },
  tensionCardName: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 600,
    overflow: "hidden",
    fontFamily: "Antic Cezanne Pro DB, sans-serif",
    fontSize: "12px",
  },
  tensionCardInfo: {
    background: "rgba(0, 0, 0, 0.6)",
    color: "white",
    textAlign: "left",
    fontWeight: 600,
    fontSize: "16px",
    padding: "10px",
    borderRadius: "15px",
    overflow: "auto",
  },
  tensionCardHeading: {
    fontStyle: "italic",
    fontWeight: 800,
    margin: 0,
  },
  tensionCardViewName: {
    fontSize: "18px",
    fontWeight: "800",
    fontStyle: "italic",
    borderRadius: "10px",
    padding: "5px",
    paddingLeft: "20px",
    position: "relative",
    bgcolor: "black",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: "8px",
      backgroundColor: "#aaaaaa",
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  tensionCardDetails: {
    fontStyle: "italic",
    background: "black",
    padding: "3px",
    borderRadius: "50px",
  },
  tensionLevel: {
    position: "absolute",
    top: "12px",
    left: 0,
  },
  tensionType: {
    position: "absolute",
    bottom: "30px",
    left: "10px",
    backgroundColor: "black",
    height: "30px",
    width: "30px",
    borderTopRightRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fixedWidthIcon: {
    display: "inline-block",
    width: "40px",
    textAlign: "center",
    verticalAlign: "middle",
    paddingRight: "10px",
  },
  styledButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    transition: "transform 0.5s ease",
    "&:active": {
      transform: "scale(0.8)",
    }
  },
}));

const MobileTensionCards = () => {
  const classes = useStyles();
  const [currentCard, setCurrentCard] = useState(tensionCardList[0]);
  const [showExpandedCard, setShowExpandedCard] = useState(false);
  const [showCard, setShowCard] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="flex-start" columnSpacing={2} rowSpacing={1} style={{ overflow: "auto", height: "80vh" }}>
        {tensionCardList.map((c) => (
          <ButtonBase onClick={() => {
            setCurrentCard(c);
            setShowCard(true);
          }}>
            <Grid item className={classes.tensionCardIcon} key={c.name}>
              <div style={{ backgroundColor: "black" }}>
                <img src={c.icon} alt={c.name} className={classes.tensionCardIconImage} />
                {c.tensionPhase === 0 && <img src={IconTension0} alt="Tension Level" className={classes.tensionLevel} />}
                {c.tensionPhase === 1 && <img src={IconTension1} alt="Tension Level" className={classes.tensionLevel} />}
                {c.tensionPhase === 2 && <img src={IconTension2} alt="Tension Level" className={classes.tensionLevel} />}
                {c.tensionPhase === 3 && <img src={IconTensionEx} alt="Tension Level" className={classes.tensionLevel} />}
                <div className={classes.tensionType}>
                  <img src={c.type} alt="Tension Type" height={26} />
                </div>
                <div className={classes.tensionCardName}>{c.name.substring(0, 10)}</div>
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
        <Box style={{ overflow: "hidden", height: "85vh", position: "sticky", top: 0, }}>
          <Box className={classes.tensionCardInfo} height="65vh">
            <Box className={classes.tensionCardViewName}>
              {currentCard.name}
              <IconButton onClick={() => setShowCard(false)} style={{ alignSelf: "flex-end", marginLeft: "auto", }}>
                <img src={closeButton} alt="Close Info" height={36} />
              </IconButton>
            </Box>
            <Box className={classes.tensionCardDetails}>
              <span style={{ paddingLeft: "20px" }}>
                Rarity
              </span>
              <span style={{ float: "right" }}>
                {[...Array(currentCard.rarity)].map((e, i) => <img key={i} src={IconRarity} alt="Rarity" />)}
              </span>
            </Box>
            <br />
            <Box className={classes.tensionCardViewName}>
              Effect Details
            </Box>
            <Box className={classes.tensionCardDetails}>
              <span className={classes.fixedWidthIcon}>
                {currentCard.tensionPhase === 0 && <img src={IconTension0} alt="Tension Level" height={24} />}
                {currentCard.tensionPhase === 1 && <img src={IconTension1} alt="Tension Level" height={24} />}
                {currentCard.tensionPhase === 2 && <img src={IconTension2} alt="Tension Level" height={24} />}
                {currentCard.tensionPhase === 3 && <img src={IconTensionEx} alt="Tension Level" height={24} />}
              </span>
              Tension needed to activate effect: Phase {currentCard.tensionPhase}
            </Box>
            <Box className={classes.tensionCardDetails}>
              <span className={classes.fixedWidthIcon}>
                {currentCard.effectTarget === "All" && <img src={IconTargetAll} alt="Effect Target" height={24} />}
                {currentCard.effectTarget === "Met" && <img src={IconTargetMet} alt="Effect Target" height={24} />}
                {currentCard.effectTarget === "Unmet" && <img src={IconTargetUnmet} alt="Effect Target" height={24} />}
                {currentCard.effectTarget === "Special" && <img src={IconTargetSpecial} alt="Effect Target" height={24} />}
              </span>
              Effect Target:&nbsp;
              {currentCard.effectTarget === "All" && "All Party Members"}
              {currentCard.effectTarget === "Met" && "Characters: Conditions Met"}
              {currentCard.effectTarget === "Unmet" && "Characters: Conditions Unmet"}
              {currentCard.effectTarget === "Special" && "Special Condition"}
            </Box>
            {currentCard.effect.map((i) => (
              <>{i}<br /></>
            ))}
          </Box>
          <Box style={{ textAlign: "center" }}>
            <Button className={classes.styledButton} disableRipple onClick={() => setShowExpandedCard(true)}>
              <img src={ButtonBg} alt="Story" height={40} />
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog open={showExpandedCard} onClose={() => setShowExpandedCard(false)} slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: "85vw",
            height: "85vh",
            maxWidth: "none",
            background: "transparent",
            color: "white",
            overflow: "visible",
          }
        }
      }}>
        <TensionCardExpanded currentCard={currentCard} setShowExpandedCard={setShowExpandedCard} />
      </Dialog>
    </ThemeProvider>
  )
};
export default MobileTensionCards;
