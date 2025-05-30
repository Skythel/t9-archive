export const speakerList = [
  {
    index: 5,
    name: "Yo Kuronaka",
    avatar: require("../assets/nine_avatars/nine_speaker_1001.png"),
  },
  {
    index: 8,
    name: "Tsuki Iroha",
    avatar: require("../assets/nine_avatars/nine_speaker_1002.png"),
  },
  {
    index: 55,
    name: "Jio Takinogawa",
    avatar: require("../assets/nine_avatars/nine_speaker_1003.png"),
  },
  {
    index: 56,
    name: "Miu Jujo",
    avatar: require("../assets/nine_avatars/nine_speaker_1004.png"),
  },
  {
    index: 54,
    name: "Koishi Kohinata",
    avatar: require("../assets/nine_avatars/nine_speaker_1005.png"),
  },
  {
    index: 46,
    name: "Minami Oi",
    avatar: require("../assets/nine_avatars/nine_speaker_1006.png"),
  },
  {
    index: 58,
    name: "Hyakuichitaro Senju",
    avatar: require("../assets/nine_avatars/nine_speaker_1007.png"),
  },
  {
    index: 57,
    name: "Tsuruko Semba",
    avatar: require("../assets/nine_avatars/nine_speaker_1008.png"),
  },
  {
    index: 52,
    name: "Eiji Todoroki",
    avatar: require("../assets/nine_avatars/nine_speaker_1009.png"),
  },
  {
    index: 50,
    name: "Roku Saigo",
    avatar: require("../assets/nine_avatars/nine_speaker_1010.png"),
  },
  {
    index: 48,
    name: "Enoki Yukigaya",
    avatar: require("../assets/nine_avatars/nine_speaker_1011.png"),
  },
  {
    index: 44,
    name: "Yutaka Gotanda",
    avatar: require("../assets/nine_avatars/nine_speaker_1012.png"),
  },
  {
    index: 42,
    name: "Q",
    avatar: require("../assets/nine_avatars/nine_speaker_1013.png"),
  },
  {
    index: 35,
    name: "Kazuki Aoyama",
    avatar: require("../assets/nine_avatars/nine_speaker_1014.png"),
  }
];
// const speakerMita = {
//   index: 0,
//   name: "Santaro Mita",
//   avatar: require("../assets/nine_avatars/nine_speaker_1015.png"),
// };
// const speakerHina = {
//   index: 0,
//   name: "Hinagiku Akiba",
//   avatar: require("../assets/nine_avatars/nine_speaker_1030.png"),
// };

export const chatList = [
  {
    title: "Chat About Eyes",
    ...require("./nine_en/likabilityNINE_C_common_Gotanda_en.json"),
  },
  {
    title: "",
    ...require("./nine_en/likabilityNINE_C_common_Hyakuichitaro_en.json"),
  },
  {
    title: "100 Best Things About Miu",
    ...require("./nine_en/likabilityNINE_C_common_Jio_en.json"),
  },
  {
    title: "What a Nightmare…",
    ...require("./nine_en/likabilityNINE_C_common_Kazuki_en.json"),
  },
  {
    title: "Training Methods",
    ...require("./nine_en/likabilityNINE_C_common_Koishi_en.json"),
  },
  {
    title: "Job Advice!",
    ...require("./nine_en/likabilityNINE_C_common_Miu_en.json"),
  },
  {
    title: "I Already Have This One! Wanna Trade?",
    ...require("./nine_en/likabilityNINE_C_common_Oi_en.json"),
  },
  {
    title: "What Tree Is This?",
    ...require("./nine_en/likabilityNINE_C_common_Q_en.json"),
  },
  {
    title: "Eiji Todoroki’s Money-Making Course",
    ...require("./nine_en/likabilityNINE_C_common_Todoroki_en.json"),
  },
  {
    title: "I Want To Know What Everyone Likes!",
    ...require("./nine_en/likabilityNINE_C_common_Tsuki_en.json"),
  },
  {
    title: "Doki Doki!",
    ...require("./nine_en/likabilityNINE_C_common_Tsuruko_en.json"),
  },
  {
    title: "I’m Just Curious",
    ...require("./nine_en/likabilityNINE_C_common_Yo_en.json"),
  },
  {
    title: "",
    ...require("./nine_en/likabilityNINE_C_Main1_Gotanda_en.json"),
  },
  {
    title: "",
    ...require("./nine_en/likabilityNINE_C_Main1_Saigo_en.json"),
  },
  {
    title: "",
    ...require("./nine_en/likabilityNINE_C_Main1_Tsuki_en.json"),
  },
  {
    title: "",
    ...require("./nine_en/likabilityNINE_C_Main4_Jio_en.json"),
  },
];

// export const chatList = [
//   {
//     title: "100 Best Things About Miu",
//     speakers: [speakerJio, speakerTsuki, speakerMiu, speakerKoishi, speakerKazuki],
//     chatLog: `Jio: Hey everyone, let’s make a list on how awesome Miu is!
//     Tsuki: What’s with you all of a sudden?
//     Miu: Just ignore him.
//     Jio: Oh? No responses?
//     Jio: Well, Miu is indeed extremely wonderful, so I know that everyone must be uncertain where to begin.
//     Jio: I’ll go first then! First of all, she’s strong and noble!
//     Jio: Not only is Miu independent and powerful, she never flatters others. Her elegance and beauty makes her extremely charming!
//     Jio: Come on, everyone! Don’t be shy!
//     Koishi: Umm… She’s really gentle?
//     Miu: Don’t play along with him.
//     Jio: Good one, Koishi! You know your stuff.
//     Jio: That’s right. Miu is more gentle than anyone else, like a spring breeze that envelops us all.
//     Jio: Let’s keep going. Next!
//     Tsuki: I admire her coolness!
//     Miu: Tsuki.
//     Jio: Agree. Though Miu is as cool as ice on the outside, she has a heart that burns with passion and love for me!
//     Jio: Anyone else?
//     Kazuki: She’s reliable and fights for her allies.
//     Miu: Kazuki…
//     Jio: As expected from Kazuki, great observation! Yes, Miu cares for her friends more than anyone. Even I get jealous sometimes.
//     Jio: Okay, next!
//     Miu: That’s enough. How long are you going to keep this up?
//     Jio: Until we’ve listed out all of Miu’s awesome traits. I reckon it might take more than a day or two.
//     Miu: …
//     Jio: Hahah. Miu seems kind of shy, so let’s just end it here today, shall we?
//     Jio: By the way, your shyness and modesty are super attractive as well!
//     Jio: Well then. Let’s look forward to the next episode!
//     Miu: There won’t be one!`,
//   },
//   {
//     title: "A Big Discovery!",
//     speakers: [speakerEnoki, speakerMiu, speakerKoishi],
//     chatLog: `Enoki: Hey, everyone! Try wrapping your whole body with the Stretchy Bandage!
//     Enoki: You’d be so comfortable you’d fall asleep!
//     Miu: Wrapping ourselves up with bandage even when we’re not hurt? Sounds like a mummy costume.
//     Koishi: I’ve heard that some people really do wrap themselves up.
//     Koishi: They say it allows them to have a good night’s sleep.
//     Enoki: Is that so? I didn’t know that!
//     Enoki: So it’s not a big discovery after all.
//     Enoki: Sad…
//     Miu: By discovery… Did you try it out yourself, Enoki?
//     Enoki: Yep! I tried it just now!
//     Enoki: On Saigo!
//     Miu: Saigo…
//     Koishi: What?! Did he get mad?
//     Enoki: I was scolded… But it was really fun so I didn’t stop, hehe!
//     Enoki: And after that…
//     Enoki: He said, “This doesn’t feel too bad.”
//     Enoki: And he fell asleep!
//     Miu: Really…? While being wrapped up like a mummy?
//     Miu: Did you take a picture? If you did, send it to me.
//     Enoki: Of course I did! I’ll send it to the group!
//     Koishi: If even Mr. Saigo could fall asleep, that means it was really effective.
//     Koishi: I may want to try it out myself…`,
//   },
// ]