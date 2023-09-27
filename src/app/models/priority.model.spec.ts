import { Priority } from './priority.model';

describe('Priority', () => {
  it('should create an instance', () => {
    expect(new Priority("low")).toBeTruthy();
  });
});
