import {Component} from "react"
import { ThemeProvider } from "@mui/material/styles"
import {theme} from './styles/styles'
import './App.css'

import Footer from "./components/footer"
import WeatherPage from "./pages/weather/weatherpage"
import Aqi from "./components/weather/aqi/aqi"

class App extends Component{
  render(){
    return(
      <ThemeProvider theme={theme}>
        <WeatherPage/>
        <Footer/> 
        <Aqi/>
      </ThemeProvider>  
    )
  }
}

export default App