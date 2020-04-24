import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
export const MarkersContext = createContext();

export const MarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [draggableMarkerPosition, setDraggableMarker] = useState(null);

  const refmarker = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setInitialPosition([latitude, longitude]);
      });
    }
  }, []);

  useEffect(() => {

      axios
        .get('http://localhost:3001/items')
        .then(({ data }) => setMarkers(data));

  }, []);

  const enableDraggableMarker = () => {
    const [lat, lan] = initialPosition;
    setDraggableMarker([lat + 0.01, lan + 0.01]);
  };

  const disableDraggableMarker = () => {
    setDraggableMarker(null);
  };

  const updateDraggableMarker = e => {
    const marker = refmarker.current;
    if (marker != null) {
      setDraggableMarker(marker.leafletElement.getLatLng());
    }
  };

  const addMarker = marker => {
    return axios
      .post('http://localhost:3001/items', { item: marker })
      .then(({ data }) =>
        setMarkers(_markers => [..._markers, { ...marker, id: data.id }]),
      );
  };

  const removeMarker = id => {
    setMarkers(_markers => _markers.filter(marker => marker.id !== id));
  };

  return (
    <MarkersContext.Provider
      value={{
        initialPosition,
        setInitialPosition,
        markers,
        addMarker,
        removeMarker,
        enableDraggableMarker,
        draggableMarkerPosition,
        updateDraggableMarker,
        refmarker,
        disableDraggableMarker,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};
