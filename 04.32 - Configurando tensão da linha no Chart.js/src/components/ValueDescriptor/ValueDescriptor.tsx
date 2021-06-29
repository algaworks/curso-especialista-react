import * as VD from './ValueDescriptor.styles'

export interface ValueDescriptorProps {
  description: string
  value: number
  color: 'primary' | 'default'
  isCurrency?: boolean
}

export default function ValueDescriptor (props: ValueDescriptorProps) {
  const COLORS = {
    primary: '#0099ff',
    default: '#274060'
  }

  return <VD.Wrapper color={COLORS[props.color || 'default']}>
    <span className="Description">{ props.description }:</span>
    <div>
      {
        props.isCurrency &&
          <span className="Currency">{'R$'}</span>
      }
      <span className="Value">
        { props.value.toLocaleString('pt-br') }
      </span>
    </div>
  </VD.Wrapper>
}