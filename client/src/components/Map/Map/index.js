import * as React from 'react';
import * as style from './Map.module.scss';

import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'

const position = [51.505, -0.09]
export const Map = (
  <LeafletMap center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </LeafletMap>
)