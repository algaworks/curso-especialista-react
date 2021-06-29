import { PropsWithChildren, useState } from "react";
import Button from "./Button";
import * as C from './Card.styles';

type CardProps = PropsWithChildren<{
  title: string
  align?: 'center' | 'left' | 'right'
}>

export default function Card (props: CardProps) {
  const [showButton, setShowButton] = useState(true)

  return <C.Wrapper align={props.align || 'left'}>
    <C.Title>{props.title}</C.Title>
    { props.children }
    <div>
      {
        showButton &&
          <Button
            onClick={() => setShowButton(false)}
          >
            Ver mais
          </Button>
      }      
    </div>
  </C.Wrapper>
}