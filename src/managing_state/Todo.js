import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { TodoProvider } from "./TodoProvider";

export default function Todo() {
    return (
        <div>
            <TodoProvider>
                <AddTodo />
                <TodoList />
            </TodoProvider>
        </div>
    );
}

