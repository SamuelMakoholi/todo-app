import React, { useState } from 'react';
import { Todo } from '../types/todo';
import LoadingSpinner from './LoadingSpinner';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: { title?: string; description?: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  
  // We don't need to track action type locally anymore as it's handled in App.tsx

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="todo-edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            disabled={isLoading}
            className="todo-title-input"
            placeholder="Title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            disabled={isLoading}
            className="todo-description-input"
            placeholder="Description"
          />
          <div className="todo-actions">
            <button onClick={handleSave} disabled={isLoading} className="save-btn">
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleCancel} disabled={isLoading} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-header">
            <div className="todo-checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleComplete}
                disabled={isLoading}
                className="todo-checkbox"
              />
              <h3 className={`todo-title ${todo.completed ? 'completed-text' : ''}`}>{todo.title}</h3>
            </div>
            <div className="todo-actions">
              <button onClick={handleEdit} disabled={isLoading} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                disabled={isLoading}
                className="delete-btn"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          <p className={`todo-description ${todo.completed ? 'completed-text' : ''}`}>
            {todo.description}
          </p>
          <div className="todo-meta">
            <span className="todo-date">Created: {formatDate(todo.createdAt)}</span>
            {todo.updatedAt !== todo.createdAt && (
              <span className="todo-date">Updated: {formatDate(todo.updatedAt)}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
