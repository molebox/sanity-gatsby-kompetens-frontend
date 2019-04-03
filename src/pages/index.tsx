import * as React from 'react';
import { Link } from "gatsby"
import * as styles from './Index.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Search from './Search';
import Intro from './Intro';
import { Button } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#005056',
      main: '#005056',
      dark: '#005056',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4C3735',
      main: '#4C3735',
      dark: '#4C3735',
      contrastText: '#fff',
    }
  }
});

export default function IndexPage() {

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.container}>
          <div className={styles.header}/>
          <div className={styles.welcomeText}>
            <h1>Matcher dina kompetenser mot arbetsgivare i Örnsköldsvik</h1>
            <h3>
            Vi ser kompetensförsörjning som en förutsättning för att bryta en negativ trend med flera tydliga bristbranscher på arbetsmarknaden, såväl lokalt som nationellt. 
            I många fall avgör kompetensförsörjning förutsättningar för tillväxt, i andra fall är kompetensförsörjning avgörande för verksamheters vidare existens. 
            Örnsköldsviks kommun står inför samma utmaningar som övriga kommuner, utmaningar om att hitta rätt kompetenser för att kommunen ska fortsätta utvecklas.
            </h3>
            <Button variant="contained" color="primary"><a href="#search">Search Now</a></Button>
          </div>
          <div className={styles.intro}>
            <Intro />
          </div>
          <div id="search" className={styles.search}>
            <Search />
          </div>
          <div className={styles.footer}/>
        </div>
      </MuiThemeProvider>
    );
}
