import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid } from "@mui/system";
import { Button, ButtonBase, Dialog } from "@mui/material";
import { useState } from "react";
import { InfoHeader, InfoRow, styledButton } from "../vars/Styles";
import SkillTooltip from "../components/SkillTooltip";
import HPBar from "../components/HPBar";
import Cookies from "universal-cookie";

const IconHP = require("../assets/common_icons/ui_common_icon_status_hp.png");
const IconAttack = require("../assets/common_icons/ui_common_icon_status_attack.png");
const IconDefense = require("../assets/common_icons/ui_common_icon_status_deffense.png");
const AbilityBars = [
  require("../assets/character_misc/ui_characterdetail_image_basic_info level_off.png"),
  require("../assets/character_misc/ui_characterdetail_image_basic_info level_1.png"),
  require("../assets/character_misc/ui_characterdetail_image_basic_info level_2.png"),
  require("../assets/character_misc/ui_characterdetail_image_basic_info level_3.png"),
  require("../assets/character_misc/ui_characterdetail_image_basic_info level_4.png"),
];
const ButtonRemove = require("../assets/ui/button_remove.png");
const ButtonConfirm = require("../assets/ui/button_confirm.png");

const abilityBarWidth = 60;
const skillSlotHeight = 65;

const theme = createTheme();
const useStyles = makeStyles(() => ({
  container: {
    background: "rgba(0, 0, 0, 0.4)",
    color: "white",
    textAlign: "left",
    fontWeight: 600,
    fontSize: "18px",
    borderRadius: "25px",
    fontStyle: "italic",
  },
  name: {
    background: "rgba(0, 0, 0, 0.8)",
    padding: "10px",
    paddingLeft: "25px",
    paddingBottom: "15px",
    fontSize: "110%",
    display: "flex",
    alignItems: "center",
  },
  heading: {
    ...InfoHeader,
    background: "rgba(0, 0, 0, 0.7)",
    marginBottom: "5px",
    marginTop: "15px",
  },
  row: {
    ...InfoRow,
    paddingLeft: "10px",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    lineHeight: 1,
  },
  icon: {
    paddingRight: "5px",
  },
  right: {
    marginLeft: "auto",
    paddingRight: "10px",
  },
  abilityBar: {
    overflow: "hidden",
    paddingRight: "3px",
  },
  barStart: {
    background: "black",
    borderTopLeftRadius: "25px",
    borderBottomLeftRadius: "25px",
    height: "12px",
    width: "90%",
    padding: "5px",
  },
  barMid: {
    background: "black",
    height: "12px",
    width: "90%",
    padding: "5px",
  },
  barEnd: {
    background: "black",
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    height: "12px",
    width: "90%",
    padding: "5px",
  },
  skillIconSlot: {
    background: "black",
    borderRadius: "20px",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    padding: "5px",
    aspectRatio: "1 / 1",
  },
  skillIconBorder: {
    border: "5px solid grey",
    borderRadius: "17px",
    width: "90%",
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  skillIconBorderXB: {
    background:
      "linear-gradient(black) padding-box, linear-gradient(to bottom, #fff339 0%, #eca321) border-box",
    border: "5px solid transparent",
  },
  styledButton: {
    ...styledButton,
    padding: "0 !important",
  },
  greyedOut: {
    height: "100%",
    width: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "18px",
  },
}));

const MobilePartyCharacterInfo = ({
  characterViewing,
  addPartyMember,
  removePartyMember,
}) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const party = cookies.get("partyMembers") ?? "";
  const [tooltipViewing, setTooltipViewing] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.container}>
        <Box className={classes.name}>
          {characterViewing.name}
          <span style={{ marginLeft: "auto", textAlign: "center" }}>
            <Box sx={{ marginBottom: "10px" }}>
              <span>Lv 60</span>
              <span style={{ color: "grey", fontSize: "90%" }}>/60</span>
            </Box>
            <HPBar width="6em" />
          </span>
        </Box>
        <Box sx={{ padding: "10px", paddingTop: 0, paddingBottom: "5px" }}>
          <Box className={classes.heading}>Status</Box>
          <Box className={classes.row}>
            <img src={IconHP} alt="HP" className={classes.icon} />
            HP
            <span className={classes.right}>{characterViewing.hp}</span>
          </Box>
          <Box className={classes.row}>
            <img src={IconAttack} alt="Attack" className={classes.icon} />
            Attack
            <span className={classes.right}>{characterViewing.attack}</span>
          </Box>
          <Box className={classes.row}>
            <img src={IconDefense} alt="Defense" className={classes.icon} />
            Defense
            <span className={classes.right}>{characterViewing.defense}</span>
          </Box>
          <Box className={classes.heading}>Basic Info</Box>
          <Grid container columnSpacing={3}>
            <Grid item size={6}>
              Attack Ability
              <Grid container className={classes.abilityBar}>
                <Grid item size={3}>
                  <img
                    src={
                      AbilityBars[characterViewing.ability_attack === 1 ? 1 : 0]
                    }
                    alt={`Ability Level 1`}
                    className={classes.barStart}
                    width={abilityBarWidth}
                  />
                </Grid>
                {[2, 3].map((x, i) => (
                  <Grid item size={3}>
                    <img
                      src={
                        AbilityBars[
                          x === characterViewing.ability_attack ? x : 0
                        ]
                      }
                      alt={`Ability Level ${x}`}
                      className={classes.barMid}
                      width={abilityBarWidth}
                    />
                  </Grid>
                ))}
                <Grid item size={3}>
                  <img
                    src={
                      AbilityBars[characterViewing.ability_attack === 4 ? 4 : 0]
                    }
                    alt={`Ability Level 4`}
                    className={classes.barEnd}
                    width={abilityBarWidth}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item size={6}>
              Break Ability
              <Grid container className={classes.abilityBar}>
                <Grid item size={3}>
                  <img
                    src={
                      AbilityBars[characterViewing.ability_break === 1 ? 1 : 0]
                    }
                    alt={`Ability Level 1`}
                    className={classes.barStart}
                    width={abilityBarWidth}
                  />
                </Grid>
                {[2, 3].map((x, i) => (
                  <Grid item size={3}>
                    <img
                      src={
                        AbilityBars[
                          x === characterViewing.ability_break ? x : 0
                        ]
                      }
                      alt={`Ability Level ${x}`}
                      className={classes.barMid}
                      width={abilityBarWidth}
                    />
                  </Grid>
                ))}
                <Grid item size={3}>
                  <img
                    src={
                      AbilityBars[characterViewing.ability_break === 4 ? 4 : 0]
                    }
                    alt={`Ability Level 4`}
                    className={classes.barEnd}
                    width={abilityBarWidth}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item size={6}>
              Support Ability
              <Grid container className={classes.abilityBar}>
                <Grid item size={3}>
                  <img
                    src={
                      AbilityBars[
                        characterViewing.ability_support === 1 ? 1 : 0
                      ]
                    }
                    alt={`Ability Level 1`}
                    className={classes.barStart}
                  />
                </Grid>
                {[2, 3].map((x, i) => (
                  <Grid item size={3}>
                    <img
                      src={
                        AbilityBars[
                          x === characterViewing.ability_support ? x : 0
                        ]
                      }
                      alt={`Ability Level ${x}`}
                      className={classes.barMid}
                    />
                  </Grid>
                ))}
                <Grid item size={3}>
                  <img
                    src={
                      AbilityBars[
                        characterViewing.ability_support === 4 ? 4 : 0
                      ]
                    }
                    alt={`Ability Level 4`}
                    className={classes.barEnd}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item size={6}>
              Operating Difficulty
              <Grid container className={classes.abilityBar}>
                <Grid item size={3}>
                  <img
                    src={AbilityBars[characterViewing.difficulty === 1 ? 1 : 0]}
                    alt={`Ability Level 1`}
                    className={classes.barStart}
                    width={abilityBarWidth}
                  />
                </Grid>
                {[2, 3].map((x, i) => (
                  <Grid item size={3}>
                    <img
                      src={
                        AbilityBars[x === characterViewing.difficulty ? x : 0]
                      }
                      alt={`Ability Level ${x}`}
                      className={classes.barMid}
                      width={abilityBarWidth}
                    />
                  </Grid>
                ))}
                <Grid item size={3}>
                  <img
                    src={AbilityBars[characterViewing.difficulty === 4 ? 4 : 0]}
                    alt={`Ability Level 4`}
                    className={classes.barEnd}
                    width={abilityBarWidth}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box className={classes.heading}>Skill</Box>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((x) => (
              <Grid item size={2.4} className={classes.skillIconSlot} key={x}>
                <Box className={classes.skillIconBorder}>
                  <ButtonBase onClick={() => setTooltipViewing(x)}>
                    <img
                      src={characterViewing.skillIcons[`slot${x}`]}
                      alt="Skill Slot"
                      height={skillSlotHeight}
                    />
                  </ButtonBase>
                </Box>
              </Grid>
            ))}
            <Grid item size={2.4} className={classes.skillIconSlot} key={5}>
              <Box
                className={`${classes.skillIconBorder} ${classes.skillIconBorderXB}`}
              >
                <ButtonBase onClick={() => setTooltipViewing(5)}>
                  <img
                    src={characterViewing.skillIcons[`slot5`]}
                    alt="XB Slot"
                    height={skillSlotHeight}
                  />
                </ButtonBase>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container columnSpacing={2}>
          <Grid item size={6}>
            <Button
              className={classes.styledButton}
              disableRipple
              {...(party.includes(characterViewing.name)
                ? { onClick: () => removePartyMember(characterViewing) }
                : {})}
            >
              {!party.includes(characterViewing.name) && (
                <Box className={classes.greyedOut}></Box>
              )}
              <img
                src={ButtonRemove}
                alt="Remove"
                style={{ height: "100%", width: "100%" }}
              />
            </Button>
          </Grid>
          <Grid item size={6}>
            <Button
              className={classes.styledButton}
              disableRipple
              {...(!party.includes(characterViewing.name)
                ? { onClick: () => addPartyMember(characterViewing) }
                : {})}
            >
              {party.includes(characterViewing.name) && (
                <Box className={classes.greyedOut}></Box>
              )}
              <img
                src={ButtonConfirm}
                alt="Confirm"
                style={{ height: "100%", width: "100%" }}
              />
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={tooltipViewing !== 0}
          onClose={() => setTooltipViewing(0)}
        >
          <SkillTooltip character={characterViewing} slot={tooltipViewing} />
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};
export default MobilePartyCharacterInfo;
