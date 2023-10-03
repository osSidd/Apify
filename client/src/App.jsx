import {Component} from "react"

import Header from "./components/header/header"
import WeatherPage from "./pages/weather/weatherpage"
import Tools from "./components/tools/tools"
import Footer from "./components/footer/footer"
import './App.css'

class App extends Component{
  render(){
    return(
      <div>
        <Header/>
        <WeatherPage/>
        <Tools/>
        <Footer/>
      </div>
    )
  }
}

export default App