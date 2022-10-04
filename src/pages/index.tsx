import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";
import getTime from "../components/getTime"
import TodoSec from '../components/TodoSec'
import Notes from "../components/Notes";
import Weather from "../components/Weather";
import Time from "../components/Time";
import { useEffect, useState } from 'react';
import { createApi } from "unsplash-js"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TimeObject, WeatherInfo } from "../utils/types";

const api = createApi({
    accessKey: "2GqxttV2wnvK5CUd16C_S7NCKsdmS-l20qr637BKzVo"
})



const Home: NextPage = () => {
  const [photoData, setPhotoData] = useState<any>(null)
  const [showTodo, setShowTodo] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)
  const [time, setTime] = useState<TimeObject | null>(null)

  useEffect(()=>{
    setTime(getTime())
  },[])

  setInterval(()=>{
      setTime(getTime())
  }, 1000)

  //gets weather to pass as prop
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude.toFixed(2)
        const userLon = position.coords.longitude.toFixed(2)
        const weatherAPIkey = "e02944c0d1d98fbccd5ecb3d5676e167"
        
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
  useEffect(()=>{
    api.search
        .getPhotos({query:"nature", orientation:'landscape'})
        .then(result =>{
            setPhotoData(result.response?.results);
  
        })  
        .catch(err => console.log(err))
  }, [])

  const [animationParent] = useAutoAnimate()
  const weatherProps = {
    weatherInfo: weatherInfo
  }
  const timeProps = {
    time: time
  }
  return (
    <div className={"App"  /*ref={animationParent}*/ } >
      <nav>
        <i className="fa-regular fa-circle-check todo-icon" onClick={()=>{setShowTodo(!showTodo)}} />
        <i className="fa-solid fa-file-pen notes-icon" onClick={()=>{setShowEditor(!showEditor)}} />
      </nav>
      
      {showTodo && <TodoSec exitTodo={()=> setShowTodo(false)}/>}
      {time !== null && <Time {...timeProps} />}
      {showEditor && <Notes exitNotes={()=> setShowEditor(false)} />}
      {weatherProps.weatherInfo !== null && <Weather {...weatherProps}/>}
    </div>
  );
};

export default Home;
