import React, { useState, useContext, createContext } from 'react';
import * as style from './Drawer.module.scss';
import MDrawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Slider,
  TextField,
} from '@material-ui/core';

const FilterList = () => {
  const autoCompleteOptions = [
    { title: 'key', year: 1994 },
    { title: 'animal', year: 1972 },
    { title: 'dog', year: 1974 },
    { title: 'cat', year: 2008 },
    { title: 'money', year: 1957 },
    { title: 'wallet', year: 1993 },
  ];
  const toggleFilters = [
    {
      title: 'losts',
      subtitle: 'show only losts entries',
    },
    {
      title: 'founds',
      subtitle: 'show only founds entries',
    },
    {
      title: 'my entries',
      subtitle: 'show only entries reported by me',
    },
    {
      title: 'my matches',
      subtitle: 'show only entries i matches with',
    },
  ];
  const [range, setRange] = React.useState(15);
  return (
    <List>
      <ListSubheader>Range Selector (radius)</ListSubheader>

      <ListItem>
        <Slider
          value={range}
          min={0}
          step={0.1}
          max={200}
          valueLabelFormat={(v) => v + 'km'}
          scale={(x) => x ** 10}
          onChange={(e, nv) => setRange(nv)}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </ListItem>

      <ListSubheader>Toggle Filters</ListSubheader>
      {toggleFilters.map(({ title, subtitle }) => (
        <>
          <ListItem dense button>
            <ListItemIcon>
              <Checkbox edge="start" checked={false} disableRipple />
            </ListItemIcon>
            <ListItemText primary={title} secondary={subtitle} />
          </ListItem>
          <Divider />
        </>
      ))}
      <ListSubheader>Categories</ListSubheader>
      <ListItem>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={autoCompleteOptions}
          getOptionLabel={(option) => option.title}
          defaultValue={[autoCompleteOptions[3]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="filterSelectedOptions"
              placeholder="Favorites"
            />
          )}
        />
      </ListItem>
      <ListSubheader>Colors</ListSubheader>
    </List>
  );
};
export const drawers = {
  FILTER: 'FILTER',
  MATCH: 'MATCH',
  MESSAGES: 'MESSAGES',
};
export const DrawerContext = createContext({});

export const DrawerProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState('');

  return (
    <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const Drawer = () => {
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const drawersMapping = {
    [drawers.FILTER]: () => <FilterList />,
  };
  return (
    <MDrawer
      anchor={'left'}
      open={!!openDrawer}
      onClose={() => setOpenDrawer('')}
    >
      {drawersMapping[openDrawer] ? drawersMapping[openDrawer]() : ''}
    </MDrawer>
  );
};
