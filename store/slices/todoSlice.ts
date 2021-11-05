import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../components/todos/types';

export type TodoState = {
  todos: Array<Todo>;
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false
      });
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map(todo => {
        if (todo.id !== action.payload.id) return todo;

        return {
          ...todo,
          completed: !todo.completed
        };
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
    },
    setTodos: (state, action) => {
      state.todos = action.payload.todos;
    }
  }
});

export const { addTodo, updateTodo, removeTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
