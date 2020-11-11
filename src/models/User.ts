import axios, {AxiosResponse} from 'axios';
import {Eventing} from "./Eventing";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps) {
    Object.assign(this.data, update);
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse<UserProps>): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');
    if (!this.get('id')) {
      axios.post(`http://localhost:3000/users`, this.data);
    } else {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    }
  }
}