import { Subtask } from './subtask.model';

describe('Subtask', () => {
  it('should create an instance', () => {
    expect(new Subtask("Testen", true, 1)).toBeTruthy();
  });
});
