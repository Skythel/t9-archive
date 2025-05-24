import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, Tooltip } from "@mui/material";

const IconMenu = require('../assets/topbar/ui_common_icon_header_menu_navigation.png');
const IconSynchro = require('../assets/topbar/ui_common_icon_header_gacha_navigation.png');
const IconCalendar = require('../assets/topbar/ui_common_icon_header_event_navigation.png');
const IconDailies = require('../assets/topbar/ui_common_icon_header_happywoker_navigation.png');
const IconBag = require('../assets/topbar/ui_common_icon_header_bag_navigation.png');
const IconParty = require('../assets/topbar/ui_common_icon_header_teamedit_navigation.png');
const IconCharacter = require('../assets/topbar/ui_common_icon_header_character_navigation.png');
const IconCards = require('../assets/topbar/ui_common_icon_header_tensioncard_navigation.png');
const IconNINE = require('../assets/topbar/ui_common_icon_header_tips_navigation.png');
const IconLogo = require('../assets/topbar/ui_common_icon_detailmenu_battlepass_armed.png');

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  topbar: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "25px",
    display: "inline-block",
    padding: "10px",
    margin: 0,
  },
  topbarItem: {
    display: "inline",
    color: "#ffffff",
    paddingRight: '10px',
  }
}));

const defaultSize = 28;

const MobileTopBar = ({ setCurrentPage }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <ul className={classes.topbar}>
          <Tooltip title="Logo">
            <span>
              <IconButton><img src={IconLogo} alt="Logo Button" height={defaultSize * 1.2} /></IconButton>
            </span>
          </Tooltip>
          <li className={classes.topbarItem}>
            <Tooltip title="Menu">
              <span>
                <IconButton><img src={IconMenu} alt="Menu Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Synchro">
              <span>
                <IconButton onClick={() => setCurrentPage("Synchro")}><img src={IconSynchro} alt="Synchro Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Calendar">
              <span>
                <IconButton onClick={() => setCurrentPage("Calendar")}><img src={IconCalendar} alt="Calendar Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Dailies">
              <span>
                <IconButton onClick={() => setCurrentPage("Dailies")}><img src={IconDailies} alt="Dailies Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Bag">
              <span>
                <IconButton onClick={() => setCurrentPage("Bag")}><img src={IconBag} alt="Bag Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Party">
              <span>
                <IconButton onClick={() => setCurrentPage("Party")}><img src={IconParty} alt="Party Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Character">
              <span>
                <IconButton onClick={() => setCurrentPage("Character")}><img src={IconCharacter} alt="Character Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Cards">
              <span>
                <IconButton onClick={() => setCurrentPage("Cards")}><img src={IconCards} alt="Cards Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="NINE">
              <span>
                <IconButton onClick={() => setCurrentPage("NINE")}><img src={IconNINE} alt="NINE Button" height={defaultSize} /></IconButton>
              </span>
            </Tooltip>
          </li>
        </ul>
      </div>
    </ThemeProvider>
  )
};
export default MobileTopBar;
