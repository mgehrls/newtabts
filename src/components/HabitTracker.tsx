import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Habit from "./Habit"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HabitTracker(){

    const [habits, setHabits] = useState(() =>{
        const saveData = localStorage.getItem("bltJrnHabit")
        const initialValue = JSON.parse(saveData)
        return initialValue || []
    })

    useEffect(()=>{
       // localStorage.setItem("bltJrnHabit", JSON.stringify(habits))
    
    },[habits])

    
    function addHabit(){
        let newHabit = {
            text:"", 
            habitID: nanoid(), 
            data: [
                false, 
                false, 
                false, 
                false, 
                false, 
                false, 
                false
            ] }
        setHabits([...habits, newHabit])
    }
    function removeHabit(id){
        let newState = habits.filter(item => item.habitID !== id)
        setHabits(newState)
    }
    function updateHabitText(e){
        let newState = habits.map(habit =>{
            if(habit.habitID === e.target.id){
                return {...habit, text:e.target.value}
            } else{
                return habit
            }
        })
        setHabits(newState)
    }
    function toggleHabitCheckbox(id, day){
   
    }

    const habitDisplay = habits.map((habit)=>{
        return(
            <Habit 
                habitID={habit.habitID} 
                text={habit.text} 
                key={habit.habitID} 
                data={habit.data} 
                updateText={updateHabitText} 
                removeHabit={removeHabit}
                toggleChecked={toggleHabitCheckbox} />
        )
    })

    return(
        <div className="habits-container">
            <h1>Habit Tracker</h1>
            <div className="todos-add-btn" onClick={()=>addHabit()}>
                <FontAwesomeIcon icon={faCirclePlus}/>
                Add Item
            </div>
            <div>
                <h2>habit section</h2>
                {habitDisplay}
            </div>
        </div>
    )
}