import { useContext, useState } from "react";
import { TodoContext, TodoDispatchContext } from "./TodoProvider.js";

export default function TodoList() {
    const todos = useContext(TodoContext);
    return (
        <>
            {todos.map(todo => (
                <Todo key={todo.id}
                    todo={todo}
                />
            ))}
        </>
    );
}

function Todo({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const dispatch = useContext(TodoDispatchContext);
    let todoContent;

    function handleEditChange() {
        if(isEditing) {
            dispatch({
                type: 'edit',
                id: todo.id,
                title: title
            });
        }
        setIsEditing(!isEditing)
    }

    function handleDelete() {
        dispatch({
            type: 'delete',
            id: todo.id
        });
    }

    if (isEditing) {
        todoContent = <div key={todo.id}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleEditChange}>Save</button>
        </div>
    } else {
        todoContent = <div key={todo.id}>
            <label>{todo.title}</label>
            <button onClick={handleEditChange}>Edit</button>
        </div>
    }

    return (
        <div style={{ display: 'flex' }}>
            {todoContent}
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

