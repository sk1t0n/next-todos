import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../components/todos/types';
import type { GetTodosResult, AddTodoResult } from '../../pages/api/todos';
import type { UpdateTodoResult, RemoveTodoResult } from '../../pages/api/todos/[id]';
import { StatusCode } from '../../pages/api/statusCodes';

export type TodoState = {
  todos: Todo[];
  error: string | null;
  isLoading: boolean;
}

type AsyncThunkArgGetTodos = {
  callbackFail: (message: string) => void;
};

type AsyncThunkArgAddTodo = {
  text: string;
  callbackSuccess: () => void;
  callbackFail: (message: string) => void;
};

type AsyncThunkReturnTypeUpdateTodo = {
  id: string;
  updatedFields: Partial<Todo>;
};

type AsyncThunkArgUpdateTodo = {
  id: string;
  completed: boolean;
  callbackSuccess: () => void;
  callbackFail: (message: string) => void;
};

type AsyncThunkArgRemoveTodo = {
  id: string;
  callbackSuccess: () => void;
  callbackFail: (message: string) => void;
};

const initialState: TodoState = {
  todos: [],
  error: null,
  isLoading: false
};

const getErrorMessageByStatusCode = (status: StatusCode): string => {
  let message;

  switch (status) {
    case StatusCode.BAD_REQUEST:
      message = 'Something went wrong!';
      break;
    case StatusCode.UNAUTHORIZED:
      message = 'You are not logged in! Log in and try again.';
      break;
  }

  return message;
}

const API_HOST = process.env.API_HOST;

export const getTodos = createAsyncThunk<Array<Todo>, AsyncThunkArgGetTodos>(
  'todos/getTodos',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_HOST}/todos`);
      const data: GetTodosResult = await response.json();
      if (data.todos) {
        return data.todos;
      } else {
        const message = getErrorMessageByStatusCode(data.status);
        throw new Error(message);
      }
    } catch (error) {
      arg.callbackFail(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk<Todo, AsyncThunkArgAddTodo>(
  'todos/addTodo',
  async (arg, { rejectWithValue }) => {
    try{
      const dataToSerialize: Pick<Todo, 'text'> = { text: arg.text };
      const response = await fetch(`${API_HOST}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSerialize)
      });
      const data: AddTodoResult = await response.json();
      if (data.todo) {
        arg.callbackSuccess();
        return data.todo;
      } else {
        const message = getErrorMessageByStatusCode(data.status);
        throw new Error(message);
      }
    } catch (error) {
      arg.callbackFail(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk
<AsyncThunkReturnTypeUpdateTodo, AsyncThunkArgUpdateTodo>
(
  'todos/updateTodo',
  async (arg, { rejectWithValue }) => {
    try {
      const dataToSerialize: Pick<Todo, 'completed'> = { completed: arg.completed };
      const response = await fetch(`${API_HOST}/todos/${arg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSerialize)
      });
      const data: UpdateTodoResult = await response.json();
      if (data.updatedFields) {
        arg.callbackSuccess();
        return { id: data.id, updatedFields: data.updatedFields };
      } else {
        const message = getErrorMessageByStatusCode(data.status);
        throw new Error(message);
      }
    } catch (error) {
      arg.callbackFail(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeTodo = createAsyncThunk<string, AsyncThunkArgRemoveTodo>(
  'todos/removeTodo',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_HOST}/todos/${arg.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data: RemoveTodoResult = await response.json();
      if (data.id) {
        arg.callbackSuccess();
        return data.id;
      } else {
        const message = getErrorMessageByStatusCode(data.status);
        throw new Error(message);
      }
    } catch (error) {
      arg.callbackFail(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload ?? [];
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) state.todos.push(action.payload);
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        for (let i = 0; i < state.todos.length; i++) {
          if (state.todos[i].id === action.payload.id) {
            state.todos[i].completed = action.payload.updatedFields.completed;
            break;
          }
        }
      };
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(removeTodo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      }
    });
    builder.addCase(removeTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
  }
});

export default todoSlice.reducer;
