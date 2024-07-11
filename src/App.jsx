import React, { useState } from 'react';
import './App.css';
import InputBox from './Components/InputBox';
import TodoList from './Components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  const[changedTodo,setChangedTodo]=useState({})
const [todoDeleted,setTodoDeleted]=useState([]);
const [todoEdited,setTodoEdited]=useState([]);
const [todoCompleted,setTodoCompleted]=useState([]);

  const getTodos = (todos) => {
    if (todos.every((item) =>item&&item.todo?.trim() === "")) {
      return
    }
    setTodoList(todos);
  };

  const handleComplete = (todo) => {
    const updatedTodos = todoList.map((task) =>
      task.id === todo.id ? { ...task, isCompleted: true } : task
    );
    setTodoList(updatedTodos);
    setTodoCompleted([...todoCompleted,todo.id]);

  };

  const handleDelete = (todo) => {
    const updatedTodos = todoList.filter((task) => task.id !== todo.id);
    setTodoList(updatedTodos);
    setTodoDeleted([...todoDeleted,todo.id])
  };

  const handleEdit = async (todo, newTask) => {
    const newTodo = {id:new Date().getTime(),todo:newTask,isCompleted:false};
    let updatedTodos = todoList.filter((task) => task.id !== todo.id);
    setTodoList([...updatedTodos,newTodo]);
    
    setChangedTodo(newTodo);
    setTodoEdited([...todoEdited,todo.id]);
    console.log("FROM APP");
    // console.log("UpadatedEDit TODo",updatedTodos);
    console.log("UpadatedEDit TODo",changedTodo);
    console.log("Edited Todo list",todoEdited);
  };

  return (
    <div className="bg-slate-800 h-screen flex flex-col gap-2 py-5">
      <InputBox 
      getTodos={getTodos} 
       CompleteTodos={todoCompleted}
       DeleteTodos={todoDeleted}
       EditTodos={todoEdited}
       addChangedTodo={changedTodo}
      />
      <TodoList
        todoList={todoList}
        Complete={handleComplete}
        DeleteTodo={handleDelete}
        EditTodo={handleEdit}
      />
    </div>
  );
}

export default App;
