import CustomError, { ErrorType } from "../CustomError";

export default class InvalidDataError extends CustomError {
  static type = "InvalidDataError" as ErrorType;
}
