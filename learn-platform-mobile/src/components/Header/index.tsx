import { LeftOutline } from 'antd-mobile-icons';
import style from './index.module.less';
import { useGoTo, useMatchedRoute } from '@/hooks';

const Header = () => {
  const { go, back } = useGoTo();
  const route = useMatchedRoute();
  const onClickHandler = () => {
    back();
  };

  // 只有有header隐藏标记的页面才需要隐藏
  if (route?.hideHeader) {
    return null;
  }

  return (
    <div className={style.container}>
      {!route?.isMenu && (
        <LeftOutline className={style.back} onClick={onClickHandler} />
      )}
      <div className={style.title}>{route?.name}</div>
    </div>
  );
};

export default Header;
