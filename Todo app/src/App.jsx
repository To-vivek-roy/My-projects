import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handelChange = (e) => {
    setTodo(e.target.value)
  }
  const handelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh] w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handelChange} value={todo} className='bg-white w-full rounded-full px-5 py-1' type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-violet-800 text-white rounded-md p-1 py-1  text-sm font-bold cursor-pointer disabled:bg-violet-800'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-xl font-bold'>Yours todo</h2>
        <div className="todos">
          {todos.length === 0 && <div>NO Todos to display</div>}
          {todos.map(item => {
            return (showFinished || item.isCompleted) && <div key={item.id} className="todo flex justify-between w-1/2 my-3 font-bold">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handelCheckbox} type="checkbox" checked={todo.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 text-white rounded-md p-1 py-1 mx-1 text-sm font-bold cursor-pointer
                '><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 text-white rounded-md p-1 py-1 mx-1 text-sm font-bold cursor-pointer'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
