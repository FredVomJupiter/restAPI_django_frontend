import { Contact } from './contact.model';

describe('Contact', () => {
  it('should create an instance', () => {
    expect(new Contact(1, "Peter", "peter@mail.de", "123456")).toBeTruthy();
  });
});
