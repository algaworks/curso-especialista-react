import Icon from "@mdi/react";
import { mdiInformation } from '@mdi/js'
import styled from "styled-components";
import { transparentize } from "polished";

export interface InfoProps {
  title: string
  description: string
}

export default function Info (props: InfoProps) {
  return <InfoWrapper>
    <InfoInnerContent>
      <InfoIcon>
        <Icon
          color="#09f"
          size="48px"
          path={mdiInformation}
        />
      </InfoIcon>
      <InfoMessages>
        <InfoTitle>{props.title}</InfoTitle>
        <p>{props.description}</p>
      </InfoMessages>
    </InfoInnerContent>
  </InfoWrapper>
}

const InfoWrapper = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F3F8FA;
  width: 373px;
  border: 1px solid ${transparentize(0.9, '#274060')};
`

const InfoInnerContent = styled.div`
  display: flex;
  gap: 24px;
  color: #274060;
`

export const InfoIcon = styled.div``

export const InfoMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  overflow: hidden;
`