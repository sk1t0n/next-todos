import reducer, { addTodo, updateTodo, removeTodo } from '../../store/todoSlice';

describe('todoSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ todos: [] });
  });

  it('should handle a todo being added to an empty list', () => {
    const previousState = { todos: [] };
    expect(reducer(previousState, addTodo({ text: 'New todo' })))
      .toMatchObject({ todos: [ { text: 'New todo' } ] });
  });

  it('should handle a todo being added to an existing list', () => {
    const previousState = {
      todos: [
        {
          id: Date.now(),
          completed: false,
          text: 'Old todo'
        }
      ]
    };

    expect(reducer(previousState, addTodo({ text: 'New todo' })))
      .toMatchObject({
        todos: [
          { text: 'Old todo' },
          { text: 'New todo' }
        ]
      });
  });
});
