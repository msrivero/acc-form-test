import { ResultStatusType } from "antd/es/result";

export interface IUser {
  car: string;
  email: string;
  firstname: string;
  lastname: string;
  purchasedate: string;
  requestId?: string;
}

export interface IResult {
  status: ResultStatusType;
  title: string;
}

export interface IResponse {
  data: IUser;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}
