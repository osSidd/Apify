import logo from '../../assets/weather-64.svg'
import './header.css'

export default function Header(){
    return (
        <div>
            <div className='logo-name'>
                <img className='logo' src={logo} alt="logo" />
                <h1>HowzWeather</h1>
            </div>
        </div>
    )
}