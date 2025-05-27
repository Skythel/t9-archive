import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { closeButton } from "../vars/Icons";
import { closeButtonStyled } from "../vars/Styles";

const IconTensionHeadingArrow = require("../assets/tension_misc/tension_heading_arrow.png");

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  closeButtonStyled,
  tensionCardView: {
    background: "black !important",
    color: "white !important",
    borderRadius: "35px !important",
    width: "70vw",
  },
  tensionCardHeading: {
    padding: "20px",
    paddingBottom: "10px",
    lineHeight: "1.1",
    display: "flex",
    alignItems: "center",
  },
  cardViewImg: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    aspectRatio: "16 / 5",
    width: "match-parent",
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
  },
  footerCard: {
    gridTemplateColumns: "2fr 4fr 6fr",
    display: "grid",
    fontWeight: 600,
    fontSize: "14px",
    paddingBottom: "10px",
  },
  footerL: {
    borderRight: "1px solid white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerC: {
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
  },
  footerR: {
    borderLeft: "1px solid white",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    paddingTop: "3px",
    fontSize: "14px",
  },
}));

const MobileTensionCardView = ({ currentCard, setShowCardView }) => {
  const classes = useStyles();
  const sizeOfTagline = currentCard.tagline.length < 20 ? 20
    : currentCard.tagline.length < 30 ? 16
      : currentCard.tagline.length < 50 ? 14
        : 12;

  return (
    <ThemeProvider theme={theme}>
      <IconButton onClick={() => setShowCardView(false)} style={{ alignSelf: "flex-end", marginLeft: "auto", position: "fixed" }} className={classes.closeButtonStyled}>
        <img src={closeButton} alt="Close Info" height={36} />
      </IconButton>
      <Card style={{ background: "transparent", overflow: "visible", display: "flex", alignItems: "center" }}>
        <Card className={classes.tensionCardView} style={{ rotate: "-7.5deg" }}>
          <Box className={classes.tensionCardHeading}>
            <img src={IconTensionHeadingArrow} alt=">" style={{ verticalAlign: "middle", paddingRight: "10px" }} />
            <span style={{ fontSize: `${sizeOfTagline}px`, fontWeight: 800 }}>
              {currentCard.tagline}
            </span>
          </Box>
          <Box sx={{ backgroundImage: `url(${currentCard.art})` }} className={classes.cardViewImg} />
          <Box className={classes.footerCard}>
            <Box className={classes.footerL}><img src={currentCard.type} alt="Card Art" height={40} /></Box>
            <Box className={classes.footerC}>{currentCard.title}</Box>
            <Box className={classes.footerR}>{currentCard.descrip}</Box>
          </Box>
        </Card>
      </Card>
    </ThemeProvider>
  );
};

export default MobileTensionCardView;
