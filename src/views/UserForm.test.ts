/**
 * @jest-environment jsdom
 */

import {
  afterEach, beforeEach, expect, jest, test,
} from '@jest/globals';
import { User } from '../models/User';
import { UserForm } from './UserForm';

beforeEach(() => {
  document.body.innerHTML = `
    <div id="container">
    </div>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('UserEdit renders template() and bind click listener to button inside', () => {
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
