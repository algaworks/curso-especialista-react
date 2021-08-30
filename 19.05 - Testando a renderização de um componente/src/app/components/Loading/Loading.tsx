import { LoadingWrapper } from "./Loading.styles";

interface LoadingProps {
  show?: boolean
}

export default function Loading(props: LoadingProps) {
  if (!props.show)
    return null

  return <LoadingWrapper>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </LoadingWrapper>
}