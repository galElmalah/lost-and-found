import React, {useState, useContext} from 'react';
import * as style from './ActionsBar.module.scss';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MarkersContext } from '../../providers/MapMarkersProvider/index';

export const ActionsBar = () => {
  const [openModal, setOpenModal] = useState(null)
  return <div className={style.actionsBar}>
    <FoundModal isOpen={openModal === 'found'} handleClose={() => setOpenModal(null)}/>
    <LostModal isOpen={openModal === 'lost'} handleClose={() => setOpenModal(null)}/>
<ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
  <Button onClick={() => {
    setOpenModal('found')
  }}>Found</Button>
  <Button onClick={() => {
    setOpenModal('lost')
  }}>Lost</Button>
</ButtonGroup>
  </div>;
};




export  const TransitionsModal =({isOpen, handleClose, children = ''}) => {

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
        <Fade in={isOpen}>
          {children}
        </Fade>
      </Modal>
  );
}

const FoundModal = ({isOpen, handleClose}) =>  <TransitionsModal isOpen={isOpen} handleClose={handleClose}>
    <ItemForm title={'Found Something'} type={'found'} handleClose={handleClose}/>
  </TransitionsModal>


const LostModal = ({isOpen, handleClose}) =>  <TransitionsModal isOpen={isOpen} handleClose={handleClose}>
    <ItemForm title={'Lost Something'} type={'lost'} handleClose={handleClose}/>
  </TransitionsModal>


const ItemForm = ({type, handleClose, title}) => {
  const {enableDraggableMarker,disableDraggableMarker, addMarker, initialPosition, draggableMarkerPosition} = useContext(MarkersContext)
  const [useCurrentLocation, setUseCurrentLocation] = useState(draggableMarkerPosition ? false :true)
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const resetForm = () => {
    setDescription('')
    setName('')
    disableDraggableMarker()
  }
  return <div className={style.modalContent}>
  <h2>{title}</h2>
  <form className={style.form} noValidate autoComplete="off">
  {useCurrentLocation ? <FormControlLabel
    control={
      <Checkbox
        checked={useCurrentLocation}
        onClick={() => setUseCurrentLocation(_ => !_)}
        color="primary"
      />
    }
    label="Use my location"
  /> : <Button onClick={() => {
    enableDraggableMarker()
    handleClose()
}}>Select a location using the map</Button>}
    <TextField onChange={handleNameChange} value={name} required id="standard-basic" label="Item name" />
    <TextField
      onChange={handleDescriptionChange} 
      value={description}
      required
      id="standard-textarea"
      label="Item description"
      placeholder="Placeholder"
      multiline
    />
    <div className={style.btns}>
     <Button onClick={() => {
       if(name && description) {
        addMarker({name, description, type,position: useCurrentLocation ? initialPosition : draggableMarkerPosition})
        resetForm()
        handleClose()
       } else {
         alert('name and description are mandatory fields')
       }

       
}}>Submit</Button>
<Button onClick={() => {
  resetForm()
  handleClose()

}}>Cancel</Button>
</div>
  </form>
</div>
}