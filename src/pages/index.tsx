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

const api = createApi({
    accessKey: "2GqxttV2wnvK5CUd16C_S7NCKsdmS-l20qr637BKzVo"
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
    <div className={"App"  /*ref={animationParent}*/ } >
      <nav>
        <i className="fa-regular fa-circle-check todo-icon" onClick={()=>{setShowTodo(!showTodo)}} />
        <i className="fa-solid fa-file-pen notes-icon" onClick={()=>{setShowEditor(!showEditor)}} />
      </nav>
      
      {showTodo && <TodoSec exitTodo={()=> setShowTodo(false)}/>}
      {time !== null && <Time {...timeProps} />}
      {showEditor && <Notes exitNotes={()=> setShowEditor(false)} />}
      <Weather />
    </div>
  );
};

export default Home;
