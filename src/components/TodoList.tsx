import React from "react";
import { Droppable } from "react-beautiful-dnd";
import {Todo} from "./model";
import SingleTodo from "./SingleTodo";
import "./styles.css";


interface props {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    completedTodos: Array<Todo>;
  }
  
  const TodoList: React.FC<props> = ({
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos,
  }) => {
    return (
      <div className="container">
        <Droppable droppableId={'TodoList'}>
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos_heading">Tarefas Ativas</span>
              {todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="TodosRemove">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`todos  ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove"
              }`}
            >
              <span className="todos_heading">Tarefas Completas</span>
              {completedTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={completedTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };
  
  export default TodoList;