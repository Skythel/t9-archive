export const chatStamps = [
  {
    textReplace: "30dcc2ba60e2f4d36a91bf9af6246f36",
    image: require("../assets/nine_stamps/nine_stamp_judge_01.png"),
  },
  {
    textReplace: "",
    image: require("../assets/nine_stamps/nine_stamp_judge_02.png"),
  },
  {
    textReplace: "466f716e91c24409cac598050ebce434",
    image: require("../assets/nine_stamps/nine_stamp_nekomaru_01.png"),
  },
  {
    textReplace: "",
    image: require("../assets/nine_stamps/nine_stamp_nekomaru_02.png"),
  },
  {
    textReplace: "",
    image: require("../assets/nine_stamps/nine_stamp_nekomaru_03.png"),
  },
  {
    textReplace: "",
    image: require("../assets/nine_stamps/nine_stamp_nekomaru_04.png"),
  },
  {
    textReplace: "feb599a3c16c1470b985e86faa7aa2f7",
    image: require("../assets/nine_stamps/nine_stamp_pudding_01.png"),
  },
  {
    textReplace: "c04c7d86ddb534e0c8c33dc749a7f4ff",
    image: require("../assets/nine_stamps/nine_stamp_rabbit_01.png"),
  },
  {
    textReplace: "",
    image: require("../assets/nine_stamps/nine_stamp_rabbit_02.png"),
  },
];

export const stampReplace = (msg) => {
  const stamp = chatStamps.find((st) => st.textReplace === msg);
  if (stamp) return <img src={stamp.image} alt="Sticker" />;
  else return msg;
};
