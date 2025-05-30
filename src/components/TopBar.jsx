import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

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
    borderRadius: "50px",
    display: "inline-block",
  },
  topbarItem: {
    display: "inline",
    color: "#ffffff",
    paddingRight: '20px',
  }
}));

const defaultSize = 42;

const TopBar = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Tooltip title="Logo" style={{ paddingRight: "15px" }}>
          <Link to="./">
            <IconButton><img src={IconLogo} alt="Logo Button" height={defaultSize * 1.5} /></IconButton>
          </Link>
        </Tooltip>
        <ul className={classes.topbar}>
          <li className={classes.topbarItem}>
            <Tooltip title="Menu">
              <Link to="./">
                <IconButton><img src={IconMenu} alt="Menu Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Synchro">
              <Link to="./">
                <IconButton><img src={IconSynchro} alt="Synchro Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Calendar">
              <Link to="./">
                <IconButton><img src={IconCalendar} alt="Calendar Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Dailies">
              <Link to="./">
                <IconButton><img src={IconDailies} alt="Dailies Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Bag">
              <Link to="./">
                <IconButton><img src={IconBag} alt="Bag Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Party">
              <Link to="./">
                <IconButton><img src={IconParty} alt="Party Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Character">
              <Link to="./characters">
                <IconButton><img src={IconCharacter} alt="Character Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="Cards">
              <Link to="./tension-cards">
                <IconButton><img src={IconCards} alt="Cards Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
          <li className={classes.topbarItem}>
            <Tooltip title="NINE">
              <Link to="./chat">
                <IconButton><img src={IconNINE} alt="NINE Button" height={defaultSize} /></IconButton>
              </Link>
            </Tooltip>
          </li>
        </ul>
      </div>
    </ThemeProvider>
  )
};
export default TopBar;
