import { useState, useEffect } from "react"
import { WeatherInfo} from "../utils/types"
type WeatherProps = {
    weatherInfo: WeatherInfo | null
}

export default function Weather({weatherInfo}: WeatherProps){

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