import { PropsWithChildren } from "react";
import Button from "./Button";
import * as C from './Card.styles';

type CardProps = PropsWithChildren<{
  title: string
  align?: 'center' | 'left' | 'right'
}>

export default function Card (props: CardProps) {
  return <C.Wrapper align={props.align || 'left'}>
    <C.Title>{props.title}</C.Title>
    { props.children }
    <div>
      <Button
        onClick={() => console.log('batata')}
      >
        Ver mais
      </Button>
    </div>
  </C.Wrapper>
}