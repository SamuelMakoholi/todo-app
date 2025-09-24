# React Todo Application

A single-page To-Do application built with React and TypeScript. This application simulates interactions with a REST API by using mock data, demonstrating frontend skills including component design, state management, API integration, and user experience.


## Technologies Used

- React 19
- TypeScript
- CSS (with CSS variables for theming)
- Vite (for fast development and building)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/SamuelMakoholi/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
/src
  /components        # React components
    AddTodoForm.tsx  # Form for adding new todos
    ErrorMessage.tsx # Error display component
    LoadingSpinner.tsx # Loading indicator
    TodoItem.tsx     # Individual todo item
    TodoList.tsx     # List of todo items
  /services
    api.ts           # Mock API service
  /types
    todo.ts          # TypeScript interfaces
  App.tsx            # Main application component
  main.jsx           # Entry point
  App.css            # Styles
  index.css          # Global styles
```

## Mock API

The application simulates API calls with artificial delays (500-1500ms) and occasional random failures (10% chance) to demonstrate proper handling of asynchronous operations, loading states, and error handling.

## Build for Production

To build the application for production:

```
npm run build
```

The build artifacts will be stored in the `dist/` directory.


"# todo-app" 
