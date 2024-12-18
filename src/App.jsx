import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);
  const addTodo = (title) => {
    setTodos((currTodos) => {
      return [
        ...currTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  };

  const toggleTodo = (id, completed) => {
    setTodos((currTodos) => {
      return currTodos.map((todo) => {
        if (todo.id == id) return { ...todo, completed };
        return todo;
      });
    });
  };
  const deleteTodo = (id) => {
    setTodos((currTodos) => {
      return currTodos.filter((todo) => todo.id != id);
    });
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header"> Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
