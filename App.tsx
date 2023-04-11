/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { createRoot } from "react-dom/client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Button, TextField} from '@mui/material';
import Input from '@mui/joy/Input';
import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from "react";

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#fca5a5',
      darker: '#053e85',
    },
    neutral: {
      main: '#f7ba2a',
      contrastText: '#fff',
    },
  },
});

const API_KEY = "AIzaSyCOa-L3GUCCSp4NJ8CCf6ZEsXHB0TlJmh8"

function App() {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]); // stores a LatLngLiteral object
  const [zoom, setZoom] = useState(3);
  const [popUp, setPopUp] = useState(false);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
      lat: 0,
      lng: 0,
  });

  useEffect(() => { // for generate link popup to turn off automatically every 2 seconds
    const interval = setInterval(() => {
        setPopUp(false);
    }, 2000);
    return () => clearInterval(interval);
    }, []);
  
  function onClick(e: google.maps.MapMouseEvent) {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]); // ! is non-null assertion
  };

  function clearPlaces() {
    setClicks([]);
  }

  function onIdle(m: google.maps.Map) {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  function generateLink() {
    let returnLink = "https://marvelous-heliotrope-713170.netlify.app/?entities="
    // 41.826835_-71.399710,41.827835_-71.399710
    {clicks.map((latLng, i) => (
      // returnLink += JSON.stringify(latLng.toJSON(), null, 2)
      returnLink += latLng.lat() + "_" + latLng.lng() + ","
    ))}
    returnLink = returnLink.slice(0,-1);

    let textField = document.createElement('textarea'); // pop up for copying text button
    textField.innerText = returnLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setPopUp(true);
  }
  


  const form = ( // form on right hand side
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <ThemeProvider theme={theme}>
      <Button color="neutral" variant="outlined" onClick = {() => generateLink()}>Generate Link
      </Button>
      </ThemeProvider>
      <label style={{color: '#d0b277', fontWeight: 'normal', fontSize: "1rem", fontFamily: "Roboto, serif"}}>{popUp ? "Link Copied" : ""}</label>
      <label htmlFor="zoom">Zoom</label>
      <Input
        variant="outlined"
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <Input
        variant="outlined"
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <Input
        variant="outlined"
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i} style={{fontFamily:"Robot, serif"}}>Point {i}: {JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}

    <ThemeProvider theme={theme}>
      <Button color="neutral" onClick={() => clearPlaces()} variant="outlined">Clear</Button>
      </ThemeProvider>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={API_KEY}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form}
    </div>
  );
};
interface MapProps extends google.maps.MapOptions { // extends the MapOptions interface from the Google Maps JavaScript API
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

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
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

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


export default App;
