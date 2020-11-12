import axios, { AxiosPromise } from 'axios';
import { ModelSync } from './Model';

interface HasID {
  id?: number;
}

export class ApiSync<T extends HasID> implements ModelSync<T> {
  constructor(public rootURL: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (!id) {
      return axios.post(this.rootURL, data);
    }
    return axios.put(`${this.rootURL}/${id}`, data);
  }
}
