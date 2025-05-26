import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import Character from "./Character";
import TensionCards from "./TensionCards";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    display: "grid",
    height: "80vh",
    gridTemplateColumns: "8fr 4fr",
    overflowY: "auto",
  },
}));

const Content = ({ currentPage }) => {
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
        {currentPage === "Character" && <Character />}
        {currentPage === "Cards" && <TensionCards />}
      </Container>
    </ThemeProvider>
  )
};
export default Content;
