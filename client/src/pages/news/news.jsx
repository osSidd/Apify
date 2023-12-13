import { Component } from "react";
import { Box } from "@mui/material";

import Header from "../../components/header";
import banner from '../../assets/news/news.jpg'
import SearchNTabs from "../../components/news/searchNTabs";
import NewsCard from "../../components/news/newsCard";

import sources from '../../data/news/sources.json'
import Sources from "../../components/news/sources";

class News extends Component{

    constructor(){
        super()
        this.state = {
            data : [],
            category:null,
            country:null,
            q:null,
        }
        this.tabs = ['world', 'india', 'business', 'technology', 'entertainment', 'sports', 'science', 'health']

        this.fetchCategoryNews = this.fetchCategoryNews.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
    }

    componentDidMount(){    
        fetch('http://localhost:3000/news')
            .then(res => res.json())
            .then(data => {this.setState(prev => ({...prev, data: data.articles}))})
    }

    async fetchCategoryNews(category, country, q){
        try{
            const response = await fetch('http://localhost:3000/news', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({category, country, q})
            })

            if(response.ok){
                const data = await response.json()
                this.setState(prev => ({...prev, data: data.articles}))
            }

        }catch(err){
            console.log(err.message)
        }
    }

    selectCategory(category){
        switch(category){
            case 'india':
                this.fetchCategoryNews(null, 'in', null)
                break;
            case 'world':
                this.fetchCategoryNews(null, null, null)
                break;
            default:
                this.fetchCategoryNews(category, null, null)
        }
    }

    render(){
        return (
            <Box>
                <Header
                    title="NewsChunks"
                    description="Your daily news feed powered by NewsAPI"
                    banner={banner}
                />

                <SearchNTabs tabs={this.tabs} handleClick={this.selectCategory}/>
                
                <Box px={12} display='flex'>
                    <Box width='70%'>
                    {
                        this.state.data?.map((news, index) => (
                            <NewsCard
                                key={index}
                                data={news}
                            />
                        ))
                    }
                    </Box>
                    <Box mt={4} width='30%'>
                        <Sources sources={sources}/>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default News