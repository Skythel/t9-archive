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
  scrollable: {
    background: "transparent",
    outline: "none",
    height: "70vh",
    overflow: "scroll !important",
    paddingBottom: "50px",
  },
  tensionCardExpanded: {
    background: "rgba(0, 0, 0, 0.9) !important",
    color: "white !important",
    fontWeight: 600,
    fontSize: "24px",
    padding: "20px",
    height: "75vh",
    overflow: "auto",
  },
  tensionCardView: {
    background: "black !important",
    color: "white !important",
    borderRadius: "35px !important",
    width: "40vw",
  },
  tensionCardHeading: {
    padding: "20px",
    paddingBottom: "10px",
  },
  cardViewImg: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    width: "100%",
    aspectRatio: "16 / 7",
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
  },
  footerCard: {
    gridTemplateColumns: "2fr 4fr 6fr",
    display: "grid",
    fontWeight: 600,
    fontSize: "18px",
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
    paddingTop: "10px",
  },
  tensionCardViewName: {
    fontSize: "26px",
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
  },
}));

const TensionCardExpanded = ({ currentCard, setShowExpandedCard }) => {
  const classes = useStyles();
  const sizeOfTagline = currentCard.tagline.length < 20 ? 30
    : currentCard.tagline.length < 30 ? 28
      : currentCard.tagline.length < 50 ? 25
        : 20;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "grid", gridTemplateColumns: "6fr 6fr", columnGap: "5vw", height: "match-parent" }}>
        <Card style={{ background: "transparent", overflow: "visible", display: "flex", alignItems: "center" }}>
          <Card className={classes.tensionCardView} xs={6} style={{ rotate: "-15deg" }}>
            <Box className={classes.tensionCardHeading}>
              <img src={IconTensionHeadingArrow} alt=">" style={{ verticalAlign: "text-bottom", paddingRight: "15px" }} />
              <span style={{ fontSize: `${sizeOfTagline}px`, fontWeight: 800 }}>
                {currentCard.tagline}
              </span>
            </Box>
            <Box sx={{ backgroundImage: `url(${currentCard.art})` }} className={classes.cardViewImg} />
            <Box className={classes.footerCard}>
              <Box className={classes.footerL}><img src={currentCard.type} alt="Card Art" height={60} /></Box>
              <Box className={classes.footerC}>{currentCard.title}</Box>
              <Box className={classes.footerR}>{currentCard.descrip}</Box>
            </Box>
          </Card>
        </Card>
        <Card className={classes.tensionCardExpanded} xs={6}>
          <Box style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <span className={classes.tensionCardViewName}>
              {currentCard.title}
            </span>
            <IconButton onClick={() => setShowExpandedCard(false)} style={{ alignSelf: "flex-end", marginLeft: "auto", }} className={classes.closeButtonStyled}>
              <img src={closeButton} alt="Close Info" height={48} />
            </IconButton>
          </Box>
          <Box className={classes.scrollable}>
            {currentCard.info.map((i) => (
              <>{i}<br /></>
            ))}
            <br />
          </Box>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default TensionCardExpanded;
