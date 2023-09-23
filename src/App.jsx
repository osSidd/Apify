import {Component} from "react"

import Header from "./components/header/header"
import HomePage from "./pages/home/homepage"
import './App.css'

class App extends Component{
  render(){
    return(
      <div>
        <Header/>
        <HomePage/> 
      </div>
    )
  }
}

export default App