import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { backButton } from "../vars/Icons";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import { speakerList } from "../content/ChatList";
import TypingIndicator from "./TypingIndicator";

const expandLeft = keyframes`
    from { width: 0; }
    to { width: 100px; }
`;

const expandRight = keyframes`
    from { width: 0; }
    to { width: 100px; }
`;

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  nineChatHeader: {
    backgroundImage: `url(${require("../assets/bg/ui_common_bg_nine_title.png")})`,
    backgroundColor: "black",
    color: "white",
    padding: "15px",
    position: "sticky",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7.5vh",
  },
  nineChatList: {
    height: "70vh",
    overflow: "auto",
    padding: "30px",
    // overscrollBehavior: "contain",
  },
  messageItem: {
    display: "grid",
    gridTemplateColumns: "2fr 10fr",
    textAlign: "left",
  },
  messagesConfirmed: {
    display: "grid",
    gridTemplateColumns: "2fr 8fr 2fr",
    alignItems: "center",
    gap: "10px",
    marginLeft: "30px",
    marginRight: "30px",
    color: "#404040",
  },
  avatarColumn: {
    width: "10vw",
  },
  avatar: {
    borderRadius: "50%",
  },
  speakerName: {
    marginBottom: "5px",
    fontSize: "18px",
  },
  chatBubble: {
    position: "relative",
    background: "white",
    borderRadius: "15px",
    boxShadow: "4px 4px 0 #cbd1da",
    padding: "25px",
    width: "fit-content",
    fontSize: "22px",
    fontWeight: 400,
    marginBottom: "15px",
    textStroke: "1px #444",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "15px",
      left: "-10px",
      width: 0,
      height: 0,
      border: "10px solid transparent",
      borderTopColor: "white",
      borderBottom: 0,
      marginBottom: "-10px",
    },
  },
  chatHeadIcon: {
    borderRadius: "50%",
    border: "3px solid white",
    marginRight: "-10px",
  },
  chatHeadContainer: {
    alignSelf: "flex-end",
    marginLeft: "auto",
    fontSize: "24px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: "10px",
  },
  chatBack: {
    alignSelf: "flex-start",
    marginRight: "auto",
    paddingLeft: "15px",
    paddingRight: "30px",
    verticalAlign: "text-bottom",
  },
  chatTitle: {
    fontSize: "26px",
    fontStyle: "italic",
  },
  chatSubtitle: {
    fontSize: "20px",
  },
  endLineLeft: {
    height: "5px",
    backgroundColor: "black",
    width: "auto",
    animationDelay: "0.2s",
    animation: `${expandLeft} 0.5s ease-out forwards`,
  },
  endLineRight: {
    height: "5px",
    backgroundColor: "black",
    width: "auto",
    animationDelay: "0.2s",
    animation: `${expandRight} 0.5s ease-out forwards`,
  },
  typing: {
    textAlign: "left",
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "1fr 10fr",
    color: "#404040",
  },
}));

const typingSpeed = 1.5; // placeholder for now
const endMsg = "All messages have been confirmed";

const ChatMessage = ({ title, chatLog }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [showEndMsg, setShowEndMsg] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef(null);
  // const processChatLog = chatLog.split("\n").map((m) => {
  //   const matches = m.trimStart().match(/(.+): (.+)/); // 1: speaker, 2: message
  //   // find the speaker object
  //   const speaker = speakers.find((s) => s.name.split(" ").includes(matches[1]));
  //   return { ...speaker, msg: matches[2], typingSpeed: typingSpeed * 1000 };
  // });
  const processChatLog = chatLog.filter((c) => c.Text !== "" && c.SpeakerIds.length > 0).map((m) => {
    // find the speaker object
    const speaker = speakerList.find(
      (s) => s.index === Number(m.SpeakerIds[0])
    );
    return { ...speaker, msg: m.Text, typingSpeed: typingSpeed * 1000 };
  });
  const speakers = [...new Set(chatLog.map((m) => m.SpeakerIds[0]))];
  const speaker1 = speakerList.find((s) => s.index === Number(speakers[0]));
  const speaker2 = speakerList.find((s) => s.index === Number(speakers[1]));
  const speaker3 = speakerList.find((s) => s.index === Number(speakers[2]));

  useEffect(() => {
    if (currentIndex >= processChatLog.length) {
      setTimeout(() => {
        setShowEndMsg(true);
      }, 1000);
      return;
    }

    setIsTyping(true);
    const typingTimer = setTimeout(() => {
      setIsTyping(false);

      const messageTimer = setTimeout(() => {
        setMessages((prev) => [...prev, processChatLog[currentIndex]]);
        const cooldownTimer = setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(cooldownTimer);
      }, 200);

      return () => clearTimeout(messageTimer);
    }, processChatLog[currentIndex].typingSpeed);

    return () => clearTimeout(typingTimer);
    // eslint-disable-next-line
  }, [currentIndex]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showEndMsg]);

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.nineChatHeader}>
        <Box>
          <Link to={`/chat`}>
            <IconButton>
              <img
                src={backButton}
                alt="Back to Chats"
                height={48}
                className={classes.chatBack}
              />
            </IconButton>
          </Link>
        </Box>
        <Box textAlign="left">
          <Box className={classes.chatTitle}>
            {title === "" ? "Group Chat" : title}
          </Box>
          <Box className={classes.chatSubtitle}>For casual chat.</Box>
        </Box>
        <Box className={classes.chatHeadContainer}>
          <span style={{ paddingLeft: "15px" }}>+{speakers.length - 3}</span>
          <img
            src={speaker3.avatar}
            alt={`${speaker3.name}'s Avatar`}
            height={44}
            className={classes.chatHeadIcon}
          />
          <img
            src={speaker2.avatar}
            alt={`${speaker2.name}'s Avatar`}
            height={44}
            className={classes.chatHeadIcon}
          />
          <img
            src={speaker1.avatar}
            alt={`${speaker1.name}'s Avatar`}
            height={44}
            className={classes.chatHeadIcon}
          />
        </Box>
      </Box>
      <Box className={classes.nineChatList}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={`chat${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={classes.messageItem}
            >
              <Box className={classes.avatarColumn}>
                {(i === 0 || messages[i - 1].name !== msg.name) && (
                  <img
                    className={classes.avatar}
                    src={msg.avatar}
                    alt={`${msg.name}'s Avatar`}
                    height={100}
                  />
                )}
              </Box>
              <Box>
                {(i === 0 || messages[i - 1].name !== msg.name) && (
                  <Box className={classes.speakerName}>{msg.name}</Box>
                )}
                <Box className={classes.chatBubble}>{msg.msg}</Box>
              </Box>
            </motion.div>
          ))}
          {showEndMsg && (
            <motion.div
              key="endMsg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={classes.messagesConfirmed}
            >
              <div className={classes.endLineLeft} />
              {endMsg}
              <div className={classes.endLineRight} />
            </motion.div>
          )}
          {isTyping && (
            <div className={classes.typing}>
              <AnimatePresence>
                <TypingIndicator />
              </AnimatePresence>
              <Box>{processChatLog[currentIndex].name} is typing...</Box>
            </div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};
export default ChatMessage;
