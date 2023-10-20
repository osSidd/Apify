import { Component } from "react";
import Header from "../../components/header";
import banner from '../../assets/news/news.jpg'

import data from '../../data/newsData'
import { Box } from "@mui/material";
import NewsCard from "../../components/news/newsCard";

class News extends Component{

    // componentDidMount(){
    //     fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }
    render(){
        console.log(data)
        return (
            <div>
                <Header
                    title="NewsChunks"
                    description="Your daily news feed powered by NewsAPI"
                    banner={banner}
                />
                <Box px={14} pt={8}>
                    {
                        data.map(news => (
                            <NewsCard
                                data={news}
                            />
                        ))
                    }
                </Box>
            </div>
        )
    }
}

export default News