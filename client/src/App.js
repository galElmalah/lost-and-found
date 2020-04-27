import React from 'react';
import './App.css';
import { Map } from './components/Map';
import { ActionsBar } from './components/ActionsBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from './components/LoginPage/index';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CustomizedSnackbar({ open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen({ msg: null });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open.msg !== null}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={open.type}>
          {open.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

function App() {
  const [open, setOpen] = React.useState({ msg: null });

  return (
    <Switch>
      <Route
        exact
        path="/map"
        render={() => (
          <div className="App">
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <ActionsBar showAlert={setOpen} />
            <Map />
          </div>
        )}
      />

      <Route exact path="/" render={() => <LoginPage />} />
    </Switch>
  );
}

export default App;
