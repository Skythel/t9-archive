import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { closeButton } from "../vars/Icons";
import { closeButtonStyled } from "../vars/Styles";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  closeButtonStyled,
  chatFilter: {
    overflow: "auto",
    padding: "20px",
    background: "#111111 !important",
    color: "white !important",
  },
}));

const ChatFilter = ({ setShowFilter, setFilterCharacter, setFilterType }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.chatFilter}>
        <Box
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <h2 className={classes.filterHeading}>Filter</h2>
          <IconButton
            onClick={() => setShowFilter(false)}
            style={{ alignSelf: "flex-end", marginLeft: "auto" }}
            className={classes.closeButtonStyled}
          >
            <img src={closeButton} alt="Close Filter" height={36} />
          </IconButton>
        </Box>
        Chat filtering will be added soon!
        {/* <h3>Filter by character</h3>
        <Box className={classes.scrollable}>

        </Box>
        <h3>Filter by type</h3>
         */}
      </Card>
    </ThemeProvider>
  );
};

export default ChatFilter;
