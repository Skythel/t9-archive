export const closeButtonStyled = {
  transition: "transform 0.5s ease",
  "&:active": {
    transform: "scale(0.7)",
  },
};
export const FontAnticDB = {
  "@font-face": {
    fontFamily: "Antic Cezanne Pro DB",
    src: `url("./assets/fonts/FOT-AnticCezannePro-DB-2.otf") format("otf")`,
  },
};
export const FontAnticM = {
  "@font-face": {
    fontFamily: "Antic Cezanne Pro M",
    src: `url("./assets/fonts/FOT-AnticCezannePro-M-2.otf") format("otf")`,
  },
};
export const InfoHeader = {
  fontSize: "26px",
  fontWeight: "800",
  fontStyle: "italic",
  borderRadius: "10px",
  padding: "5px",
  paddingLeft: "20px",
  position: "relative",
  bgcolor: "black",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "8px",
    backgroundColor: "#aaaaaa",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
};
export const InfoRow = {
  fontStyle: "italic",
  background: "black",
  padding: "3px",
  borderRadius: "50px",
};
export const fixedWidthIcon = {
  display: "inline-block",
  width: "40px",
  textAlign: "center",
  verticalAlign: "middle",
  paddingRight: "20px",
};
export const styledButton = {
  outline: "none",
  transition: "transform 0.5s ease",
  "&:active": {
    transform: "scale(0.8)",
  },
};
