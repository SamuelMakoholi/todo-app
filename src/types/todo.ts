// Todo item interface
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// API response interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Request payloads
export interface CreateTodoPayload {
  title: string;
  description: string;
}

export interface UpdateTodoPayload {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}
