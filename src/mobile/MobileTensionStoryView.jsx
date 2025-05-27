import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { closeButton } from "../vars/Icons";
import { closeButtonStyled } from "../vars/Styles";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  closeButtonStyled,
  scrollable: {
    background: "black",
    outline: "none",
    height: "65vh",
    overflow: "scroll !important",
    paddingBottom: "50px",
  },
  tensionCardExpanded: {
    background: "rgba(0, 0, 0, 0.9) !important",
    color: "white !important",
    fontWeight: 600,
    fontSize: "16px",
    padding: "20px",
    height: "75vh",
    overflow: "auto",
  },
  tensionCardViewName: {
    fontSize: "16px",
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

const MobileTensionStoryView = ({ currentCard, setShowStoryView }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.tensionCardExpanded} xs={6}>
        <Box style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <span className={classes.tensionCardViewName}>
            {currentCard.title}
          </span>
          <IconButton onClick={() => setShowStoryView(false)} style={{ alignSelf: "flex-end", marginLeft: "auto", }} className={classes.closeButtonStyled}>
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
    </ThemeProvider>
  );
};

export default MobileTensionStoryView;
