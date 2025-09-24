# React TypeScript Todo Application

A single-page To-Do application built with React and TypeScript. This application simulates interactions with a REST API by using mock data, demonstrating frontend skills including component design, state management, API integration, and user experience.

## Features

- **Todo List Display**: View a list of Todo items with title, description, and completion status
- **Add New Todo**: Create new Todo items with a title and description
- **Update Todo**: Edit existing Todo items
- **Mark as Complete**: Toggle completion status of Todo items
- **Delete Todo**: Remove Todo items from the list
- **Mock API Integration**: Simulated API calls with artificial delays
- **Loading States**: Visual indicators during "API" operations
- **Error Handling**: Clear error messages when operations fail
- **Responsive Design**: Works well on both desktop and mobile devices

## Technologies Used

- React 19
- TypeScript
- CSS (with CSS variables for theming)
- Vite (for fast development and building)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-typescript-todo.git
   cd react-typescript-todo
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

## Future Enhancements

- User authentication
- Categories/tags for todos
- Due dates and reminders
- Filtering and sorting options
- Dark/light theme toggle
- Persistent storage (localStorage or real backend)
"# todo-app" 
