import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  title: string
}>

export default function Card (props: CardProps) {
  return <div
    style={{
      background: 'rgba(0,0,0,.25)',
      borderRadius: 8,
      padding: 16,
    }}
  >
    <div>{props.title}</div>
    { props.children }
  </div>
}