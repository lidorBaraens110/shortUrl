import React,{FC}from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import CustomTheme from './assets/CustomThem';
import RedirectPage from './screens/RedirectPage';
import Page404 from './screens/Page404';
import Container from './screens/Container';


const App:FC=()=> {

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return (
    <ThemeProvider theme={CustomTheme}>
      <StylesProvider jss={jss}>
        <Router>
          <Switch>
            <Route exact path="/admin" component={Container} />
            <Route exact path='/Page404' component={Page404} />
            <Route path="/:id" component={RedirectPage} />
          </Switch>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
}


export default App;
