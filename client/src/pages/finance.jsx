import { Component } from "react";
import Header from "../components/header";
import banner from '../assets/stocks/banner.jpg'

class Finance extends Component{
    render(){
        return (
            <div>
                <Header
                    title="Financi"
                    description="Stocks trends and feed powered by AlphaVantageAPI"
                    banner={banner}
                />
            </div>
        )
    }
}

export default Finance