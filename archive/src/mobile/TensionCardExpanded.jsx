import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { closeButton } from "../assets/Icons";
import { closeButtonStyled } from "../assets/Styles";

const IconTensionHeadingArrow = require("../assets/tension_misc/tension_heading_arrow.png");

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  closeButtonStyled,
  scrollable: {
    background: "black",
    outline: "none",
    height: "30vh",
    overflow: "scroll !important",
    paddingBottom: "50px",
  },
  tensionCardExpanded: {
    background: "rgba(0, 0, 0, 0.9) !important",
    color: "white !important",
    fontWeight: 600,
    fontSize: "18px",
    padding: "20px",
    height: "35vh",
    overflow: "auto",
  },
  tensionCardView: {
    background: "black !important",
    color: "white !important",
    borderRadius: "35px !important",
    width: "match-parent",
    height: "50vh",
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
    width: "80vw",
    aspectRatio: "16 / 6",
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
  },
  footerCard: {
    gridTemplateColumns: "2fr 4fr 6fr",
    display: "grid",
    fontWeight: 600,
    fontSize: "16px",
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
  tensionCardViewName: {
    fontSize: "20px",
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
  const sizeOfTagline = currentCard.tagline.length < 20 ? 22
    : currentCard.tagline.length < 30 ? 18
      : currentCard.tagline.length < 50 ? 16
        : 14;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", height: "match-parent" }}>
        <Card style={{ background: "transparent", overflow: "visible", display: "flex", alignItems: "center" }}>
          <Card className={classes.tensionCardView} xs={6} style={{ rotate: "-7.5deg" }}>
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
        <Card className={classes.tensionCardExpanded} xs={6}>
          <Box style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <span className={classes.tensionCardViewName}>
              {currentCard.title}
            </span>
            <IconButton onClick={() => setShowExpandedCard(false)} style={{ alignSelf: "flex-end", marginLeft: "auto", }} className={classes.closeButtonStyled}>
              <img src={closeButton} alt="Close Info" height={36} />
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
