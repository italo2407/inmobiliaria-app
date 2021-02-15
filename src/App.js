import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import ListaInmuebles from './componentes/vistas/ListaInmuebles';
import AppNavBar from './componentes/layout/AppNavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import { FirebaseContext } from './server';

import { useStateValue } from './session/store';
import { Snackbar } from '@material-ui/core';

function App(props){
  let firebase = React.useContext(FirebaseContext);
  const [authenticacionIniciada, setupFirebaseInicial] = React.useState(false);
  const [{openSnackbar}, dispatch] = useStateValue();

  useEffect(() => {
    firebase.estaIniciado()
      .then( val => {
        setupFirebaseInicial(val);
      })
  })

  return authenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        open={openSnackbar ? openSnackbar.open : false}
        autoHidenDuration={300}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.message : ""}
          </span>
        }
        onClose = {() => 
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open : false,
              mensaje: ""
            }
          })
        }
      />
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavBar />
          <Grid container>
            <Switch>
              <Route path="/" exact component={ListaInmuebles}></Route>
              <Route path="/auth/registrarUsuario" exact component={RegistrarUsuario}></Route>
              <Route path="/auth/login" exact component={Login}></Route>
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  ) : null;
}

export default App;
