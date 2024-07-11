import React, { useEffect, useState } from 'react';

function InputBox({
  className = "",
  getTodos,
  CompleteTodos = [],
  DeleteTodos = [],
  EditTodos = [],
  addChangedTodo
}) {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleAdd = () => {
    if (todo.trim() === "") {
      console.log("Fail");
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      todo,
      isCompleted: false
    };
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    setTodo(""); // Clear the input box
  };

  useEffect(() => {
    if (addChangedTodo && addChangedTodo.todo && addChangedTodo.todo.trim() !== "") {
      setTodoList((prevTodoList) => [...prevTodoList, addChangedTodo]);
    }
  }, [addChangedTodo]);

  useEffect(() => {
    const validTodos = todoList.filter((todoItem) => todoItem.todo && todoItem.todo.trim() !== "");
    const newTodos = validTodos.filter(
      (todo) =>
        !DeleteTodos.includes(todo.id) &&
        !EditTodos.includes(todo.id) &&
        !CompleteTodos.includes(todo.id)
    );
    getTodos(newTodos);
  }, [todoList, DeleteTodos, EditTodos, CompleteTodos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className='flex items-start justify-center gap-y-3'>
      <input
        className={`bg-slate-300 w-15 sm:w-96 sm:h-8 h-13 p-2 focus-visible:outline-none ${className}`}
        type="text"
        placeholder='Todo'
        value={todo}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
        onChange={handleChange}
      />
      <span className='bg-transparent sm:h-8 h-13 text-center flex py-1.5 items-center px-1 border-2 border-orange-200'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={handleAdd}
        >
          <path
            className='text-yellow-500'
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </span>
    </div>
  );
}

export default InputBox;
