import {Component} from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"

import Navbar from "./components/navbar"
import Header from "./components/header/header"
import WeatherPage from "./pages/weather/weatherpage"
import Tools from "./components/tools/tools"
import Footer from "./components/footer/footer"
import ErrorPage from './pages/errorpage'
import './App.css'
import {theme} from './styles/styles'

class App extends Component{
  render(){
    return(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar/>
          <Header/>
          <Routes>
            <Route path="/" element={<div>Home</div>}/>
            <Route path="/weather" element={<WeatherPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          <Tools/>
          <Footer/> 
        </BrowserRouter>
      </ThemeProvider>
  
    )
  }
}

export default App