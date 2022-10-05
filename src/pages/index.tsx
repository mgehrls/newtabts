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
import { TimeObject} from "../utils/types";
import { env } from "../env/client.mjs";
import { faCircle, faCircleCheck, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const api = createApi({
    accessKey: env.NEXT_PUBLIC_UNSPLASH_API_KEY
})



const Home: NextPage = () => {
  const [photoData, setPhotoData] = useState<any>(null)
  const [showTodo, setShowTodo] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const [time, setTime] = useState<TimeObject | null>(null)

  useEffect(()=>{
    setTime(getTime())
  },[])

  setInterval(()=>{
      setTime(getTime())
  }, 1000)

  //gets weather to pass as prop

  useEffect(()=>{
    api.search
        .getPhotos({query:"nature", orientation:'landscape'})
        .then(result =>{
            setPhotoData(result.response?.results);
  
        })  
        .catch(err => console.log(err))
  }, [])

  const [animationParent] = useAutoAnimate()

  const timeProps = {
    time: time
  }
  return (
    <div className="App"  ref={animationParent} >
      <nav>
        <FontAwesomeIcon icon={faCircleCheck} onClick={()=>{setShowTodo(!showTodo)}}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faFilePen} onClick={()=>{setShowEditor(!showEditor)}}></FontAwesomeIcon>
      </nav>
      
      {showTodo && <TodoSec exitTodo={()=> setShowTodo(false)}/>}
      {time !== null && <Time {...timeProps} />}
      {showEditor && <Notes exitNotes={()=> setShowEditor(false)} />}
      <Weather />
    </div>
  );
};

export default Home;
