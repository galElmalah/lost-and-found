import React from 'react';
import { MarkersContext } from '../../../providers/MapMarkersProvider/index';
import Axios from 'axios';
import * as style from './FilterList.module.scss';

import throttle from 'lodash/throttle';
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
import { ColorPicker } from '../../Utility';
import { UserDetailsContext } from '../../../providers/UserDetailsProvider/index';

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

export const FilterList = React.memo(
  () => {
    const { userDetails, labels } = React.useContext(UserDetailsContext);
    const { setMarkers } = React.useContext(MarkersContext);
    const [toggels, setToggels] = React.useState({});
    const [activeLabels, setActiveLabels] = React.useState([]);
    const [range, setRange] = React.useState(15);
    const ref = React.useRef(
      throttle((query) => {
        Axios.get(`http://localhost:3001/items${query}`).then(({ data }) => {
          setMarkers(data);
        });
      }, 300)
    ).current;

    const buildQuery = () => {
      const toggelsQuery = Object.entries(toggels)
        .filter(([key, val]) => val)
        .map(([key, val]) => `${key.toLowerCase()}=${val}`)
        .join('&');
      const labelsQuery = activeLabels.length
        ? `labels=${activeLabels.join(',')}`
        : '';

      return `?range=${range}&${toggelsQuery}${
        labelsQuery ? `&${labelsQuery}` : ''
      }`;
    };

    React.useEffect(() => {
      ref(buildQuery());
    }, [toggels, activeLabels, range]);

    return (
      <List className={'slide-filter-bar'}>
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
            onChange={(e, selected) =>
              setActiveLabels(selected.map((_) => _.title))
            }
            options={Object.values(labels)
              .reduce((acc, n) => [...acc, ...n], [])
              .map((v) => ({ title: v }))}
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
