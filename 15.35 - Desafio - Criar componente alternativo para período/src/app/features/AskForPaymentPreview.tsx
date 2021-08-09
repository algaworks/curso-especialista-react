import { Card, Row, Typography } from 'antd';
import tax from '../../assets/illustrations/tax.svg';

export default function AskForPaymentPreview() {
  return (
    <Card bordered={false}>
      <Row justify='center' style={{ textAlign: 'center' }}>
        <img width={240} src={tax} alt={'tax'} />
        <Typography.Title level={3}>
          {'Selecione um editor e um período'}
        </Typography.Title>
        <Typography.Text>
          Para podermos gerar uma prévia do pagamento, por favor, selecione
          preencha os campos "Editor" e "Período"
        </Typography.Text>
      </Row>
    </Card>
  );
}
