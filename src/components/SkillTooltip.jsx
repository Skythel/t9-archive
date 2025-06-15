import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  tooltipContainer: {
    background: "#181818",
    padding: "30px",
    color: "white",
  },
}));

const SkillTooltip = ({ character, slot }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.tooltipContainer}>Under development, check back later!</Box>
    </ThemeProvider>
  );
};

export default SkillTooltip;
