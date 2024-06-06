import { useReducer, createContext } from "react";

export const TodoContext = createContext(null);

export const TodoDispatchContext = createContext(null);

export function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, initialTodos);

    return (
        <TodoContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    );
}

function todoReducer(todos, action) {
    switch (action.type) {
        case 'add': {
            return [
                { id: action.id, title: action.title, done: false },
                ...todos
            ]
        }
        case 'edit': {
            return todos.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, title: action.title }
                }
                return todo
            })
        }
        case 'delete': {
            return todos.filter(todo => {
                return todo.id !== action.id
            })
        }
        default: {

        }
    }
}

const initialTodos = [
    { id: 0, title: 'Buy milk', done: true },
    { id: 1, title: 'Eat tacos', done: false },
    { id: 2, title: 'Brew tea', done: false },
];