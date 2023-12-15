export default function formatUnit(property, unit='M', propertyName){
    switch(propertyName){
        case 'TEMP':
            return unit==='M' ? parseInt(property - 273.15) : parseInt((property*1.8) - 459.67)
        case 'SPEED':
            return unit==='M' ? property : parseInt(property*2.237)
        case 'PRESSURE':
            return unit==='M' ? property : (property*0.0145).toFixed(3)
        case 'DISTANCE':
            return unit==='M' ? property : parseInt(property*0.62)
        default:
            return property
    }
}
