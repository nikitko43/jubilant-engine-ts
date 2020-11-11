import {User} from "../src/models/User";
import {expect} from "@jest/globals";

test('creating user', () => {
  const user = new User({name: 'John', age: 27});
  expect(user.get('name')).toBe('John');
  expect(user.get('age')).toBe(27);
});

test('update user', () => {
  const user = new User({name: 'John', age: 27});
  user.set({name: 'Alex', age: 28});
  expect(user.get('name')).toBe('Alex');
  expect(user.get('age')).toBe(28);
});

test('update user one field', () => {
  const user = new User({name: 'John', age: 27});
  user.set({name: 'Alex'});
  expect(user.get('name')).toBe('Alex');
});

test('uninitialized user', () => {
  const user = new User({});
  expect(user.get('name')).toBeUndefined();
});

test('add event to user', () => {
  const user = new User({});
  user.on('change', () => console.log('123'));
  expect(user.events['change']).toHaveLength(1);
});

test('trigger one event on user', () => {
  const user = new User({});
  const mockCallback = jest.fn();
  user.on('change', mockCallback);
  user.trigger('change');
  expect(mockCallback.mock.calls).toHaveLength(1);
  user.trigger('change');
  expect(mockCallback.mock.calls).toHaveLength(2);
});

test('trigger multiple events on user', () => {
  const user = new User({});
  const mockCallback1 = jest.fn();
  const mockCallback2 = jest.fn();
  user.on('change', mockCallback1);
  user.on('change', mockCallback2);
  user.trigger('change');
  expect(mockCallback1.mock.calls).toHaveLength(1);
  expect(mockCallback2.mock.calls).toHaveLength(1);
});

test('event of other type not triggers on user', () => {
  const user = new User({});
  const mockCallback = jest.fn();
  user.on('change', mockCallback);
  user.trigger('click');
  expect(mockCallback.mock.calls).toHaveLength(0);
});