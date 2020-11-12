/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import {
  expect, test, jest, beforeEach, afterEach,
} from '@jest/globals';
import { UserEdit } from './UserEdit';
import { User } from '../models/User';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  document.body.innerHTML = `
    <div id="container">
    </div>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('UserEdit renders template() result to document', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userEdit = new UserEdit(container, user);
  userEdit.render();
  expect(container.innerHTML).toContain('User detail');
});

test('can click on random age button and it will set random age to model', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userEdit = new UserEdit(container, user);
  userEdit.render();
  const button = document.querySelector('.set-age') as HTMLElement;

  button.click();
  expect(user.get('age')).not.toBe(28);
});

test('UserEdit renders template() with model information inside it', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userEdit = new UserEdit(container, user);
  userEdit.render();

  expect(container.innerHTML).toContain('John');
  expect(container.innerHTML).toContain('28');
});

test('can click on random age button and it will rerender template', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userEdit = new UserEdit(container, user);
  userEdit.render();
  const button = document.querySelector('.set-age') as HTMLElement;

  button.click();
  expect(container.innerHTML).toContain(user.get('age'));
  expect(container.innerHTML).not.toContain(28);
});

test('click change name button will rerender template with name from input', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userEdit = new UserEdit(container, user);
  userEdit.render();
  const button = document.querySelector('.set-name') as HTMLElement;
  const input = document.querySelector('input') as HTMLInputElement;
  input.value = 'Alex';

  button.click();
  expect(user.get('name')).toBe('Alex');
  expect(container.innerHTML).toContain('Alex');
  expect(container.innerHTML).not.toContain('John');
});

test('click save button will save model using Sync', (done) => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userEdit = new UserEdit(container, user);
  userEdit.render();

  mockedAxios.post.mockResolvedValue({ data: { id: 1, name: 'John', age: 28 } });
  const button = document.querySelector('.save-model') as HTMLElement;

  user.on('saved', () => {
    try {
      expect(user.get('name')).toBe('John');
      expect(user.get('id')).toBe(1);
      done?.();
    } catch (error) {
      done?.();
    }
  });

  button.click();
  expect(mockedAxios.post).toHaveBeenCalledTimes(1);
});

test('UserEdit has rendered both childes', () => {
  const container = document.getElementById('container') || new HTMLElement();
  const user = User.buildUser({ name: 'John', age: 28 });
  const userEdit = new UserEdit(container, user);
  userEdit.render();
  expect(container.innerHTML).toContain('<div>User name: John</div>');
  expect(container.innerHTML).toContain('<input placeholder="John">');
});
