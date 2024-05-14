import {Component} from "react"
import { ThemeProvider } from "@mui/material/styles"
import {theme} from './styles/styles'
import './App.css'

import Footer from "./components/footer"
import WeatherPage from "./pages/weather/weatherpage"

class App extends Component{
  render(){
    return(
      <ThemeProvider theme={theme}>
        <WeatherPage/>
        <Footer/> 
      </ThemeProvider>  
    )
  }
}

export default App