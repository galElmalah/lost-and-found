import React, { useContext, useState, useEffect } from 'react';
import * as style from './Drawer.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { MarkersContext } from '../../providers/MapMarkersProvider';
import { UserDetailsContext } from '../../providers/UserDetailsProvider';
import { Divider, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExploreIcon from '@material-ui/icons/Explore';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useApi } from '../../customHooks/useApi';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '10px',
  },
}));

export const UserSettingsPanel = () => {
  const { markers, setCenter, refreshMarkers } = useContext(MarkersContext);
  const { userDetails } = useContext(UserDetailsContext);
  const [openPanels, setOpenPanels] = useState({});
  const { callApi } = useApi('', { method: 'delete', invokeManually: true });

  const handleDeleteClick = (id) => () => {
    callApi({}, `/items/${id}`).then(() => {
      refreshMarkers();
    });
  };

  const handleEditClick = (id) => () => {
    // open modal with relevant data
  };
  const togglePanel = (key) => () => {
    if (openPanels[key]) {
      setOpenPanels((p) => ({ ...p, [key]: !p[key] }));
      return;
    }
    setOpenPanels((p) => ({ ...p, [key]: true }));
  };
  const isPanelOpen = (key) => openPanels[key];
  const classes = useStyles();

  const getUsersMarkers = () =>
    markers.filter((m) => m.reporter.id === userDetails.googleId);

  return (
    <div className={style.settingsPanel}>
      <div className={style.userDetails}>
        <Tooltip title={userDetails.name}>
          <Avatar className={style.avatar}>
            {userDetails.givenName[0] + userDetails.familyName[0]}
          </Avatar>
        </Tooltip>
        <Typography>{userDetails.email}</Typography>
      </div>
      <Divider />

      <Divider />
      <List>
        <ListItem button onClick={togglePanel('map_settings')}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Map Settings" />
          {isPanelOpen('map_settings') ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isPanelOpen('map_settings')} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={togglePanel('manage_entries_settings')}>
          <ListItemIcon>
            <EditLocationIcon />
          </ListItemIcon>
          <ListItemText primary="Manage User Entries" />
          {isPanelOpen('manage_entries_settings') ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItem>
        <Collapse
          in={isPanelOpen('manage_entries_settings')}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {getUsersMarkers().map((m) => (
              <ListItem button>
                <ListItemText primary="Starred" />
                <Fab
                  size="small"
                  color="primary"
                  aria-label="edit"
                  className={classes.root}
                >
                  <EditIcon />
                </Fab>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="delete"
                  onClick={handleDeleteClick(m._id)}
                >
                  <DeleteIcon />
                </Fab>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
};
