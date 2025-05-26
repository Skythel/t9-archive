import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import { useMediaQuery } from 'react-responsive';
// import '@fontsource/noto-sans/400.css';
// import '@fontsource/noto-sans/500.css';
// import '@fontsource/noto-sans/600.css';
// import '@fontsource/noto-sans/800.css';
import './App.css';
import TopBar from './components/TopBar';
import Content from './components/Content';
import MobileTopBar from "./mobile/MobileTopBar";
import MobileContent from "./mobile/MobileContent";
import {
  BrowserRouter as Router,
} from "react-router-dom";

const bg = require('./assets/bg/bg_130103.jpg');

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "10px",
    overflow: "hidden",
  }
}));

const App = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container className={classes.container} maxWidth={false} disableGutters>
          {isDesktopOrLaptop && (<>
            <TopBar />
            <Content />
          </>)}
          {isTabletOrMobile && (<>
            <MobileTopBar />
            <MobileContent />
          </>)}
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
