/**
 * @jest-environment jsdom
 */

import {
  expect, test, jest, beforeEach, afterEach,
} from '@jest/globals';
import { UserForm } from './UserForm';
import { User } from '../models/User';

beforeEach(() => {
  document.body.innerHTML = `
    <div id="container">
    </div>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('UserForm renders template() result to document', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userForm = new UserForm(container, user);
  userForm.render();
  expect(container.innerHTML).toContain('User Form');
});

test('UserForm renders template() and bind click listener to button inside', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userForm = new UserForm(container, user);
  const callback = jest.fn();
  userForm.onSetAgeClick = callback;
  userForm.render();
  const button = document.querySelector('.set-age') as HTMLElement;

  button.click();
  button.click();
  expect(callback).toHaveBeenCalledTimes(2);
});

test('can click on random age button and it will set random age to model', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userForm = new UserForm(container, user);
  userForm.render();
  const button = document.querySelector('.set-age') as HTMLElement;

  button.click();
  expect(user.get('age')).not.toBe(28);
});

test('UserForm renders template() with model information inside it', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userForm = new UserForm(container, user);
  userForm.render();

  expect(container.innerHTML).toContain('John');
  expect(container.innerHTML).toContain('28');
});

test('can click on random age button and it will rerender template', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userForm = new UserForm(container, user);
  userForm.render();
  const button = document.querySelector('.set-age') as HTMLElement;

  button.click();
  expect(container.innerHTML).toContain(user.get('age'));
  expect(container.innerHTML).not.toContain(28);
});

test('click change name button will rerender template with name from input', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userForm = new UserForm(container, user);
  userForm.render();
  const button = document.querySelector('.set-name') as HTMLElement;
  const input = document.querySelector('input') as HTMLInputElement;
  input.value = 'Alex';

  button.click();
  expect(user.get('name')).toBe('Alex');
  expect(container.innerHTML).toContain('Alex');
  expect(container.innerHTML).not.toContain('John');
});
