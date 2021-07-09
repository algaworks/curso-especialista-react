import { AxiosResponse } from "axios";

export default function handleAxiosResponseSuccess<T>(
  response: AxiosResponse<T>
) {
  return response;
}
