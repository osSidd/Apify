import { createTheme, alpha, getContrastRatio } from "@mui/material";

const darkCharcoalBase = '#333333'
const darkCharcoalMain = alpha(darkCharcoalBase, 0.95)

export const theme = createTheme({
    palette:{
        darkCharcoal:{
            main: darkCharcoalMain,
            light: alpha(darkCharcoalBase, 0.5),
            dark: alpha(darkCharcoalBase, 1),
            contrastText: getContrastRatio(darkCharcoalMain, '#fff') > 4.5 ? '#fff' : '#111'
        }
    }
})
