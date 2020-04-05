import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from './components/Map';
import { ActionsBar } from './components/ActionsBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export function CustomizedSnackbar({ open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen({ msg: null });
  };
  console.log(open);
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
    <div className='App'>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <ActionsBar showAlert={setOpen} />
      <Map />
    </div>
  );
}

export default App;
