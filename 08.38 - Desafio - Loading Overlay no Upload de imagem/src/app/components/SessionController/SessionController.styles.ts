import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  gap: 18px;

  border: 1px solid #ccc;
  padding: 24px;

  color: #274060;
`

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
`

export const Name = styled.h2`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  text-align: center;

  font-size: 18px;
  font-weight: 600;
`

export const Description = styled.span`
  font-size: 12px;
`