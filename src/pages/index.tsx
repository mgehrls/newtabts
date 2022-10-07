import type { NextPage } from "next";
import Head from "next/head";
import getTime from "../components/getTime"
import TodoSec from '../components/TodoSec'
import Notes from "../components/Notes";
import Weather from "../components/Weather";
import Time from "../components/Time";
import { useEffect, useState } from 'react';
import { createApi } from "unsplash-js"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TimeObject} from "../utils/types";
import { env } from "../env/client.mjs";
import { faCircleCheck, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firstPic, Picture } from "../utils/unsplashPictureData";
import { WeatherInfo} from "../utils/types"

const api = createApi({
    accessKey: env.NEXT_PUBLIC_UNSPLASH_API_KEY
})

const Home: NextPage = () => {
  const [backgroundPhoto, setBackgroundPhoto] = useState<Picture>(firstPic)
  const [showTodo, setShowTodo] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [time, setTime] = useState<TimeObject | null>(null)
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)

  useEffect(()=>{
      navigator.geolocation.getCurrentPosition((position) => {
          const userLat = position.coords.latitude.toFixed(2)
          const userLon = position.coords.longitude.toFixed(2)
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

  useEffect(()=>{
    setTime(getTime())
  },[])

  setInterval(()=>{
      setTime(getTime())
  }, 1000)
/*
  useEffect(()=>{
    api.search
        .getPhotos({query:"nature", orientation:'landscape'})
        .then(result =>{
          if(result && result.response !== undefined && result.response.results !== undefined){
            if(result.response.results[4] !== undefined){
              setBackgroundPhoto(firstPic)

            }
          }
            console.log(result.response?.results[4])
  
        })  
        .catch(err => {
          throw Error(err)
        })
  }, [])
*/
  const [animationParent] = useAutoAnimate()

  const timeProps = {
    time: time
  }
  const todoSecProps = {
    exitTodo: setShowTodo
  }
  const noteProps = {
    exitNotes: setShowEditor
  }
  const weatherProps = {
    weatherInfo: weatherInfo
  }

  return (
    <>
      <Head>

      </Head>
      <div 
        className="App" 
        ref={animationParent} 
        style={{ 
          background: "no-repeat center center fixed",  
          backgroundSize: "cover",
          backgroundImage: `url(${backgroundPhoto.urls.regular})`}}>
        <nav>
          <FontAwesomeIcon icon={faCircleCheck} onClick={()=>{setShowTodo(!showTodo)}}/>
          <FontAwesomeIcon icon={faFilePen} onClick={()=>{setShowEditor(!showEditor)}}/>
        </nav>
        {showTodo && <TodoSec {...todoSecProps}/>}
        {time !== null && <Time {...timeProps} />}
        {showEditor && <Notes {...noteProps} />}
        {weatherInfo && <Weather {...weatherProps} />}
      </div>
    
    </>
  );
};

export default Home;
