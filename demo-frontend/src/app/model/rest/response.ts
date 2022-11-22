export class DataSourceRESTResponse<T> {
  totalElements: number;
  responseCode: string;
  responseMessage: string;
  data: T;
}