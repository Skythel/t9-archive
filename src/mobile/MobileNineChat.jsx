import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { chatList } from "../content/ChatList";
import { speakerList } from "../content/ChatSpeakers";
import { Link, useOutlet } from "react-router-dom";
import { IconButton } from "@mui/material";

const IconNINE = require("../assets/topbar/ui_common_icon_header_tips_navigation.png");
const IconCasual = require("../assets/nine_groups/nine_group_7002.png");
const IconClose = require("../assets/ui/ui_common_button_detailmenu_close.png");

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  nineChatContainer: {
    borderRadius: "35px",
    backgroundColor: "#e0e6f1",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    width: "90vw",
    overflow: "auto",
  },
  nineChatHeader: {
    backgroundImage: `url(${require("../assets/bg/ui_common_bg_nine_title.png")})`,
    backgroundColor: "black",
    color: "white",
    padding: "15px",
    position: "sticky",
    display: "grid",
    gridTemplateColumns: "6fr 6fr 6fr",
    height: "7.5vh",
    alignItems: "center",
    fontSize: "20px",
    fontStyle: "italic",
    fontWeight: 900,
  },
  nineChatListLink: {
    color: "black",
    textDecoration: "none",
    outline: "none",
  },
  nineChatListItem: {
    display: "grid",
    gridTemplateColumns: "2fr 10fr",
    gap: "15px",
    padding: "15px",
    alignItems: "center",
    borderTop: "2px solid #c2c9d4",
  },
  chatTitle: {
    fontWeight: 900,
    fontStyle: "italic",
    fontSize: "18px",
  },
  groupIcon: {
    borderRadius: "15px",
  },
  avatar: {
    borderRadius: "50%",
    border: "1px solid #aaa",
    marginRight: "5px",
  },
}));

const NineChatList = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.nineChatHeader}>
        <Box style={{ marginLeft: "auto" }}>
          <img
            src={IconNINE}
            alt="NINE Icon"
            height={32}
            style={{ verticalAlign: "middle" }}
          />
        </Box>
        <Box>Message</Box>
        <Box style={{ marginLeft: "auto", paddingRight: "5px" }}>
          <Link to={`/`}>
            <IconButton>
              <img
                src={IconClose}
                alt="Close NINE"
                height={28}
                className={classes.chatBack}
              />
            </IconButton>
          </Link>
        </Box>
      </Box>
      <Box className={classes.nineChatList}>
        {chatList.map((c, i) => (
          <Link to={`/chat/${i + 1}`} className={classes.nineChatListLink}>
            <Box className={classes.nineChatListItem}>
              <Box>
                <img
                  src={IconCasual}
                  alt={c.title === "" ? "Group Chat" : c.title}
                  height={50}
                  className={classes.groupIcon}
                />
              </Box>
              <Box textAlign="left">
                <Box className={classes.chatTitle}>
                  {c.title === "" ? "Group Chat" : c.title}
                </Box>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      speakerList.find(
                        (s) => s.speakerId === Number(c.Contents[0].SpeakerId)
                      ).avatar
                    }
                    alt="Avatar"
                    height={24}
                    className={classes.avatar}
                  />
                  {`${
                    c.Contents[0].Type === "Sticker"
                      ? "(Sticker sent)"
                      : `${c.Contents[0].Text.substring(0, 45)}…`
                  }`}
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
};

const MobileNineChat = () => {
  const classes = useStyles();
  const outlet = useOutlet();
  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.nineChatContainer}>
        {outlet || <NineChatList />}
      </Box>
    </ThemeProvider>
  );
};
export default MobileNineChat;
