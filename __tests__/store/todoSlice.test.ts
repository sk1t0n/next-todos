import { Action as ActionRedux } from 'redux';
import reducer, { addTodo } from '../../store/slices/todoSlice';
import { TodoState } from '../../store/slices/todoSlice';
import { Todo } from '../../components/todos/types';

describe('todoSlice', () => {
  type Action = ActionRedux<any>;

  it('should return the initial state', () => {
    const action: Action = {type: undefined};
    const initialState: TodoState = { 
      todos: [],
      error: null,
      isLoading: false
    };
    expect(reducer(undefined, action)).toEqual(initialState);
  });
});
