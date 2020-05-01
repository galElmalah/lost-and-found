import React, { useState, useContext } from 'react';
import * as style from './ActionsBar.module.scss';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MarkersContext } from '../../providers/MapMarkersProvider/index';
import DateFnsUtils from '@date-io/date-fns';
export const ActionsBar = ({ showAlert }) => {
  const [openModal, setOpenModal] = useState(null);
  return (
    <div className={style.actionsBar}>
      <FoundModal
        showAlert={showAlert}
        isOpen={openModal === 'found'}
        handleClose={() => setOpenModal(null)}
      />
      <LostModal
        showAlert={showAlert}
        isOpen={openModal === 'lost'}
        handleClose={() => setOpenModal(null)}
      />

      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => {
            setOpenModal('found');
          }}
        >
          Found
        </Button>
        <Button
          onClick={() => {
            setOpenModal('lost');
          }}
        >
          Lost
        </Button>
      </ButtonGroup>
    </div>
  );
};

export const TransitionsModal = ({ isOpen, handleClose, children = '' }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      className={style.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>{children}</Fade>
    </Modal>
  );
};

const FoundModal = ({ isOpen, handleClose, showAlert }) => (
  <TransitionsModal isOpen={isOpen} handleClose={handleClose}>
    <ItemForm
      showAlert={showAlert}
      title={'Found Something'}
      entryType={'found'}
      handleClose={handleClose}
    />
  </TransitionsModal>
);

const LostModal = ({ isOpen, handleClose, showAlert }) => (
  <TransitionsModal isOpen={isOpen} handleClose={handleClose}>
    <ItemForm
      showAlert={showAlert}
      title={'Lost Something'}
      entryType={'lost'}
      handleClose={handleClose}
    />
  </TransitionsModal>
);

const ItemForm = ({ entryType, handleClose, title, showAlert }) => {
  const {
    enableDraggableMarker,
    disableDraggableMarker,
    addMarker,
    initialPosition,
    draggableMarkerPosition,
  } = useContext(MarkersContext);
  const [useCurrentLocation, setUseCurrentLocation] = useState(
    draggableMarkerPosition ? false : true
  );
  const [name, setName] = React.useState('');
  const [selectedDate, handleDateChange] = useState(new Date());
  const [description, setDescription] = React.useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const resetForm = () => {
    setDescription('');
    setName('');
    disableDraggableMarker();
  };
  return (
    <div className={style.modalContent}>
      <h2>{title}</h2>
      <form className={style.form} noValidate autoComplete="off">
        {useCurrentLocation ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={useCurrentLocation}
                onClick={() => setUseCurrentLocation((_) => !_)}
                color="primary"
              />
            }
            label="Use my location"
          />
        ) : (
          <Button
            onClick={() => {
              enableDraggableMarker();
              handleClose();
            }}
          >
            Select a location using the map
          </Button>
        )}
        <TextField
          onChange={handleNameChange}
          value={name}
          required
          id="standard-basic"
          label="Item name"
        />
        <TextField
          onChange={handleDescriptionChange}
          value={description}
          required
          id="standard-textarea"
          label="Item description"
          placeholder="Placeholder"
          multiline
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={selectedDate}
            onChange={(e) => {
              handleDateChange(e.toUTCString());
            }}
          />
        </MuiPickersUtilsProvider>
        <div className={style.btns}>
          <Button
            onClick={async () => {
              if (name && description) {
                await addMarker({
                  name,
                  description,
                  entryType,
                  location: useCurrentLocation
                    ? initialPosition
                    : draggableMarkerPosition,
                  lostOrFoundAt: selectedDate,
                });
                showAlert({
                  msg: 'Entry created successfully!',
                  entryType: 'success',
                });
                resetForm();
                handleClose();
              } else {
                showAlert({
                  msg: 'Name and description are mandatory fields!',
                  type: 'error',
                });
              }
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              resetForm();
              handleClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
