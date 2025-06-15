import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import MobileCharacter from "./MobileCharacter";
import MobileTensionCards from "./MobileTensionCards";
import { chatList } from "../content/ChatList";
import { Route, Routes } from "react-router-dom";
import MobileNineChat from "./MobileNineChat";
import MobileChatMessage from "./MobileChatMessage";
import MainPage from "../components/MainPage";
import MobileParty from "./MobileParty";

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
          <Route path="/" element={<MainPage />} />
          <Route path="/party" element={<MobileParty />}></Route>
          <Route path="/characters" element={<MobileCharacter />} />
          <Route path="/tension-cards" element={<MobileTensionCards />} />
          <Route path="/chat" element={<MobileNineChat />}>
            {chatList.map((c, i) => (
              <Route
                path={`/chat/${i + 1}`}
                element={
                  <MobileChatMessage
                    title={c.title}
                    speakers={c.Speakers}
                    chatLog={c.Contents}
                  />
                }
              />
            ))}
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
};
export default MobileContent;
