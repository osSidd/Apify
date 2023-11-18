import { Component } from "react"

import NearMeIcon from '@mui/icons-material/NearMeOutlined';

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { Grid, IconButton, Button, OutlinedInput, FormGroup, TextField, Stack, Chip } from "@mui/material";

class SearchArea extends Component{

    render(){

        const props = {
            bgcolor: '#ededed',
            textTransform: 'none',
            color:'black',
            fontSize:'10px',
            fontWeight:300
        }

        return(
            <Container 
                maxWidth="xl"
                sx={{
                    bgcolor: '#dedede',
                    paddingY: '20px'
                }}
            >
                <Box 
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"  
                    mx={12}
                >
                    <FormGroup row>
                        <OutlinedInput 
                            sx={{
                                borderRadius: '5px 0 0 5px',
                                border:'none',
                                outline: 'none',
                                bgcolor: '#fff',
                                height: '36px',
                                width:{
                                    sm: '200px',
                                    md: '325px'
                                },
                                "& fieldset":{border: 'none'}
                            }} 
                            placeholder="Search City"
                        />
                        <Button 
                            disableElevation 
                            sx={{
                                borderRadius: '0 5px 5px 0', 
                                bgcolor: '#444',
                                height: '36px',
                                textTransform: 'capitalize',
                                "&:hover": {
                                    bgcolor: '#333'
                                }
                            }} 
                            variant="contained"
                        >
                            Search
                        </Button>
                    </FormGroup>
                    <Box display="flex" alignItems="center">
                        <IconButton>
                            <NearMeIcon
                                sx={{
                                 stroke: 'white'                                
                                }}
                            />
                        </IconButton>
                        <Stack direction="row" gap={1}>
                            <Chip label="Metric &deg;C m/s" size="small" sx={{paddingX:2}}/>
                            <Chip label="Imperial &deg;F mph" size="small" sx={{paddingX:2}}/>
                        </Stack>
                        {/* <Box>
                            <Button color="primary" sx={props} size="small">Metric &deg;C m/s</Button>
                            <Button color="primary" sx={props} size="small">Imperial &deg;F mph</Button>
                        </Box> */}
                    </Box>                        
                </Box>
            </Container>
        )
    }
}

export default SearchArea