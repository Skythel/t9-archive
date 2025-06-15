import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/system";
import PartyCharacterPanel from "./PartyCharacterPanel";
import { useState } from "react";
import { characterList } from "../content/CharacterList";
import PartyCharacterInfo from "./PartyCharacterInfo";
import Cookies from "universal-cookie";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  characterPanel: {
    height: "80vh",
    overflow: "auto",
  },
}));

const Party = () => {
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
        <Grid item className={classes.characterPanel} size={6}>
          <PartyCharacterPanel
            partyMembers={partyMembers}
            characterViewing={characterViewing}
            setCharacterViewing={setCharacterViewing}
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
          />
        </Grid>
        <Grid item className={classes.characterView} size={4}></Grid>
      </Grid>
      <PartyCharacterInfo
        characterViewing={characterViewing}
        addPartyMember={addPartyMember}
        removePartyMember={removePartyMember}
      />
    </ThemeProvider>
  );
};
export default Party;
