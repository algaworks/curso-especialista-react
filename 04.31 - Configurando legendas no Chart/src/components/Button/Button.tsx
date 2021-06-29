import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import * as B from './Button.styles'

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'danger' | 'text' | 'primary'
  label: string
}

export default function Button ({ label, variant, ref, ...props }: ButtonProps) {
  return <B.Wrapper
    {...props}
    variant={variant}
  >
    { label }
  </B.Wrapper>
}