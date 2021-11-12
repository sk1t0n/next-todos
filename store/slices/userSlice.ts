import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { StatusCode } from '../../pages/api/statusCodes';
import type { RegisterResult } from '../../pages/api/users/register';
import type { SignInResult } from '../../pages/api/users/sign-in';
import type { SignOutResult } from '../../pages/api/users/sign-out';

export type UserState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
};

const initialState: UserState = {
  isLoading: false,
  isLoggedIn: false,
  error: null
};

type AsyncThunkArgRegisterUser = {
  email: string;
  password: string;
  callbackSuccess: () => void;
  callbackFail: (message: string) => void;
};

type AsyncThunkArgSignIn = {
  email: string;
  password: string;
  callbackSuccess: () => void;
  callbackFail: (message: string) => void;
};

type AsyncThunkArgSignOut = {
  callbackSuccess: () => void;
  callbackFail: (message: string) => void;
};

const getErrorMessageByStatusCode = (status: StatusCode): string => {
  let message;

  switch (status) {
    case StatusCode.BAD_REQUEST:
      message = 'Something went wrong!';
      break;
    case StatusCode.CONFLICT:
      message = 'This email is already registered!';
      break;
    case StatusCode.FORBIDDEN:
      message = 'Wrong email or password!'
      break;
    case StatusCode.NOT_FOUND:
      message = 'Email not found!';
      break;
  }

  return message;
};

const API_HOST = process.env.API_HOST;

export const registerUser = createAsyncThunk<User, AsyncThunkArgRegisterUser>(
  'users/registerUser',
  async (arg, { rejectWithValue }) => {
    try {
      const dataToSerialize = { email: arg.email, password: arg.password };
      const response = await fetch(`${API_HOST}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSerialize)
      });
      const data: RegisterResult = await response.json();
      if (data.user) {
        arg.callbackSuccess();
        return data.user;
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

export const signIn = createAsyncThunk<User, AsyncThunkArgSignIn>(
  'users/sign-in',
  async (arg, { rejectWithValue }) => {
    try {
      const dataToSerialize = { email: arg.email, password: arg.password };
      const response = await fetch(`${API_HOST}/users/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSerialize)
      });
      const data: SignInResult = await response.json();
      if (data.user) {
        arg.callbackSuccess();
        return data.user;
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

export const signOut = createAsyncThunk<boolean, AsyncThunkArgSignOut>(
  'users/sign-out',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_HOST}/users/sign-out`);
      const data: SignOutResult = await response.json();
      if (data.status === StatusCode.OK) {
        arg.callbackSuccess();
        return true;
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = action.payload ? true : false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = action.payload ? false : true;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});

export default userSlice.reducer;
