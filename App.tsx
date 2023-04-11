import * as React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import {Button} from '@mui/material';
import Input from '@mui/joy/Input';
import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import Marker from "./Components/Marker";
import Map from "./Components/Map";

const theme = createTheme({
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
        <pre key={i} style={{fontFamily:"Robot, serif"}}>Point {i}: {JSON.stringify(latLng.toJSON(), null, 2)}</pre> // adds to list
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

export default App;
