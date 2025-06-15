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
import TypingIndicator from "./TypingIndicator";
import { stampReplace } from "../content/ChatStamps";
import Cookies from "universal-cookie";

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
    gridTemplateColumns: "130px 10fr",
    textAlign: "left",
  },
  messageItemSelf: {
    gridTemplateColumns: "10fr 130px",
    textAlign: "right",
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
  messageColumnSelf: {
    marginLeft: "auto",
    order: "-1",
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
    padding: "20px",
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
  chatBubbleSelf: {
    background: "#a550e1",
    color: "white",
    textStroke: "currentColor",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "15px",
      right: "-10px",
      width: 0,
      height: 0,
      border: "10px solid transparent",
      borderTopColor: "#a550e1",
      borderBottom: 0,
      marginBottom: "-10px",
    },
    "&::after": {
      content: "none",
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
}));

const endMsg = "All messages have been confirmed";

const ChatMessage = ({ title, speakers, chatLog }) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const party = cookies.get("partyMembers") ?? "";
  const currentUser = party.split(",")[0] ?? "";
  const [messages, setMessages] = useState([]);
  const [showEndMsg, setShowEndMsg] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(
    Object.assign(
      {},
      ...speakers
        .filter((s) => s.SpeakerName !== currentUser)
        .map((s) => ({ [s.SpeakerName]: false }))
    )
  );
  const [selfIsTyping, setSelfIsTyping] = useState(false);
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
      } else if (
        !isTyping[chatLog[currentIndex].SpeakerData.name] &&
        chatLog[currentIndex].SpeakerData.name !== currentUser
      ) {
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
      } else if (
        !isTyping[chatLog[currentIndex].SpeakerData.name] &&
        chatLog[currentIndex].SpeakerData.name === currentUser
      ) {
        setSelfIsTyping(true);
        setTimeout(() => {
          setSelfIsTyping(false);
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
        }, 1500);
        return () => clearTimeout(cooldownTimer);
      }, chatLog[currentIndex].DelaySec * 1000);
      return () => clearTimeout(messageTimer);
    }
    // eslint-disable-next-line
  }, [currentIndex]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping, selfIsTyping, messages, showEndMsg]);

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
          <span style={{ paddingLeft: "15px" }}>
            {speakers.length > 3 && `+${speakers.length - 3}`}
          </span>
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
          {messages.map((msg, i) =>
            msg.Type === "Typing" ? null : (
              <motion.div
                key={msg.Guid}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`${classes.messageItem}${
                  currentUser === msg.SpeakerData.name
                    ? ` ${classes.messageItemSelf}`
                    : ""
                }`}
                {...(currentUser === msg.SpeakerData.name
                  ? { style: { flexDirection: "reverse" } }
                  : {})}
              >
                <Box
                  {...(currentUser !== msg.SpeakerData.name
                    ? { className: classes.avatarColumn }
                    : {})}
                >
                  {(i === 0 || messages[i - 1].SpeakerId !== msg.SpeakerId) && (
                    <img
                      className={classes.avatar}
                      src={msg.SpeakerData.avatar}
                      alt={`${msg.SpeakerData.name}'s Avatar`}
                      height={100}
                    />
                  )}
                </Box>
                <Box
                  {...(currentUser === msg.SpeakerData.name
                    ? { className: classes.messageColumnSelf }
                    : {})}
                >
                  {(i === 0 || messages[i - 1].SpeakerId !== msg.SpeakerId) && (
                    <Box className={classes.speakerName}>
                      {msg.SpeakerData.name}
                    </Box>
                  )}
                  {msg.Type === "Message" && (
                    <Box
                      className={`${classes.chatBubble}${
                        currentUser === msg.SpeakerData.name
                          ? ` ${classes.chatBubbleSelf}`
                          : ""
                      }`}
                    >
                      {msg.Text}
                    </Box>
                  )}
                  {msg.Type === "Sticker" && stampReplace(msg.Text)}
                </Box>
              </motion.div>
            )
          )}
          {selfIsTyping && (
            <motion.div
              key="selfTyping"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0 }}
              className={`${classes.messageItem} ${classes.messageItemSelf}`}
              style={{ flexDirection: "reverse" }}
            >
              <Box>
                {(currentIndex === 0 ||
                  messages[currentIndex - 1].SpeakerData.name !==
                    currentUser) && (
                  <img
                    className={classes.avatar}
                    src={speakerList.find((s) => s.name === currentUser).avatar}
                    alt={`${currentUser}'s Avatar`}
                    height={100}
                  />
                )}
              </Box>
              <Box className={classes.messageColumnSelf}>
                {(currentIndex === 0 ||
                  messages[currentIndex - 1].SpeakerData.name !==
                    currentUser) && (
                  <Box className={classes.speakerName}>{currentUser}</Box>
                )}
                <TypingIndicator typers={[]} />
              </Box>
            </motion.div>
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
export default ChatMessage;
