import * as React from "react";
import { useRef, useState, useEffect } from "react";

interface MapProps extends google.maps.MapOptions { // extends the MapOptions interface from the Google Maps JavaScript API
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
  }
  
  function Map({
    onClick,
    onIdle,
    children,
    style,
    ...options
  }: MapProps) {
    const ref = useRef<HTMLDivElement>(null); // creates reference to div element
    const [map, setMap] = useState<google.maps.Map>();
    
    useEffect(() => { // sets map just once
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, [ref, map]); // specifies useEffect should run whenever ref or map changes
  
    useEffect(() => { 
      if (map) {
        map.setOptions(options);
      }
    }, [map, options]); 
  
    useEffect(() => {
      if (map) {
        ["click", "idle"].forEach((eventName) =>
          google.maps.event.clearListeners(map, eventName)
        );
  
        if (onClick) {
          map.addListener("click", onClick);
        }
  
        if (onIdle) {
          map.addListener("idle", () => onIdle(map));
        }
      }
    }, [map, onClick, onIdle]);
  
    return (
      <>
        <div ref={ref} style={style} />
        {React.Children.map(children, (child) => { // places the red points onto the map
          if (React.isValidElement(child)) {
            // set the map prop on the child component
            // @ts-ignore
            return React.cloneElement(child, { map });
          }
        })}
      </>
    );
  };

  export default Map;