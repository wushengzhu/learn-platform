import { ResultPage } from 'antd-mobile';
import { AlipayCircleFill } from 'antd-mobile-icons';

interface IProps {
  price: number;
  orgName: string;
}

const FailResult = ({ price, orgName }: IProps) => (
  <ResultPage
    status="warning"
    title={<div style={{ fontSize: 15 }}>支付失败</div>}
    description={
      <>
        <span style={{ fontSize: 32, color: '#ffffff', marginRight: 4 }}>
          ¥
        </span>
        <span style={{ fontSize: 48, color: '#ffffff' }}>{price}</span>
      </>
    }
    icon={<AlipayCircleFill />}
    details={[
      {
        label: orgName,
        value: `¥ ${price}`,
        bold: true,
      },
    ]}
    onPrimaryButtonClick={() => window.location.reload()}
    primaryButtonText="重新支付"
  />
);

export default FailResult;
