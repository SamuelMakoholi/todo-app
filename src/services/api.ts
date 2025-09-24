import { Todo, ApiResponse, CreateTodoPayload, UpdateTodoPayload } from '../types/todo';

// Initial mock data
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Learn React',
    description: 'Study React hooks and context API',
    completed: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Build Todo App',
    description: 'Create a todo application with TypeScript and React',
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Learn Next.js',
    description: 'Explore server-side rendering with Next.js',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate random failures (10% chance)
const simulateRandomFailure = (): boolean => {
  return Math.random() < 0.1;
};

// Mock API service
export const TodoApi = {
  // Get all todos
  async getTodos(): Promise<ApiResponse<Todo[]>> {
    // Simulate network delay (500-1500ms)
    await delay(500 + Math.random() * 1000);
    
    // Simulate random failure
    if (simulateRandomFailure()) {
      throw new Error('Failed to fetch todos');
    }
    
    return {
      success: true,
      data: [...mockTodos],
    };
  },
  
  // Get a single todo by id
  async getTodoById(id: string): Promise<ApiResponse<Todo>> {
    await delay(300 + Math.random() * 700);
    
    if (simulateRandomFailure()) {
      throw new Error(`Failed to fetch todo with id ${id}`);
    }
    
    const todo = mockTodos.find((t) => t.id === id);
    
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    
    return {
      success: true,
      data: { ...todo },
    };
  },
  
  // Create a new todo
  async createTodo(payload: CreateTodoPayload): Promise<ApiResponse<Todo>> {
    await delay(700 + Math.random() * 1000);
    
    if (simulateRandomFailure()) {
      throw new Error('Failed to create todo');
    }
    
    const newTodo: Todo = {
      id: (mockTodos.length + 1).toString(),
      title: payload.title,
      description: payload.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockTodos.push(newTodo);
    
    return {
      success: true,
      data: { ...newTodo },
      message: 'Todo created successfully',
    };
  },
  
  // Update an existing todo
  async updateTodo(payload: UpdateTodoPayload): Promise<ApiResponse<Todo>> {
    await delay(500 + Math.random() * 800);
    
    if (simulateRandomFailure()) {
      throw new Error(`Failed to update todo with id ${payload.id}`);
    }
    
    const todoIndex = mockTodos.findIndex((t) => t.id === payload.id);
    
    if (todoIndex === -1) {
      throw new Error(`Todo with id ${payload.id} not found`);
    }
    
    const updatedTodo = {
      ...mockTodos[todoIndex],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    
    mockTodos[todoIndex] = updatedTodo;
    
    return {
      success: true,
      data: { ...updatedTodo },
      message: 'Todo updated successfully',
    };
  },
  
  // Delete a todo
  async deleteTodo(id: string): Promise<ApiResponse<null>> {
    await delay(400 + Math.random() * 600);
    
    if (simulateRandomFailure()) {
      throw new Error(`Failed to delete todo with id ${id}`);
    }
    
    const todoIndex = mockTodos.findIndex((t) => t.id === id);
    
    if (todoIndex === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }
    
    mockTodos.splice(todoIndex, 1);
    
    return {
      success: true,
      data: null,
      message: 'Todo deleted successfully',
    };
  },
};
