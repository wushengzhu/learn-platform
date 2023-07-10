import { routes } from '@/routes/menu';
import { TabBar } from 'antd-mobile';
import style from './index.module.less';
import { useGoTo, useMatchedRoute } from '@/hooks';
import SvgWrapper from '../SvgWrapper';

const Bottom = () => {
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
      <TabBar onChange={onChangeHandler} activeKey={route?.key}>
        {routes
          .filter((route) => route?.isMenu)
          .map((item) => (
            <TabBar.Item
              key={item.key}
              icon={
                typeof item?.icon === 'string'
                  ? (is) => iconRender(is, item?.icon as string) // 本地icon
                  : item?.icon // ant组件icon
              }
              title={item.name}
            />
          ))}
      </TabBar>
    </div>
  );
};

export default Bottom;
