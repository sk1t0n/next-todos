import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { StatusCode } from '../../pages/api/statusCodes';
import type { RegisterResult } from '../../pages/api/users/register';

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

const getErrorMessageByStatusCode = (status: StatusCode): string => {
  let message;

  switch (status) {
    case StatusCode.BAD_REQUEST:
      message = 'Something went wrong!';
      break;
    case StatusCode.CONFLICT:
      message = 'This email is already registered!';
      break;
  }

  return message;
};

export const registerUser = createAsyncThunk<User, AsyncThunkArgRegisterUser>(
  'users/registerUser',
  async (arg, { rejectWithValue }) => {
    try {
      const dataToSerialize = { email: arg.email, password: arg.password };
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/register`, {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = action.payload ? true : false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});

export default userSlice.reducer;
