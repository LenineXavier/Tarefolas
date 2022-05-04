import React, { useEffect, useRef }  from "react";
import {Todo} from "./model"
import {AiFillEdit} from "react-icons/ai";
import {MdDone, MdDelete} from "react-icons/md"
import "./styles.css"
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index:number,
    todo:Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;

}

const SingleTodo: React.FC<{
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  }> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
  
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      inputRef.current?.focus();
    }, [edit]);
  
    const handleEdit = (e: React.FormEvent, id: number) => {
      e.preventDefault();
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
      );
      setEdit(false);
    };
  
    const handleDelete = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  
    const handleDone = (id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    };
  
    return (
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`todos_single ${snapshot.isDragging ? "drag" : ""}`}
          >
            {edit ? (
              <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="todos_single--text"
                ref={inputRef}
              />
            ) : todo.isDone ? (
              <s className="todos_single--text">{todo.todo}</s>
            ) : (
              <span className="todos_single--text">{todo.todo}</span>
            )}
            <div>
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                <MdDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )}
      </Draggable>
    );
  };
  
  export default SingleTodo;