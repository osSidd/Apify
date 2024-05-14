# HowzWeather
Weather nowcast and forecast powered by Openweathermap API.

## Install and run
To install the project dependencies
```
cd HowzWeather/client
npm install
```

To run the project in development mode
```
cd HowzWeather/client
npm run dev
```

## Technologies used
- React
- MUI
- D3
- TomTom maps
- Vite

## Overview
- React class and functional components using lifecycle and hooks respectively are used for making the app.
- D3 is used for making the line graph, bar chart for showing the hourly variation of weather and for showing the minutely scale on the map.
- TomTom map is used for demonstrating the geographical loacation of places.
- MUI is used for styling the app.
- App fetches weather data from Openweathermap api, which provides a vide spectrum of weather data - current, minutely, hourly, and 8 days, geoencoding and weather maps. 