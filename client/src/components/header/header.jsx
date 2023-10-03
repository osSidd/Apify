import logo from '../../assets/icon.png'
import './header.css'
import Typography from '@mui/material/Typography'

export default function Header(){
    return (
        <div className='header'>
            <div className='logo-name'>
                {/* <img className='logo' src={logo} alt="logo" /> */}
                <Typography
                    variant='h2'
                    component="h1"
                    fontWeight={700}
                >
                    HowzWeather
                </Typography>
            </div>
            <div>
                <Typography 
                    variant="h6"
                    fontWeight={500}
                >
                    Weather nowcast and forecast powered by OpenWeatherAPI
                </Typography>
            </div>
        </div>
       
    )
}