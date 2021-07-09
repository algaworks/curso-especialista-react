import CustomError, { ErrorType } from "../CustomError";

export default class GenericError extends CustomError {
  static type = "GenericError" as ErrorType;
}
