import React, { useState, useContext, createContext, useEffect } from 'react';
import * as style from './Drawer.module.scss';
import MDrawer from '@material-ui/core/Drawer';
import { FilterList } from './FilterList';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MarkersContext } from '../../providers/MapMarkersProvider';
import { UserDetailsContext } from '../../providers/UserDetailsProvider';
import { Divider } from '@material-ui/core';

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
  const { markers, setCenter } = useContext(MarkersContext);
  const { userDetails } = useContext(UserDetailsContext);

  const getUserMatches = () => {
    return markers
      .filter(
        (m) => m.reporter.id === userDetails.googleId && m.matches.length > 0
      )
      .map(({ name, _id, matches, description, location }) => ({
        name,
        _id,
        location,
        matches,
        description,
      }));
  };

  return (
    <div className={style.matches}>
      {getUserMatches().map((m, i) => {
        return (
          <AnimatedItem pos={i} key={i}>
            <ExpansionPanel className={style.matchPanel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{m._id}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: 'block' }}>
                {[...m.matches]
                  .sort((a, b) => a.score - b.score)
                  .reverse()
                  .map((match) => (
                    <>
                      <div className={style.matchContainer}>
                        <Tooltip
                          title={match.matchedWithEntryId}
                          aria-label="add"
                          placement="top"
                        >
                          <Typography align="left" className={style.match}>
                            match id:{' '}
                            {match.matchedWithEntryId.slice(0, 5) + '...'}
                          </Typography>
                        </Tooltip>
                        <Typography align="left" className={style.match}>
                          match score: {match.score}
                        </Typography>
                        <Button
                          align="left"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setCenter(match.location);
                          }}
                        >
                          Go to match
                        </Button>
                      </div>
                      <Divider />
                    </>
                  ))}
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
