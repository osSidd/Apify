// import {Component, lazy, Suspense} from "react"
import {Component} from "react"
// import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import {theme} from './styles/styles'
import './App.css'

// import Navbar from "./components/navbar/navbar"
import Footer from "./components/footer"

import WeatherPage from "./pages/weather/weatherpage"
// const Weather = lazy(() => import("./pages/weather/weatherpage")) 
// const News = lazy(() => import("./pages/news/news")) 
// const Sports = lazy(() => import("./pages/sports")) 
// const Finance = lazy(() => import("./pages/finance")) 
// const Error = lazy(() => import("./pages/errorpage"))

class App extends Component{
  render(){
    return(
      <ThemeProvider theme={theme}>
        <WeatherPage/>
        {/* <BrowserRouter> */}
          {/* <Navbar/> */}
          {/* <Suspense fallback={<div>Loading ...</div>}> */}
            {/* <Routes> */}
                {/* <Route path="/" element={<div>Home</div>}/> */}
                {/* <Route path="/News" element={<News/>}/> */}
                {/* <Route path="/" element={<Weather/>}/> */}
                {/* <Route path="/weather" element={<Weather/>}/> */}
                {/* <Route path="/Finance" element={<Finance/>}/> */}
                {/* <Route path="/Sports" element={<Sports/>}/> */}
                {/* <Route path="*" element={<Error/>}/> */}
            {/* </Routes> */}
          {/* </Suspense>             */}
          <Footer/> 
        {/* </BrowserRouter> */}
      </ThemeProvider>
  
    )
  }
}

export default App