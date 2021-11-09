import { FirestoreErrorCode } from '@firebase/firestore/dist/lite';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../components/todos/types';
import type { GetTodosResult, AddTodoResult } from '../../pages/api/todos';
import type { UpdateTodoResult, RemoveTodoResult } from '../../pages/api/todos/[id]';

export type TodoState = {
  todos: Todo[];
  error: string | null;
  isLoading: boolean;
}

type AsyncThunkArgAddTodo = {
  text: string;
  callbackSuccess: () => void;
  callbackFail: () => void;
};

type AsyncThunkReturnTypeUpdateTodo = {
  id: string;
  updatedFields: Partial<Todo>;
};

type AsyncThunkArgUpdateTodo = {
  id: string;
  completed: boolean;
  callbackSuccess: () => void;
  callbackFail: () => void;
};

type AsyncThunkArgRemoveTodo = {
  id: string;
  callbackSuccess: () => void;
  callbackFail: () => void;
};

const initialState: TodoState = {
  todos: [],
  error: null,
  isLoading: false
};

const getErrorMessageByFirestoreErrorCode = (code: FirestoreErrorCode): string => {
  const messages = {
    'unknown': 'Something went wrong',
  };

  return messages[code];
}

export const getTodos = createAsyncThunk<Array<Todo>>(
  'todos/getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todos`);
      const data: GetTodosResult = await response.json();
      if (data.todos) {
        return data.todos;
      } else {
        const message = getErrorMessageByFirestoreErrorCode(data.error.code);
        throw new Error(message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk<Todo, AsyncThunkArgAddTodo>(
  'todos/addTodo',
  async (arg, { rejectWithValue }) => {
    try{
      const dataToSerialize: Pick<Todo, 'text'> = { text: arg.text };
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSerialize)
      });
      const data: AddTodoResult = await response.json();
      if (data.todo) {
        arg.callbackSuccess();
        return data.todo;
      } else {
        const message = getErrorMessageByFirestoreErrorCode(data.error.code);
        throw new Error(message);
      }
    } catch (error) {
      arg.callbackFail();
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk<AsyncThunkReturnTypeUpdateTodo, AsyncThunkArgUpdateTodo>(
  'todos/updateTodo',
  async (arg, { rejectWithValue }) => {
    try {
      const dataToSerialize: Pick<Todo, 'completed'> = { completed: arg.completed };
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todos/${arg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSerialize)
      });
      const data: UpdateTodoResult = await response.json();
      if (data.updatedFields) {
        arg.callbackSuccess();
        return { id: data.id, updatedFields: data.updatedFields };
      } else {
        const message = getErrorMessageByFirestoreErrorCode(data.error.code);
        throw new Error(message);
      }
    } catch (error) {
      arg.callbackFail();
      return rejectWithValue(error.message);
    }
  }
);

export const removeTodo = createAsyncThunk<string, AsyncThunkArgRemoveTodo>(
  'todos/removeTodo',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todos/${arg.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data: RemoveTodoResult = await response.json();
      if (data.id) {
        arg.callbackSuccess();
        return data.id;
      } else {
        const message = getErrorMessageByFirestoreErrorCode(data.error.code);
        throw new Error(message);
      }
    } catch (error) {
      arg.callbackFail();
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
