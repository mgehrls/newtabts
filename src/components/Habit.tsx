import { nanoid } from "nanoid"
export default function Habit(habit){
    
    const checkboxDisplay = habit.data.map((checkbox) =>{
        return(
            <input key={nanoid()} type="checkbox" checked={checkbox.isChecked} onChange={()=> habit.toggleChecked(habit.habitID, checkbox.day)} />
        )
    })
    
    return(
        <div>
            <input id={habit.habitID} value={habit.text} onChange={(e) => habit.updateText(e)} type='text'></input>
                   {checkboxDisplay}
        </div>
    )
}