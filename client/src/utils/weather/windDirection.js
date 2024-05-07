export default function getDirection(deg){
    console.log(deg, typeof deg)
    if(348.75 <= deg) return 'N'
    if(326.25 <= deg) return 'NNW'
    if(303.75 <= deg) return 'NW'
    if(281.25 <= deg) return 'WNW'
    if(258.75 <= deg) return 'W'
    if(236.25 <= deg) return 'WSW'
    if(213.75 <= deg) return 'SW'
    if(191.25 <= deg) return 'SSW'
    if(168.75 <= deg) return 'S'
    if(146.25 <= deg) return 'SSE'
    if(123.75 <= deg) return 'SE'
    if(101.25 <= deg) return 'ESE'
    if(78.75 <= deg) return 'E'
    if(56.25 <= deg) return 'ENE'
    if(33.75 <= deg) return 'NE'
    if(11.25 <= deg) return 'NNE'
    else return 'N'
}