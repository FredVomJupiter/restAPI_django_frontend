import { Todo } from './todo.model';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo(1, "Title", "Description", true, 1, 1, new Date(), [1], [1])).toBeTruthy();
  });

  it('should have same id as input parameter', () => {
    expect(new Todo(1, "Title", "Description", true, 1, 1, new Date(), [1], [1]).id).toBe(1);
  });
});
