import {Eventing} from "./Eventing";
import {expect} from "@jest/globals";

test('Eventing with one listener', () => {
  const events = new Eventing();
  const mockCallback = jest.fn();
  events.on('change', mockCallback);
  events.trigger('change');
  expect(mockCallback.mock.calls).toHaveLength(1);
  events.trigger('change');
  expect(mockCallback.mock.calls).toHaveLength(2);
  events.trigger('click');
  expect(mockCallback.mock.calls).toHaveLength(2);
});

test('Eventing with multiple listeners', () => {
  const events = new Eventing();
  const mockCallback1 = jest.fn();
  const mockCallback2 = jest.fn();
  events.on('change', mockCallback1);
  events.trigger('change');
  expect(mockCallback1.mock.calls).toHaveLength(1);
  events.on('change', mockCallback2);
  events.trigger('change');
  expect(mockCallback1.mock.calls).toHaveLength(2);
  expect(mockCallback2.mock.calls).toHaveLength(1);
})
