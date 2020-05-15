import React, { useContext } from 'react';
import * as style from './Map.module.scss';

import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import { MarkersContext } from '../../providers/MapMarkersProvider/index';
import { UserDetailsContext } from '../../providers/UserDetailsProvider';
import { Redirect } from 'react-router-dom';
import {
  redMarker,
  greenMarker,
  blueMarker,
} from '../../providers/MapMarkersProvider/markersConfig';

export const Map = () => {
  const {
    initialPosition,
    markers,
    draggableMarkerPosition,
    updateDraggableMarker,
    refmarker,
  } = useContext(MarkersContext);
  const { userDetails } = useContext(UserDetailsContext);
  if (!userDetails.name) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ height: '100vh' }}>
      <LeafletMap
        className={style.map}
        center={draggableMarkerPosition || initialPosition}
        zoom={12}
        dragging={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map(CustomMarker)}
        {draggableMarkerPosition && (
          <Marker
            className={style.dragMarker}
            draggable={true}
            onDragend={updateDraggableMarker}
            position={draggableMarkerPosition}
            ref={refmarker}
          >
            <Popup>Draggable marker</Popup>
          </Marker>
        )}
      </LeafletMap>
    </div>
  );
};

const CustomMarker = ({
  location,
  name,
  lostOrFoundAt,
  description,
  entryType,
  type,
  id,
  color,
}) => {
  const spanStyle = {
    color: color,
    backgroundColor: color,
    height: '17px',
    width: '70%',
    position: 'relative',
    top: '4px',
  };
  return (
    <Marker
      key={id}
      position={location}
      icon={entryType === 'found' ? greenMarker : redMarker}
    >
      <Popup>
        <span className={style.popoverContainer}>
          <p className={style.descriptionItem}>{description}</p>
          <p className={style.informationItem}>
            <span>Date:</span>
            {lostOrFoundAt}
          </p>
          <p className={style.informationItem}>
            <span>Category:</span>Key
          </p>
          <p className={style.informationItem}>
            <span>By:</span>Zeitoun Yoel
          </p>
          {color && (
            <p className={style.informationItem}>
              <span>Color:</span>
              <span clasName={style.colorItem} style={spanStyle}></span>
            </p>
          )}
        </span>
      </Popup>
    </Marker>
  );
};
