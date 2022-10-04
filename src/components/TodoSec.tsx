import Todo from './Todo'
import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import autosize from 'autosize'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TodoSec = (props) => {

    //Tons of logic that I need to move somewhere else.
    const [todos, setTodos] = useState(() =>{
        const saveData = localStorage.getItem("bltJrnTodo")
        const initialValue = JSON.parse(saveData)
        return initialValue || []
    })
    useEffect(()=>{
        autosize(document.querySelectorAll('textarea'))
    }, [])

    //saves
    useEffect(()=>{
        localStorage.setItem("bltJrnTodo", JSON.stringify(todos))
    }, [todos])

    function addTodo(){
        let newTodo = {text:"", done:false, todoID:nanoid()}
        setTodos([...todos, newTodo])
    }
    function removeTodo(id){
        let newState = todos.filter(item => item.todoID !== id)
        setTodos(newState)
    }
    function updateTodoText(e){
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
        return (
            <Todo updateText={updateTodoText} removeTodo={removeTodo} key={item.todoID} text={item.text} todoID={item.todoID} addTodo={addTodo} />
        )
    })

    const [animationParent] = useAutoAnimate()

    return(
        <div className='todos-container'>
            <div className='todos-controls'>
                <div className="todos-add-btn" onClick={()=>addTodo()}>
                    <i className="fa-solid fa-circle-plus"></i>
                    Add Item
                </div>
                <i className="fa-solid fa-xmark pointer" onClick={props.exitTodo} />
            </div>
            <p className='todos-title'>Todo List</p>
            <div ref={animationParent} className='todo-list-container'>
                {todoList}
            </div>
        </div>
    )
}

export default TodoSec