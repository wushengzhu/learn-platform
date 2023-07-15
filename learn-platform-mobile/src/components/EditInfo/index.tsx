import style from './index.module.less';
import { useGoTo, useMatchedRoute } from '@/hooks';
import SvgWrapper from '../SvgWrapper';

const EditInfo = () => {
  const route = useMatchedRoute();
  const { go } = useGoTo();
  // 只有菜单bar才会显示当前底部导航组件
  if (!route?.isMenu) {
    return null;
  }

  const onChangeHandler = (key: string) => {
    go(key);
  };

  const iconRender = (is: boolean, icon?: string) => (
    <SvgWrapper src={icon} color={is ? '#01979a' : '#999999'} />
  );

  return (
    <div className={style['bottom-container']}>

    </div>
  );
};

export default EditInfo;
