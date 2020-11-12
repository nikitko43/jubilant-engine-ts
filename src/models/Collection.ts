import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from './User';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];

  events: Eventing = new Eventing();

  constructor(public rootURL: string, public deserializer: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootURL).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserializer(value));
      });
      this.trigger('change');
    });
  }
}
