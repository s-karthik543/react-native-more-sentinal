import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

export default class APIRequest {
  static instance: AxiosInstance;

  static init(url: string, apiKey: string) {
    APIRequest.instance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-api-key': apiKey,
      },
    });
  }

  static sendEvents(data: any): Promise<any> {
    return new Promise((resolve) => {
      APIRequest.instance
        .post('/events', data)
        .then((_: AxiosResponse) => {
          resolve({ success: true });
        })
        .catch((_: AxiosError) => {
          resolve({
            success: false,
          });
        });
    });
  }
}
