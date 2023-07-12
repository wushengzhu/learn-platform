import { useProductTypes } from '@/services/product';
import { SpinLoading, Tabs } from 'antd-mobile';
import style from './index.module.less';
import { DEFAULT_TYPE } from '@/utils/constants';

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

  if (loading && data.length === 0) {
    return <SpinLoading />;
  }

  return (
    <Tabs
      className={style.tabs}
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
