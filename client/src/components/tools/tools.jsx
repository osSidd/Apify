import './tools.css'
import d3 from '../../assets/d3.svg'
import react from '../../assets/react.svg'
import weather from '../../assets/openweather.svg'

export default function Tools(){
    return(
        <div className="tools">
            <img className='tool-icon' src={react} alt="react" />
            <img className='tool-icon d3' src={d3} alt="d3js" />
            <img className='tool-icon open-weather' src={weather} alt="openweather" />
        </div>
    )
}