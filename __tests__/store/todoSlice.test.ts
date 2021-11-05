import { Action as ActionRedux } from 'redux';
import reducer, { addTodo } from '../../store/slices/todoSlice';
import { TodoState } from '../../store/slices/todoSlice';
import { Todo } from '../../components/todos/types';

describe('todoSlice', () => {
  type Action = ActionRedux<any>;

  it('should return the initial state', () => {
    const action: Action = {type: undefined};
    const initialState: TodoState = { todos: [] };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('should handle a todo being added to an empty list', () => {
    const previousState: TodoState = { todos: [] };
    const newTodo: Pick<Todo, 'text'> = { text: 'New todo' };
    expect(reducer(previousState, addTodo(newTodo)))
      .toMatchObject({ todos: [newTodo] });
  });

  it('should handle a todo being added to an existing list', () => {
    const previousState: TodoState = {
      todos: [
        {
          id: Date.now(),
          completed: false,
          text: 'Old todo'
        }
      ]
    };
    const newTodo: Pick<Todo, 'text'> = { text: 'New todo' };
    expect(reducer(previousState, addTodo(newTodo)))
      .toMatchObject({
        todos: [
          { text: 'Old todo' },
          { text: 'New todo' }
        ]
      });
  });
});
