import Todo from './Todo'
import React, {useState, useEffect, Dispatch, SetStateAction, InputHTMLAttributes} from 'react'
import { nanoid } from 'nanoid'
import autosize from 'autosize'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'

type TodoPropTypes = {
    exitTodo: Dispatch<SetStateAction<boolean>>
}
type TodoType = {
    text: string,
    todoID: string,
    done: boolean
}

const TodoSec = ({exitTodo}: TodoPropTypes) => {

    //Tons of logic that I need to move somewhere else.
    const [todos, setTodos] = useState<TodoType[]>(() =>{
        const localSave = localStorage.getItem("bltJrnTodo")
        if(localSave !== null){
            return JSON.parse(localSave)
        }else{
            return []
        }
    })
    
    useEffect(()=>{
        autosize(document.querySelectorAll('textarea'))
    }, [])

    //saves
    useEffect(()=>{
       saveToStorage()
    }, [todos])

    function saveToStorage(){
        localStorage.setItem("bltJrnTodo", JSON.stringify(todos))
    }

    function addTodo(){
        let newTodo = {text:"", done:false, todoID:nanoid()}
        setTodos([...todos, newTodo])
    }
    function removeTodo(id: string){
        let newState = todos.filter(item => item.todoID !== id)
        setTodos(newState)
    }
    function updateTodoText(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        let newState = todos.map(todo =>{
            if(todo.todoID === e.target.id){
                return {...todo, text:e.target.value}
            } else{
                return todo
            }
        })
        setTodos(newState)
    }
    
    const todoList = todos.map(item =>{
        const todoProps = {
            updateText: updateTodoText,
            removeTodo: removeTodo,
            key: item.todoID,
            text: item.text,
            todoID: item.todoID,
            addTodo: addTodo
        }
        return (
            <Todo {...todoProps} />
        )
    })

    const [animationParent] = useAutoAnimate()

    return(
        <div className='todos-container'>
            <div className='todos-controls'>
                <div className="todos-add-btn" onClick={()=>addTodo()}>
                    <FontAwesomeIcon icon={faCirclePlus}/>
                    Add Item
                </div>
                <FontAwesomeIcon icon={faXmark} className={"pointer"} onClick={() => exitTodo(false)}/>
            </div>
            <p className='todos-title'>Todo List</p>
            <div ref={animationParent} className='todo-list-container'>
                {todoList}
            </div>
        </div>
    )
}

export default TodoSec