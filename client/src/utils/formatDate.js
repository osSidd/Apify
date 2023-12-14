export default function formatDate(dt, time, timezone){
    const timeObj = time && {hour: '2-digit', minute:'2-digit'}
    const options = {month:'short', day:'2-digit', weekday:'short', timeZone: timezone, ...timeObj}
    return new Date(dt*1000).toLocaleString('en-IN', options)
}