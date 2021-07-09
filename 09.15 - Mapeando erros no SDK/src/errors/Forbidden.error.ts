import CustomError, { ErrorType } from "../CustomError";

export default class ForbiddenError extends CustomError {
  static type = "ForbiddenError" as ErrorType;
}
