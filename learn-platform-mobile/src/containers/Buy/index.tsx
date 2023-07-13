import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/services/product';
import { Grid, Stepper, Toast } from 'antd-mobile';
import { useState } from 'react';
// import { useUserContext } from '@/hooks/userHooks';
// import { useWxpayConfig } from '@/services/order';
import { DISABLE_DEV } from '@/utils/constants';
import { uniqueId } from 'lodash';
import style from './index.module.less';
// import FailResult from './components/FailResult';
// import SuccessResult from './components/SuccessResult';
import SplitBar from '@/components/SplitBar';

const { WeixinJSBridge } = window as any;

/**
 * 购买商品信息
 */
const Buy = () => {
  const { id = '' } = useParams();
  const { data } = useProductInfo(id);
  const [count, setCount] = useState<number>(1);
  const [showResult, setShowResult] = useState({
    showSuccess: false,
    showFail: false,
  });
  //   const { store, setStore } = useUserContext();
  //   const { getWxConfig } = useWxpayConfig();
  const [openPay, setOpenPay] = useState<boolean>(false);

  const buyHandler = async () => {
    // 调试状态下，直接吊起模拟微信支付
    if (DISABLE_DEV) {
      //   setStore({
      //     openid: uniqueId(),
      //   });
      //   setOpenPay(true);
      //   return;
    }

    // if (!store.openid) {
    //   window.location.href = `/wx/login?userId=${store.id}&url=${window.location.href}`;
    //   return;
    // }

    if (!data || !id) {
      Toast.show({
        content: '没有获取到商品信息',
      });
      return;
    }

    // if (typeof WeixinJSBridge !== 'undefined') {
    //   const wxConfig = await getWxConfig(
    //     id,
    //     count,
    //     data.preferentialPrice * count,
    //   );
    //   // 有限购
    //   if (!wxConfig) return;
    //   WeixinJSBridge.invoke(
    //     'getBrandWCPayRequest',
    //     {
    //       ...wxConfig,
    //     },
    //     (res: { err_msg: string }) => {
    //       if (res.err_msg === 'get_brand_wcpay_request:ok') {
    //         // 使用以上方式判断前端返回,微信团队郑重提示：
    //         // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
    //         setShowResult({
    //           showSuccess: true,
    //           showFail: false,
    //         });
    //         return;
    //       }
    //       setShowResult({
    //         showSuccess: false,
    //         showFail: true,
    //       });
    //     },
    //   );
    // } else {
    //   Toast.show({
    //     content: '请在微信中打开该页面',
    //   });
    // }
  };

  const onWxpayCloseHandler = () => {
    setOpenPay(false);
  };

  const onFinishHandler = (result: boolean) => {
    // 支付成功
    if (result) {
      setShowResult({
        showSuccess: true,
        showFail: false,
      });
      return;
    }
    // 支付失败
    setShowResult({
      showSuccess: false,
      showFail: true,
    });
  };

  if (!data) {
    return null;
  }
  //   if (showResult.showFail) {
  //     return (
  //       <FailResult
  //         price={data.preferentialPrice * count}
  //         orgName={data.shop.name}
  //       />
  //     );
  //   }
  //   if (showResult.showSuccess) {
  //     return (
  //       <SuccessResult
  //         price={data.preferentialPrice * count}
  //         orgName={data.shop.name}
  //         productName={data.name}
  //         productDesc={data.desc}
  //       />
  //     );
  //   }
  return (
    <div className={style.container}>
      {/* <WxPay
        visible={openPay}
        onClose={onWxpayCloseHandler}
        amount={data.preferentialPrice * count}
        onFinish={onFinishHandler}
        productId={id}
        quantity={count}
      /> */}
      <div className={style.organization}>
        <div className={style.logo}>
          <img alt="" src={data.shop.logo} className={style.logoImg} />
        </div>
        <div className={style.orgName}>{data.shop.name}</div>
      </div>
      <SplitBar />
      <div className={style.title}>{data.name}</div>
      <div className={style.desc}>{data.desc}</div>
      <SplitBar />
      <div className={style.count}>
        购买数量
        <Stepper
          className={style.step}
          value={count}
          onChange={(value) => {
            setCount(value);
          }}
        />
      </div>
      <div className={style.price}>
        小计: ￥{data.preferentialPrice * count}
        <span className={style.originalPrice}>
          ￥{data.originalPrice * count}
        </span>
      </div>
      <SplitBar />
      <div className={style.user}>
        <span className={style.telLabel}>手机号</span>
        {/* <span className={style.tel}>{store.tel}</span> */}
      </div>
      <Grid columns={2} className={style.buyContainer}>
        <Grid.Item span={1}>
          <span className={style.preferentialPrice}>
            ￥{data.preferentialPrice * count}
          </span>
          <span className={style.originalPrice}>
            ￥{data.originalPrice * count}
          </span>
        </Grid.Item>
        <Grid.Item span={1} className={style.buyButton} onClick={buyHandler}>
          {/* {store.openid ? '提交订单' : '去微信授权'} */}
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default Buy;
