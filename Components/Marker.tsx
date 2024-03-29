import { useState, useEffect } from "react";

function Marker(options: any) {
    const [marker, setMarker] = useState<google.maps.Marker>();
  
    useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
  
    useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
  
    return null;
  };
  
export default Marker;