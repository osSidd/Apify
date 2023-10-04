import { Component } from "react";
import Header from "../../components/header";
import banner from '../../assets/news/news.jpg'

class News extends Component{
    render(){
        return (
            <div>
                <Header
                    title="NewsChunks"
                    description="Your daily news feed powered by NewsAPI"
                    banner={banner}
                />
            </div>
        )
    }
}

export default News