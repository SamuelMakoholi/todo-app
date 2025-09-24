import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, updates: { title?: string; description?: string; completed?: boolean }) => void;
  onDeleteTodo: (id: string) => void;
  loadingTodoIds: string[];
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
  loadingTodoIds,
}) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No todos yet</h3>
        <p>Add a new todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
          isLoading={loadingTodoIds.includes(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
