import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { useState } from "react";

export default function NewsCard({data}){

    const [load, setLoad] = useState(false)

    return (
        <Card sx={{maxWidth:450, my:4}}>
            <CardActionArea
                href={data.url}
                target="_blank"
                
            >
            <CardMedia
                component='img'
                alt="news"
                height={250}
                image={data.urlToImage}
                onLoad={() => {setLoad(true)}}
                sx={{display: load ? 'block' : 'none'}}
            /> 
                
            <Box
                height={250}
                bgcolor='primary.light'
                display={load ? 'none' : 'flex'}
                justifyContent='center'
                alignItems='center'
            >
                <Typography variant="h4" fontWeight={600} sx={{color:'white'}}>
                    {data.source?.name || data?.author}
                </Typography>
            </Box>
            
            <CardContent>
                <Chip
                    label={data.source.name}
                    variant="outlined"
                    color="error"
                    sx={{mb:1}}
                    size="small"
                />
                <Typography
                    variant="body2"
                    color='text.secondary'
                    mb={2}
                >
                    {new Date(data.publishedAt).toLocaleString()}
                </Typography>
                <Typography
                    gutterBottom
                    variant="h5"
                    component='div'
                >
                    {data.title}
                </Typography>
                <Typography
                    variant="body2"
                    color='text.secondary'
                >
                    {data.description || data.content}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small" href={data.url} target="_blank">learn more</Button>
            </CardActions> */}
            </CardActionArea>
        </Card>
    )
}