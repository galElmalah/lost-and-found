import React, {useContext} from 'react';
import * as style from './Map.module.scss';

import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { MarkersContext } from '../../providers/MapMarkersProvider/index';

export const Map = () => {
  const {initialPosition, markers,draggableMarkerPosition,updateDraggableMarker,refmarker} = useContext(MarkersContext)
    
  return <div style={{height:'100vh'}}>
  <LeafletMap className={style.map} center={draggableMarkerPosition || initialPosition} zoom={12}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    {markers.map(CustomMarker)}
    {draggableMarkerPosition && 
    <Marker 
        className={style.dragMarker}
          draggable={true}
          onDragend={updateDraggableMarker}
          position={draggableMarkerPosition}
          ref={refmarker}>
      <Popup>Draggable marker</Popup>
    </Marker>
    }
  </LeafletMap>
  </div>
}

const CustomMarker =({location,name,description, type,id}) => <Marker key={id} position={location}>
<Popup>
  <span className={style.popoverContainer}>
  <h4>Type:</h4>
  <p>{type}</p>
  <h4>Name:</h4>
  <p>{name}</p>
  <h4>Description:</h4>
  <p>{description}</p>
  </span>
</Popup>

</Marker>