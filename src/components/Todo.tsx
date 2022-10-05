
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

type todoProps = {
    updateText: (e: React.ChangeEvent<HTMLInputElement> |React.ChangeEvent<HTMLTextAreaElement>) => void,
    removeTodo: (id: string)=> void,
    text: string,
    todoID: string,
    addTodo: ()=>void,
}

const Todo = ({updateText, removeTodo, text, todoID, addTodo}: todoProps) => {
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)
    let todoClass

    isHover ? todoClass= "" : todoClass= "transparent"

// when to transition to a textarea
    const elementToRender = text.length < 25 ? 
        <input 
            autoFocus
            onChange={(e)=> updateText(e)} 
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    addTodo()
                }
            }} 
            onFocus={(e)=>{
            const end = text.length
            e.target.setSelectionRange(end, end)
            e.target.focus()
            }} 
            className="todo-text-box" 
            id={todoID} type="text" 
            value={text} /> : 
        <textarea autoFocus onFocus={(e)=>{
            const end = text.length
            e.target.setSelectionRange(end, end)
            e.target.focus()
        }} className="todo-text-box" id={todoID} value={text} onChange={(e)=> updateText(e)} />

    if(text.length > 15){
        
    }

    return (
        <div className="todo-container" ref={hoverRef}>
            {elementToRender}
            <div className="remove-todo-icon">
                <FontAwesomeIcon 
                    className={todoClass} 
                    icon={faSquareCheck}
                    onClick={()=> removeTodo(todoID)}/>
            </div>
        </div>
    )
}

export default Todo