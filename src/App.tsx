import React, { useState, useEffect } from 'react';
import { Todo, CreateTodoPayload, UpdateTodoPayload } from './types/todo';
import { TodoApi } from './services/api';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import './App.css';

const AppContent = () => {
  // State management
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track loading states for different actions
  interface LoadingTodoState {
    id: string;
    action: 'update' | 'delete' | 'complete';
  }
  const [loadingTodos, setLoadingTodos] = useState<LoadingTodoState[]>([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  
  // Get notification context
  const { showNotification } = useNotification();

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await TodoApi.getTodos();
      setTodos(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new todo
  const handleAddTodo = async (todoData: CreateTodoPayload) => {
    setIsAddingTodo(true);
    setError(null);
    
    try {
      const response = await TodoApi.createTodo(todoData);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      showNotification('success', response.message || 'Todo added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add todo';
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setIsAddingTodo(false);
    }
  };

  // Update a todo
  const handleUpdateTodo = async (id: string, updates: { title?: string; description?: string; completed?: boolean }) => {
    // Determine the action type
    const action = updates.completed !== undefined ? 'complete' : 'update';
    
    // Add to loading state
    setLoadingTodos((prev) => [...prev, { id, action }]);
    setError(null);
    
    try {
      const payload: UpdateTodoPayload = { id, ...updates };
      const response = await TodoApi.updateTodo(payload);
      
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response.data : todo))
      );
      showNotification('success', response.message || 'Todo updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to update todo ${id}`;
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setLoadingTodos((prev) => prev.filter((item) => !(item.id === id && item.action === action)));
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id: string) => {
    setLoadingTodos((prev) => [...prev, { id, action: 'delete' }]);
    setError(null);
    
    try {
      const response = await TodoApi.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      showNotification('success', response.message || 'Todo deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to delete todo ${id}`;
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setLoadingTodos((prev) => prev.filter((item) => !(item.id === id && item.action === 'delete')));
    }
  };

  return (
    <div className="todo-app">
      <header className="app-header">
        <h1>Todo Application</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      {/* Error message */}
      {error && <ErrorMessage message={error} onRetry={fetchTodos} />}

      {/* Add Todo Form */}
      <AddTodoForm onAddTodo={handleAddTodo} isLoading={isAddingTodo} />

      {/* Todo List with loading state */}
      {isLoading ? (
        <div className="loading-container">
          <LoadingSpinner size="large" />
          <p>Loading todos...</p>
        </div>
      ) : (
        <TodoList
          todos={todos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
          loadingTodoIds={loadingTodos.map(item => item.id)}
        />
      )}
    </div>
  );
}

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
};

export default App;
