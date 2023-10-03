import { Component } from "react"
import './searchArea.css'

class SearchArea extends Component{
    render(){
        return(
            <div className="search-area">
                <div>
                    <input type="search" name="search" id="search" placeholder="Search City"/>
                    <button className="search-btn">Search</button>
                </div>
                <div className="loc-units">
                    <div>Location</div>
                    <button className="unit-btn">Metric</button>
                    <button className="unit-btn">Imperial</button>
                </div>
            </div>
        )
    }
}

export default SearchArea