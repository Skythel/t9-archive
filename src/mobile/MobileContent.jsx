import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import MobileCharacter from "./MobileCharacter";
import MobileTensionCards from "./MobileTensionCards";
import { chatList } from "../content/ChatList";
import {
  Route,
  Routes,
  Link,
} from "react-router-dom";
import MobileNineChat from "./MobileNineChat";
import MobileChatMessage from "./MobileChatMessage";

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

const MobileContent = () => {
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
                <p>Content will slowly be added over time. Currently, the only pages available are <Link to="./characters">Characters</Link>, <Link to="./tension-cards">Tension Cards</Link> and <Link to="./chat">NINE Chats</Link>.</p>
                <p>Do let me know if you encounter any issues. (Discord: @skythel)</p>
                <p><a href="https://github.com/Skythel/t9-archive" rel="noreferrer" target="_blank">GitHub source</a></p>
              </div>
            }
          />
          <Route
            path="/characters"
            element={<MobileCharacter />}
          />
          <Route
            path="/tension-cards"
            element={<MobileTensionCards />}
          />
          <Route
            path="/chat"
            element={<MobileNineChat />}
          >
            {chatList.map((c, i) => (
              <Route
                path={`/chat/${i + 1}`}
                element={<MobileChatMessage title={c.title} speakers={c.Speakers} chatLog={c.Contents} />}
              />
            ))}
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  )
};
export default MobileContent;
