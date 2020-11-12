import { ModelAttributes } from './Model';

export class Attributes<T> implements ModelAttributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => this.data[key]

  set = (update: T) => {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
