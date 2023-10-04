import { Component } from "react";
import Header from "../components/header";
import banner from '../assets/sports/banner.jpg'

class Sports extends Component{
    render(){
        return (
            <div>
                <Header
                    title="Sportify"
                    description="Latest scores and match reviews"
                    banner={banner}
                />
            </div>
        )
    }
}

export default Sports