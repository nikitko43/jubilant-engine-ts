import axios, {AxiosPromise} from "axios";


interface HasID {
  id?: number;
}

export class Sync<T extends HasID> {
  constructor(public rootURL: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootURL}/${id}`);
      // .then((response: AxiosResponse<UserProps>): void => {
      //   this.set(response.data);
      // });
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (!id) {
      return axios.post(this.rootURL, data);
    } else {
      return axios.put(`${this.rootURL}/${id}`, data);
    }
  }
}