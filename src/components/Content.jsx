import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import Character from "./Character";
import TensionCards from "./TensionCards";
import { chatList } from "../content/ChatList";
import { Route, Routes } from "react-router-dom";
import NineChat from "./NineChat";
import ChatMessage from "./ChatMessage";
import Party from "./Party";
import MainPage from "./MainPage";

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
          <Route path="/" element={<MainPage />} />
          <Route path="/party" element={<Party />}></Route>
          <Route path="/characters" element={<Character />} />
          <Route path="/tension-cards" element={<TensionCards />} />
          <Route path="/chat" element={<NineChat />}>
            {chatList.map((c, i) => (
              <Route
                path={`/chat/${i + 1}`}
                element={
                  <ChatMessage
                    title={c.title}
                    speakers={c.Speakers}
                    chatLog={c.Contents}
                  />
                }
              />
            ))}
          </Route>
        </Routes>
        {/* {currentPage === "Character" && <Character />}
        {currentPage === "Cards" && <TensionCards />} */}
      </Container>
    </ThemeProvider>
  );
};
export default Content;
