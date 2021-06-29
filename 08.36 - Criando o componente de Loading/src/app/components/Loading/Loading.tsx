import { LoadingWrapper } from "./Loading.styles";

export default function Loading() {
  return <LoadingWrapper>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </LoadingWrapper>
}