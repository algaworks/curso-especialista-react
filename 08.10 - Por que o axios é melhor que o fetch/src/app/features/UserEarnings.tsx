import styled from "styled-components";
import ValueDescriptor from "../components/ValueDescriptor/ValueDescriptor";

export default function UserEarnings () {
  return <UserEarningsWrapper>
    <ValueDescriptor color="primary" description="Ganhos no mês" value={560322.32} isCurrency />
    <ValueDescriptor color="primary" description="Ganhos na semana" value={560322.32} isCurrency />
    <ValueDescriptor color="default" description="Ganhos de sempre" value={560322.32} isCurrency />
    <ValueDescriptor color="default" description="Total de palavras" value={2_345_347} />
  </UserEarningsWrapper>
}

const UserEarningsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`
