import React,{createContext, useState, useEffect,useRef} from 'react'

export const MarkersContext = createContext();

export const MarkersProvider = ({children}) => {
  const [markers, setMarkers] =useState([]);
  const [initialPosition, setInitialPosition] = useState([0,0]);
  const [draggableMarkerPosition,setDraggableMarker] = useState(null)

  const refmarker = useRef()

  const  enableDraggableMarker = () => {
    const [lat,lan]= initialPosition
    setDraggableMarker([lat + 0.01,lan + 0.01])
  }

  const  disableDraggableMarker = () => {
    const [lat,lan]= initialPosition
    setDraggableMarker(null)
  }

  const updateDraggableMarker = (e) => {
    const marker = refmarker.current
    if (marker != null) {
      setDraggableMarker(marker.leafletElement.getLatLng())
    }
  }

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        setInitialPosition([latitude, longitude])
      })
    }
  }, []) 

  const addMarker = (marker) => {
    setMarkers(_markers => [..._markers,marker])
  }

  const removeMarker = (id) => {
    setMarkers(_markers => _markers.filter((marker) => marker.id !== id))
  }


  return <MarkersContext.Provider value={{
    initialPosition,
    setInitialPosition,
    markers,
    addMarker,
    removeMarker,
    enableDraggableMarker,
    draggableMarkerPosition,
    updateDraggableMarker,
    refmarker,
    disableDraggableMarker
  }}>
    {children}
  </MarkersContext.Provider>
}