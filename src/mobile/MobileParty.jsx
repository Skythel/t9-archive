import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/system";
import { useState } from "react";
import { characterList } from "../content/CharacterList";
import Cookies from "universal-cookie";
import MobilePartyCharacterInfo from "./MobilePartyCharacterInfo";
import MobilePartyCharacterPanel from "./MobilePartyCharacterPanel";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  characterPanel: {
    height: "80vh",
    overflow: "auto",
  },
  container: {
    flexDirection: "column",
  },
}));

const MobileParty = () => {
  const classes = useStyles();
  const cookies = new Cookies();
  const party = cookies.get("partyMembers") ?? "";
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [partyMembers, setPartyMembers] = useState(
    party !== ""
      ? party.split(",").map((p) => characterList.find((c) => c.name === p))
      : []
  );
  const [characterViewing, setCharacterViewing] = useState(characterList[0]);
  const addPartyMember = (character) => {
    const newMembers =
      partyMembers.length > selectedPosition
        ? partyMembers.map((p, i) => (i === selectedPosition ? character : p))
        : [...partyMembers, character];
    setPartyMembers(newMembers);
    cookies.set("partyMembers", newMembers.map((m) => m.name).join());
  };
  const removePartyMember = (character) => {
    const newMembers = partyMembers.filter((p) => p.name !== character.name);
    setPartyMembers(newMembers);
    cookies.set("partyMembers", newMembers.map((m) => m.name).join());
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.container}>
        <MobilePartyCharacterPanel
          partyMembers={partyMembers}
          characterViewing={characterViewing}
          setCharacterViewing={setCharacterViewing}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
        />
        {/* <Grid item className={classes.characterView} size={4}></Grid> */}
        <MobilePartyCharacterInfo
          characterViewing={characterViewing}
          addPartyMember={addPartyMember}
          removePartyMember={removePartyMember}
        />
      </Grid>
    </ThemeProvider>
  );
};
export default MobileParty;
