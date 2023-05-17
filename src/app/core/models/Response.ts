import {OperationResult} from "./OperationResult";

export class Response<T> {
  status: OperationResult = OperationResult.OK;
  content: T | null = null;
  messages: string[] = [];
}
