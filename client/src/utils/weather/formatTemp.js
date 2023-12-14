export default function formatTemp(temp, unit='C'){
    switch(unit){
        case 'C':
            return parseInt(temp - 273.15)
        case 'F':
            return parseInt(temp - 457.87)
        default:
            return temp
    }
}