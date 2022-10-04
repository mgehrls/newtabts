
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

const Todo = (props) => {
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)
    let todoClass

    isHover ? todoClass= "fa-regular fa-square-check" : todoClass= "fa-regular fa-square-check transparent"

// when to transition to a textarea
    const elementToRender = props.text.length < 25 ? 
        <input 
            autoFocus
            onChange={(e)=> props.updateText(e)} 
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    props.addTodo()
                }
            }} 
            onFocus={(e)=>{
            const end = props.text.length
            e.target.setSelectionRange(end, end)
            e.target.focus()
            }} 
            className="todo-text-box" 
            id={props.todoID} type="text" 
            value={props.text} /> : 
        <textarea autoFocus onFocus={(e)=>{
            const end = props.text.length
            e.target.setSelectionRange(end, end)
            e.target.focus()
        }} className="todo-text-box" id={props.todoID} value={props.text} onChange={(e)=> props.updateText(e)} />

    if(props.text.length > 15){
        
    }

    return (
        <div className="todo-container" ref={hoverRef}>
            {elementToRender}
            <div className="remove-todo-icon">
                <i onClick={()=> props.removeTodo(props.todoID)} className={todoClass} />
            </div>
        </div>
    )
}

export default Todo