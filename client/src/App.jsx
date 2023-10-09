import {Component} from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import {theme} from './styles/styles'
import './App.css'

import Navbar from "./components/navbar/navbar"
import Tools from "./components/tools/tools"
import Footer from "./components/footer"

import WeatherPage from "./pages/weather/weatherpage"
import News from "./pages/news/news"
import Stocks from "./pages/stocks"
import Sports from "./pages/sports"

import ErrorPage from './pages/errorpage'

class App extends Component{
  render(){
    return(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<div>Home</div>}/>
            <Route path="/News" element={<News/>}/>
            <Route path="/weather" element={<WeatherPage/>}/>
            <Route path="/Stocks" element={<Stocks/>}/>
            <Route path="/Sports" element={<Sports/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          {/* <Tools/> */}
          <Footer/> 
        </BrowserRouter>
      </ThemeProvider>
  
    )
  }
}

export default App