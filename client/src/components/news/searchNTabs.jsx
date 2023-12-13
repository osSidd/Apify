import { Box, Button } from "@mui/material";

export default function SearchNTabs({tabs, handleClick}){
    return (
        <Box py={2} px={12}>
            <Box 
                display='flex' 
                justifyContent='space-between' 
                alignItems='center'
            >
            {
                tabs.map(tab => (
                    <Button key={tab} onClick={() => handleClick(tab)}>{tab}</Button>
                ))
            }
            </Box>
        </Box>
    )
}