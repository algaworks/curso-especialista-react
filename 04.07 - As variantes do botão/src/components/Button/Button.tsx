import * as B from './Button.styles'

export interface ButtonProps {
  variant: 'danger' | 'text' | 'primary'
  label: string
}

export default function Button ({ label, variant }: ButtonProps) {
  return <B.Wrapper variant={variant}>
    { label }
  </B.Wrapper>
}