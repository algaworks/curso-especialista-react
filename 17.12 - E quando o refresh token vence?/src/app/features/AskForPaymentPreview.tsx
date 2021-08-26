import { Card, Row, Typography } from 'antd';
import CustomError from 'danielbonifacio-sdk/dist/CustomError';
import tax from '../../assets/illustrations/tax.svg';
import confusing from '../../assets/illustrations/confusing.svg';

interface AskForPaymentPreviewProps {
  error?: CustomError;
}

export default function AskForPaymentPreview(props: AskForPaymentPreviewProps) {
  return (
    <Card bordered={false}>
      <Row justify='center' style={{ textAlign: 'center' }}>
        <img
          width={240}
          key={props.error ? 'errorImg' : 'img'}
          src={props.error ? confusing : tax}
          alt={'tax'}
        />
        <Typography.Title level={3} style={{ maxWidth: 360 }}>
          {props.error
            ? props.error.message
            : 'Selecione um editor e um período'}
        </Typography.Title>
        <Typography.Text>
          Para podermos gerar uma prévia do pagamento, por favor, selecione
          preencha os campos "Editor" e "Período"
        </Typography.Text>
      </Row>
    </Card>
  );
}
