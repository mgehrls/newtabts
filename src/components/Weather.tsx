import { useState, useEffect } from "react"
import { env } from "../env/server.mjs"
import { WeatherInfo} from "../utils/types"


export default function Weather(){

    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            const userLat = position.coords.latitude.toFixed(2)
            const userLon = position.coords.longitude.toFixed(2)
            //NEED ENV
            const weatherAPIkey = env.NEXT_PUBLIC_WEATHER_API_KEY
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${weatherAPIkey}&units=imperial`)
            .then(res => {
                if (!res.ok){
                    throw Error('Weather data not available.')
                }
                return res.json()
            })
            .then(data => {
                setWeatherInfo(data)
              }) 
            .catch(err => console.error(err))
            })
    
    }, [])
    
    if(weatherInfo !== null && weatherInfo.weather[0] !== undefined){
        return(
            <div className="weather-container">
                <img className="weather-img" src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`} alt="" />
                <h2 className="weather-temp" id="temp">{Math.round(weatherInfo.main.temp)}° F</h2>
                <h2 className="weather-city">{weatherInfo.name}</h2>
            </div>
        )
    }else if(weatherInfo!==null){
        return(
            <div className="weather-container">
                <h2 className="weather-temp" id="temp">{Math.round(weatherInfo.main.temp)}° F</h2>
                <h2 className="weather-city">{weatherInfo.name}</h2>
             </div>

        )
    }else{
        return (
            <div>
                Loading...
            </div>
        )
    }

}