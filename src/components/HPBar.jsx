import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  hpBar: {
    background:
      "linear-gradient(to right, #0ffb4d 0%, #d6f22d) border-box",
    borderRadius: "50px",
    height: "10px",
  },
}));

const HPBar = ({ width }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.hpBar} sx={{ width }} />
    </ThemeProvider>
  );
};

export default HPBar;
