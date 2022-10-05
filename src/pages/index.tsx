import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";
import getTime from "../components/getTime"
import TodoSec from '../components/TodoSec'
import Notes from "../components/Notes";
import Weather from "../components/Weather";
import Time from "../components/Time";
import { useEffect, useState, Fragment } from 'react';
import { createApi } from "unsplash-js"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TimeObject} from "../utils/types";
import { env } from "../env/client.mjs";
import { faCircle, faCircleCheck, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { Basic } from "unsplash-js/dist/methods/users/types";
import { firstPic, Picture } from "../utils/unsplashPictureData";
import { url } from "inspector";

const api = createApi({
    accessKey: env.NEXT_PUBLIC_UNSPLASH_API_KEY
})

const Home: NextPage = () => {
  const [backgroundPhoto, setBackgroundPhoto] = useState<Picture>(firstPic)
  const [showTodo, setShowTodo] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const [time, setTime] = useState<TimeObject | null>(null)

  useEffect(()=>{
    setTime(getTime())
  },[])

  setInterval(()=>{
      setTime(getTime())
  }, 1000)

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

  const [animationParent] = useAutoAnimate()

  const timeProps = {
    time: time
  }
  const todoSecProps = {
    exitTodo: setShowTodo
  }

  return (
    <>
      <Head>

      </Head>
      <div className="App" ref={animationParent}>
        <nav>
          <FontAwesomeIcon icon={faCircleCheck} onClick={()=>{setShowTodo(!showTodo)}}/>
          <FontAwesomeIcon icon={faFilePen} onClick={()=>{setShowEditor(!showEditor)}}/>
        </nav>
        {showTodo && <TodoSec {...todoSecProps}/>}
        {time !== null && <Time {...timeProps} />}
        {showEditor && <Notes exitNotes={()=> setShowEditor(false)} />}
        <Weather />
      </div>
    
    </>
  );
};

export default Home;
