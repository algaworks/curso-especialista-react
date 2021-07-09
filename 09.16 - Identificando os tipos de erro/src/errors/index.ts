export const ERRORS = {
  FORBIDDEN: "https://api.alganews.com.br/forbidden",
  INVALID_DATA: "https://api.alganews.com.br/invalid-data",
  SYSTEM_ERROR: "https://api.alganews.com.br/system-error",
  INVALID_PARAMETER: "https://api.alganews.com.br/invalid-parameter",
  INCOMPREHENSIBLE_MESSAGE:
    "https://api.alganews.com.br/incomprehensible-message",
  RESOURCE_NOT_FOUND: "https://api.alganews.com.br/resource-not-found",
  BUSINESS_ERROR: "https://api.alganews.com.br/business-error",
};

export { default as ForbiddenError } from "./Forbidden.error";
export { default as InvalidDataError } from "./InvalidData.error";
export { default as SystemError } from "./System.error";
export { default as ResourceNotFoundError } from "./ResourceNotFound.error";
export { default as BusinessError } from "./Business.error";
export { default as GenericError } from "./Generic.error";
export { default as IncomprehensibleMessageError } from "./IncomprehensibleMessage.error";
