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
import { useState, useEffect } from "react";

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

const [popUp, setPopUp] = useState(false);

function App() {
    const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = useState(3);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setPopUp(false);
        }, 2000);
        return () => clearInterval(interval);
        }, []);

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
        };
    
        const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
        };

    const generateLink = () => {
        var returnLink = "https://marvelous-heliotrope-713170.netlify.app/?entities="
        // 41.826835_-71.399710,41.827835_-71.399710
        {clicks.map((latLng, i) => (
            returnLink += latLng.lat() + "_" + latLng.lng() + ","
        ))}
        returnLink = returnLink.slice(0,-1);
    
        var textField = document.createElement('textarea');
        textField.innerText = returnLink;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setPopUp(true);
        }

        const clearPlaces = () => {
            setClicks([]);
          }
          
        const [popUp, setPopUp] = useState(false);

        
    }