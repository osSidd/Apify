const express = require('express')

const Parser = require('rss-parser')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })
// const articles = []
// const parser = new Parser({customFields:{item:['media:content']}})

// const parse = async url => {
//   const feed = await parser.parseURL(url)
//   feed.items.forEach(item => articles.push(item))
//   articles.push(feed)
// }

// parse('https://timesofindia.indiatimes.com/rssfeedsvideo/3813456.cms')

function getUrl(category, country, q){
  let baseStr = 'top-headlines?'

  if(q)
    baseStr = `everything?q=${q}&`
 
  if(category)
    baseStr = `top-headlines?category=${category}&`

  if(country)
    baseStr = `top-headlines?country=${country}&`

  return`https://newsapi.org/v2/${baseStr}language=en&apiKey=${process.env.NEWS_API_KEY}`
}

async function fetchNews(req, res){
  try{
    const {category, country, q} = req.body

    const url = getUrl(category, country, q)
    
    const response = await fetch(url)

    const data = await response.json()

    res.json(data)

  }catch(err){
    return res.json({error: err.message})
  }
}

app.use('/news', fetchNews)


// app.get('/news', (req, res) => {
//   
//   })
// })
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`listening on ${PORT}`))