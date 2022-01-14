import styled from "styled-components";

export interface NoDataProps {
  height?: number
}

export default function NoData ({ height = 120 }: NoDataProps) {
  return <NoDataWrapper height={height}>
    <Message>Sem dados para exibir</Message>
    <SadFace>:(</SadFace>
  </NoDataWrapper>
}

const NoDataWrapper = styled.div<{ height: number }>`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${p => p.height}px;
`

const Message = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #274060;
`

const SadFace = styled.span`
  font-family: 'Roboto Mono', monospace;
  color: #0099ff;
  font-weight: 700;
`