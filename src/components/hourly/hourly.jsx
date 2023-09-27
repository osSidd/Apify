import './hourly.css'
import Chart from './chart'

function Hourly({data}){
    return (
        <div className="hourly">
            <h2>Hourly forecast</h2>
            <Chart data={data}/>
        </div>
    )
}
export default Hourly