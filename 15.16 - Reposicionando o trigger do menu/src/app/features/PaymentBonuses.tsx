import { Descriptions, Typography } from 'antd';
import { Payment } from 'danielbonifacio-sdk';

interface PaymentBonusesProps {
  bonuses?: Payment.Detailed['bonuses'];
}

export default function PaymentBonuses(props: PaymentBonusesProps) {
  return (
    <>
      <Typography.Title level={2}>Bônus</Typography.Title>
      <Descriptions bordered size={'small'} column={1}>
        {props.bonuses?.map((bonus, index) => (
          <Descriptions.Item key={index} label={bonus.title}>
            {bonus.amount.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            })}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </>
  );
}
