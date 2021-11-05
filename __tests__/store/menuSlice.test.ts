import reducer, { setCurrent } from '../../store/slices/menuSlice';

describe('menuSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ current: 'home' });
  });

  it('should handle a todo being added to an empty list', () => {
    const previousState = { current: 'home' };
    expect(reducer(previousState, setCurrent({ current: 'about' })))
      .toEqual({ current: 'about' });
  });

  it('should handle a todo being added to an existing list', () => {
    const previousState = { current: 'about' };
    expect(reducer(previousState, setCurrent({ current: 'home' })))
      .toEqual({ current: 'home' });
  });
});
