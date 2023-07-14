import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menu';
import { Card, ResultPage } from 'antd-mobile';
import { AlipayCircleFill } from 'antd-mobile-icons';

interface IProps {
  price: number;
  orgName: string;
  productName: string;
  productDesc: string;
}

const SuccessResult = ({
  price,
  orgName,
  productName,
  productDesc,
}: IProps) => {
  const { go } = useGoTo();

  return (
    <ResultPage
      status="success"
      title={<div style={{ fontSize: 15 }}>支付成功</div>}
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
      onPrimaryButtonClick={() => {
        go(ROUTE_KEY.HOME);
      }}
      primaryButtonText="返回首页"
    >
      <Card title={productName}>{productDesc}</Card>
    </ResultPage>
  );
};

export default SuccessResult;
