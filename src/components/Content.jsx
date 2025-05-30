import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import Character from "./Character";
import TensionCards from "./TensionCards";
import { chatList } from "../content/ChatList";
import {
  Route,
  Routes,
  Link,
} from "react-router-dom";
import NineChat from "./NineChat";
import ChatMessage from "./ChatMessage";

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

const Content = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.content} maxWidth={false}>
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ color: "white", textAlign: "left" }}>
                <h2>Welcome to the Tribe Nine archival project!</h2>
                <p>Content will slowly be added over time. Currently, the only pages available are <Link to="./characters">Characters</Link> and <Link to="./tension-cards">Tension Cards</Link>.</p>
                <p>Do let me know if you encounter any issues. (Discord: @skythel)</p>
              </div>
            }
          />
          <Route
            path="/characters"
            element={<Character />}
          />
          <Route
            path="/tension-cards"
            element={<TensionCards />}
          />
          <Route
            path="/chat"
            element={<NineChat />}
          >
            {chatList.map((c, i) => (
              <Route
                path={`/chat/${i + 1}`}
                element={<ChatMessage title={c.title} chatLog={c.Contents} />}
              />
            ))}
          </Route>
        </Routes>
        {/* {currentPage === "Character" && <Character />}
        {currentPage === "Cards" && <TensionCards />} */}
      </Container>
    </ThemeProvider>
  )
};
export default Content;
