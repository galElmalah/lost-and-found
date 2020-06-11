import React, { createContext, useState, useEffect, useRef } from 'react';
import { useApi } from '../../customHooks/useApi';
export const MarkersContext = createContext();

export const MarkersProvider = ({ children }) => {
  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [draggableMarkerPosition, setDraggableMarker] = useState(null);
  const [center, setCenter] = useState(null);
  const { data: markers, setData: setMarkers } = useApi('/items', {
    initialData: [],
  });

  const { callApi } = useApi('/items', {
    method: 'post',
    invokeManually: true,
  });
  const refmarker = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInitialPosition([latitude, longitude]);
      });
    }
  }, []);

  const enableDraggableMarker = () => {
    const [lat, lan] = initialPosition;
    setDraggableMarker([lat + 0.01, lan + 0.01]);
  };

  const disableDraggableMarker = () => {
    setDraggableMarker(null);
  };

  const updateDraggableMarker = (e) => {
    const marker = refmarker.current;
    if (marker != null) {
      setDraggableMarker(marker.leafletElement.getLatLng());
    }
  };

  const addMarker = (marker) => {
    return callApi({ item: marker }).then(({ data }) => {
      setMarkers((_markers) => [..._markers, ...data]);
    });
  };

  const removeMarker = (id) => {
    setMarkers((_markers) => _markers.filter((marker) => marker.id !== id));
  };

  return (
    <MarkersContext.Provider
      value={{
        initialPosition,
        setInitialPosition,
        markers,
        addMarker,
        setMarkers,
        removeMarker,
        enableDraggableMarker,
        draggableMarkerPosition,
        updateDraggableMarker,
        refmarker,
        disableDraggableMarker,
        setCenter,
        center,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};
