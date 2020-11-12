import {Attributes} from "./Attributes";

type UserProps = {name: string, age: number};

test('Attributes set and get', () => {
  const attrs = new Attributes<UserProps>({name: 'John', age: 32});
  expect(attrs.get('name')).toBe('John');
  expect(attrs.get('age')).toBe(32);
  attrs.set({name:'Alex', age: 28});
  expect(attrs.get('name')).toBe('Alex');
  expect(attrs.get('age')).toBe(28);
});

test('Attributes getAll', () => {
  const data = {name: 'John', age: 32};
  const attrs = new Attributes<UserProps>(data);
  expect(attrs.getAll()).toBe(data);
});