import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function NewsCard({data}){

    const [load, setLoad] = useState(false)

    return (
        <Card sx={{maxWidth:'90%', my:4, display:'flex'}}>
            <CardActionArea
                href={data.url}
                target="_blank"
            >
            <Grid container minHeight={150}>
                <Grid item md={4}>
                    <CardMedia
                        component='img'
                        alt="news"
                        height='100%'
                        image={data.urlToImage}
                        onLoad={() => {setLoad(true)}}
                        sx={{display: load ? 'block' : 'none'}}
                    /> 
                        
                    <Box
                        height='100%'
                        bgcolor='primary.light'
                        display={load ? 'none' : 'flex'}
                        justifyContent='center'
                        alignItems='center'
                        px={4}
                    >
                        <Typography variant="h6" fontWeight={600} sx={{color:'white'}}>
                            {data.source?.name || data?.author}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item md={8}>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            fontSize={18}
                            component='div'
                        >
                            {data.title}
                        </Typography>
                        <Box display='flex' alignItems='center' my={2}>
                            <Chip
                                label={data.source?.name}
                                variant="outlined"
                                color="error"
                                sx={{ mr:2}}
                                size="small"
                            />
                            <Typography
                                variant="body2"
                                color='text.secondary'
                            >
                                {new Date(data.publishedAt).toLocaleDateString('en', {day:'numeric', month:'short', year:'2-digit', hour:'numeric', minute:'numeric'})}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            color='text.secondary'
                        >
                            {data.description || data.content}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            </CardActionArea>
        </Card>
    )
}