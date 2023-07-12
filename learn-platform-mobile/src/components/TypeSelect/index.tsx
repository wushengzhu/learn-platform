import { useProductTypes } from '@/services/product';
import { SpinLoading, Tabs } from 'antd-mobile';
import style from './index.module.less';
import { DEFAULT_TYPE } from '@/utils/constants';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

interface IProps {
  onChange: (key: string) => void;
}

/**
 * 分类选择器
 * @param param0
 * @returns
 */
const TypeSelect = ({ onChange }: IProps) => {
  const { data, loading } = useProductTypes();
  const [fixTab, setFixTab] = useState(false);

  if (loading && data.length === 0) {
    return <SpinLoading />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.onscroll = async () => {
      const { scrollTop } = document.body;
      if (scrollTop >= 100) {
        setFixTab(true);
      } else {
        setFixTab(false);
      }
    };

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <Tabs
      className={classNames({
        [style.tabs]: !fixTab,
        [style.fixTabs]: fixTab,
      })}
      onChange={onChange}
      defaultActiveKey={data[0]?.key}
    >
      <Tabs.Tab title="全部" key={DEFAULT_TYPE} />
      {data.map((item) => (
        <Tabs.Tab title={item.title} key={item.key}></Tabs.Tab>
      ))}
    </Tabs>
  );
};

export default TypeSelect;
