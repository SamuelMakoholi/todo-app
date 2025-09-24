import React, { useState } from 'react';
import { CreateTodoPayload } from '../types/todo';
import LoadingSpinner from './LoadingSpinner';

interface AddTodoFormProps {
  onAddTodo: (todo: CreateTodoPayload) => void;
  isLoading: boolean;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTodo({
      title: title.trim(),
      description: description.trim(),
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setIsFormVisible(false);
  };

  return (
    <div className="add-todo-container">
      {!isFormVisible ? (
        <button 
          className="add-todo-button" 
          onClick={() => setIsFormVisible(true)}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : '+ Add New Todo'}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="add-todo-form">
          <h3>Add New Todo</h3>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              disabled={isLoading}
              required
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
              disabled={isLoading}
              rows={3}
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => setIsFormVisible(false)}
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading || !title.trim()}
            >
              {isLoading ? 'Adding...' : 'Add Todo'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTodoForm;
