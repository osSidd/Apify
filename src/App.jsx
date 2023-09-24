import {Component} from "react"

import Header from "./components/header/header"
import HomePage from "./pages/home/homepage"
import SearchArea from './components/search/searchArea'
import './App.css'

class App extends Component{
  render(){
    return(
      <div>
        <Header/>
        <SearchArea/>
        <HomePage/> 
      </div>
    )
  }
}

export default App