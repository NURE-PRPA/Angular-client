import {OperationResult} from "./OperationResult";

export class Response<T extends object | null> {
  status: OperationResult = OperationResult.OK;
  content: T | null = null;
  messages: string[] = [];
}
