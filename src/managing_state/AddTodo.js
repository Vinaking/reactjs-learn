import { useContext, useState } from "react";
import { TodoDispatchContext } from "./TodoProvider.js";

let nextId = 3
export default function AddTodo({ onAddTodo }) {
    const [title, setTitle] = useState('');
    const dispatch = useContext(TodoDispatchContext);

    function handleAddTodo() {
        dispatch({
            type: 'add',
            id: nextId++,
            title: title
        });
        setTitle('');
    }
    return (
        <>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add</button>
        </>
    );
}