import React, { useState, useContext, createContext, useEffect } from 'react';
import * as style from './Drawer.module.scss';
import MDrawer from '@material-ui/core/Drawer';
import { FilterList } from './FilterList';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Slider,
  TextField,
} from '@material-ui/core';
import { ColorPicker } from '../Utility';
import { UserDetailsContext } from '../../providers/UserDetailsProvider/index';

import { MarkersContext } from '../../providers/MapMarkersProvider/index';
import Axios from 'axios';
import throttle from 'lodash/throttle';
const autoCompleteOptions = [
  { title: 'keys' },
  { title: 'red' },
  { title: 'yoel' },
  { title: 'cat' },
  { title: 'money' },
  { title: 'wallet' },
];
const toggleFilters = [
  {
    value: 'LOSTS',
    title: 'losts',
    subtitle: 'show only losts entries',
  },
  {
    value: 'FOUNDS',
    title: 'founds',
    subtitle: 'show only founds entries',
  },
  {
    value: 'USER_ENTRIES',
    title: 'my entries',
    subtitle: 'show only entries reported by me',
  },
  {
    value: 'MATCHES',
    title: 'my matches',
    subtitle: 'show only entries i matches with',
  },
];

const FilterList = React.memo(
  () => {
    const { userDetails } = React.useContext(UserDetailsContext);
    const { setMarkers } = React.useContext(MarkersContext);
    const [toggels, setToggels] = React.useState({});
    const [labels, setLabels] = React.useState([]);
    const [range, setRange] = React.useState(15);
    const ref = React.useRef(
      throttle((query) => {
        console.log('called');
        Axios.get(`http://localhost:3001/items${query}`).then(({ data }) => {
          setMarkers(data);
          console.log(data);
        });
      }, 300)
    ).current;

    const buildQuery = () => {
      const toggelsQuery = Object.entries(toggels)
        .filter(([key, val]) => val)
        .map(([key, val]) => `${key.toLowerCase()}=${val}`)
        .join('&');
      const labelsQuery = labels.length ? `labels=${labels.join(',')}` : '';

      return `?range=${range}&${toggelsQuery}${
        labelsQuery ? `&${labelsQuery}` : ''
      }`;
    };

    React.useEffect(() => {
      ref(buildQuery());
    }, [toggels, labels, range]);

    console.log('shit');
    return (
      <List className='slideFilterBar'>
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
        {toggleFilters.map(({ title, subtitle, value }) => (
          <>
            <ListItem dense button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={toggels[value]}
                  disableRipple
                  onChange={() => {
                    if (value === 'USER_ENTRIES') {
                      console.log('hereeee');
                      if (toggels[value]) {
                        setToggels((prevToggels) => ({
                          ...prevToggels,
                          [value]: prevToggels[value]
                            ? false
                            : userDetails.googleId,
                        }));
                        return;
                      }
                      setToggels((prevToggels) => ({
                        ...prevToggels,
                        [value]: userDetails.googleId,
                      }));
                      return;
                    }
                    if (toggels[value]) {
                      setToggels((prevToggels) => ({
                        ...prevToggels,
                        [value]: !prevToggels[value],
                      }));
                      return;
                    }
                    setToggels((prevToggels) => ({
                      ...prevToggels,
                      [value]: true,
                    }));
                  }}
                />
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
            className={style.autocomplete}
            id="tags-outlined"
            onChange={(e, selected) => setLabels(selected.map((_) => _.title))}
            options={autoCompleteOptions}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="filterSelectedOptions"
                placeholder="categories"
              />
            )}
          />
        </ListItem>
        <ListSubheader>Colors</ListSubheader>
        <ListItem>
          <ColorPicker />
        </ListItem>
      </List>
    );
  },
  () => true
);
export const drawers = {
  FILTER: 'FILTER',
  MATCH: 'MATCH',
  MESSAGES: 'MESSAGES',
};

const matches = [
  { name: 'first match', description: 'yeahhhh' },
  { name: 'second match', description: 'yeahhhh' },
  { name: 'thired match', description: 'yeahhhh' },
  { name: 'fourth match', description: 'yeahhhh' },
  { name: 'fifth match', description: 'yeahhhh' },
];

const AnimatedItem = ({ pos, children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    const animationId = setTimeout(() => setShouldAnimate(true), pos * 200);
    return () => clearTimeout(animationId);
  }, []);
  return (
    <div className={`${style.defualt} ${shouldAnimate ? style.animate : ''}`}>
      {children}
    </div>
  );
};

const UserMatchesList = () => {
  return (
    <div className={style.matches}>
      {matches.map((m, i) => {
        return (
          <AnimatedItem pos={i} key={i}>
            <ExpansionPanel className={style.matchPanel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{m.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </AnimatedItem>
        );
      })}
    </div>
  );
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
    [drawers.MATCH]: () => <UserMatchesList />,
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
