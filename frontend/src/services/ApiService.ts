import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface IApiService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

export class ApiService implements IApiService {
  private readonly _path: string;
  private readonly _axios: AxiosInstance;

  constructor(path: string){
    this._path = path;
    this._axios = axiosInstance;
  }

  public async get<T>(search?: string): Promise<T> {
    const route = search ? this._path + search : this._path;
    const response = await this._axios.get<T>(route);
    return response.data;
  }

  public async post<T>(data: any, search?: string): Promise<T> {
    const route = search ? this._path + search : this._path;
    const response = await this._axios.post<T>(route, data);
    return response.data;
  }

  public async put<T>(data: any, search?: string): Promise<T> {
    const pathId = this._path + '/' + data.id
    const route = search ? pathId + search : pathId;
    const response = await this._axios.put<T>(route, data);
    return response.data;
  }

  public async delete<T>(search: string): Promise<T> {
    if(!search.startsWith('/')){
      search = '/' + search;
    }
    const route = this._path + search;
    const response = await this._axios.delete<T>(route);
    return response.data;
  }

  public async save<T>(data: any, search?: string): Promise<T> {
    if(!data.id){
      return await this.post(data, search);
    }
    return await this.put(data, search);
  }
}