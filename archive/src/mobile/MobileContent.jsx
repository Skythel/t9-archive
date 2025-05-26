import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import MobileCharacter from "./MobileCharacter";
import MobileTensionCards from "./MobileTensionCards";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    display: "flex",
    height: "85vh",
    overflowY: "auto",
    paddingBottom: "10px",
  },
}));

const MobileContent = ({ currentPage }) => {
  const classes = useStyles();
  const completed = ["Character", "Cards"];
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.content} maxWidth={false}>
        {!completed.includes(currentPage) && (
          <div style={{ color: "white", textAlign: "left" }}>
            <h2>Welcome to the Tribe Nine archival project!</h2>
            <p>Content will slowly be added over time. Currently, the only page available is Character (click on the head icon on top).</p>
            <p>Do let me know if you encounter any issues. (Discord: @skythel)</p>
          </div>
        )}
        {currentPage === "Character" && <MobileCharacter />}
        {currentPage === "Cards" && <MobileTensionCards />}
      </Container>
    </ThemeProvider>
  )
};
export default MobileContent;
