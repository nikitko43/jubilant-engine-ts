import axios, {AxiosResponse} from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  public events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps) {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName] || [];
    handlers.forEach(callback => callback());
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