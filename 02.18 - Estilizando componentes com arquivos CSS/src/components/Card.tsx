import { PropsWithChildren } from "react";
import './Card.css'

type CardProps = PropsWithChildren<{
  title: string
  align?: 'center' | 'left' | 'right'
}>

export default function Card (props: CardProps) {
  return <div className={`Card ${props.align || 'center'}`}>
    <div>{props.title}</div>
    { props.children }
  </div>
}