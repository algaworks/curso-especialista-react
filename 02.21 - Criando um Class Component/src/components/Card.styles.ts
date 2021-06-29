import styled from 'styled-components'

export const Wrapper = styled.div<{ align: 'left' | 'center' | 'right' }>`
  background-color: rgba(0,0,0,.25);
  border-radius: 8px;
  padding: 16px;
  text-align: ${props => props.align};
`

export const Title = styled.h2`
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
`