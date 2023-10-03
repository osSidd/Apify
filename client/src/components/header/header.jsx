import logo from '../../assets/icon.png'
import './header.css'

export default function Header(){
    return (
        <div className='header'>
            <div className='logo-name'>
                <img className='logo' src={logo} alt="logo" />
                <h1>HowzWeather</h1>
            </div>
            <div className='sub-heading'>
                <h2>Weather nowcast and forecast powered by OpenWeatherAPI</h2>
            </div>
        </div>
       
    )
}