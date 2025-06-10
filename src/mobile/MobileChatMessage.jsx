import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { backButton } from "../vars/Icons";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import { speakerList } from "../content/ChatSpeakers";
import TypingIndicator from "../components/TypingIndicator";
import { stampReplace } from "../content/ChatStamps";

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
    padding: "10px",
    position: "sticky",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7.5vh",
  },
  nineChatList: {
    height: "70vh",
    overflow: "auto",
    padding: "15px",
    // overscrollBehavior: "contain",
  },
  messageItem: {
    display: "grid",
    gridTemplateColumns: "60px 10fr",
    textAlign: "left",
  },
  messagesConfirmed: {
    display: "grid",
    gridTemplateColumns: "2fr 10fr 2fr",
    alignItems: "center",
    gap: "2px",
    marginLeft: "10px",
    marginRight: "10px",
    color: "#404040",
    fontSize: "12px",
  },
  avatarColumn: {
    width: "10vw",
  },
  avatar: {
    borderRadius: "50%",
  },
  speakerName: {
    marginBottom: "5px",
    fontSize: "14px",
  },
  chatBubble: {
    position: "relative",
    background: "white",
    borderRadius: "15px",
    boxShadow: "4px 4px 0 #cbd1da",
    padding: "15px",
    width: "fit-content",
    fontSize: "1rem",
    fontWeight: 400,
    marginBottom: "15px",
    textStroke: "0.5px #444",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "15px",
      left: "-5px",
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
    marginRight: "-5px",
  },
  chatHeadContainer: {
    alignSelf: "flex-end",
    marginLeft: "auto",
    fontSize: "14px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: "10px",
  },
  chatBack: {
    alignSelf: "flex-start",
    marginRight: "auto",
    paddingLeft: "10px",
    paddingRight: "15px",
    verticalAlign: "text-bottom",
  },
  chatTitle: {
    fontSize: "1rem",
    fontStyle: "italic",
    textWrap: "nowrap",
  },
  chatSubtitle: {
    fontSize: "0.9rem",
    textWrap: "nowrap",
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
}));

const endMsg = "All messages have been confirmed";

const MobileChatMessage = ({ title, speakers, chatLog }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [showEndMsg, setShowEndMsg] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(
    Object.assign({}, ...speakers.map((s) => ({ [s.SpeakerName]: false })))
  );
  const [triggerActivated, setTriggerActivated] = useState("");
  const messagesEndRef = useRef(null);

  const speaker1 = speakerList.find(
    (s) => s.index === Number(speakers[0].SpeakerId)
  );
  const speaker2 = speakerList.find(
    (s) => s.index === Number(speakers[1].SpeakerId)
  );
  const speaker3 = speakerList.find(
    (s) => s.index === Number(speakers[2].SpeakerId)
  );

  useEffect(() => {
    if (currentIndex >= chatLog.length) {
      setTimeout(() => {
        setShowEndMsg(true);
      }, chatLog[chatLog.length - 1].DelaySec * 1000);
      return;
    }

    // Only sequence messages with the current trigger activated
    if (
      [triggerActivated, ""].includes(chatLog[currentIndex].WaitTriggerName)
    ) {
      if (currentIndex === chatLog.length) {
        setIsTyping({});
      } else if (!isTyping[chatLog[currentIndex].SpeakerData.name]) {
        setIsTyping((prev) => ({
          ...prev,
          [chatLog[currentIndex].SpeakerData.name]: true,
        }));
        setTimeout(() => {
          setIsTyping((prev) => ({
            ...prev,
            [chatLog[currentIndex].SpeakerData.name]: false,
          }));
        }, chatLog[currentIndex].TypingDuration * 1000);
      }

      const messageTimer = setTimeout(() => {
        setMessages((prev) => [...prev, chatLog[currentIndex]]);

        // Check if current message triggers anything down in the log
        if (chatLog[currentIndex].InvokeTriggerName !== "") {
          // Change the trigger activation - TBD? Not sure if may cause errors with certain chats
          setTriggerActivated(chatLog[currentIndex].InvokeTriggerName);
        }

        // Pause before the next person typing
        const cooldownTimer = setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(cooldownTimer);
      }, chatLog[currentIndex].DelaySec * 1000);
      return () => clearTimeout(messageTimer);
    }
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
                height={24}
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
          <span style={{ paddingLeft: "15px" }}>
            {speakers.length > 3 && `+${speakers.length - 3}`}
          </span>
          <img
            src={speaker3.avatar}
            alt={`${speaker3.name}'s Avatar`}
            height={30}
            className={classes.chatHeadIcon}
          />
          <img
            src={speaker2.avatar}
            alt={`${speaker2.name}'s Avatar`}
            height={30}
            className={classes.chatHeadIcon}
          />
          <img
            src={speaker1.avatar}
            alt={`${speaker1.name}'s Avatar`}
            height={30}
            className={classes.chatHeadIcon}
          />
        </Box>
      </Box>
      <Box className={classes.nineChatList}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) =>
            msg.Type === "Typing" ? null : (
              <motion.div
                key={msg.Guid}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={classes.messageItem}
              >
                <Box className={classes.avatarColumn}>
                  {(i === 0 || messages[i - 1].SpeakerId !== msg.SpeakerId) && (
                    <img
                      className={classes.avatar}
                      src={msg.SpeakerData.avatar}
                      alt={`${msg.SpeakerData.name}'s Avatar`}
                      height={50}
                    />
                  )}
                </Box>
                <Box>
                  {(i === 0 || messages[i - 1].SpeakerId !== msg.SpeakerId) && (
                    <Box className={classes.speakerName}>
                      {msg.SpeakerData.name}
                    </Box>
                  )}
                  {msg.Type === "Message" && (
                    <Box className={classes.chatBubble}>{msg.Text}</Box>
                  )}
                  {msg.Type === "Sticker" && stampReplace(msg.Text)}
                </Box>
              </motion.div>
            )
          )}
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
        </AnimatePresence>
        <div ref={messagesEndRef}>
          {Object.values(isTyping).some((x) => x) && (
            <AnimatePresence>
              <TypingIndicator
                typers={Object.keys(isTyping).filter((k) => isTyping[k])}
              />
            </AnimatePresence>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};
export default MobileChatMessage;
