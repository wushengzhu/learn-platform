import { useGoTo } from '@/hooks';
import { SearchBar } from 'antd-mobile';
import style from './index.module.less';
import TypeSelect from '@/components/TypeSelect';

const Home = () => {
  const { go } = useGoTo();
  const onSearchHandler = (val: string) => {
    console.log(val);
  };
  const onTypeChangeHandler = (key: string) => {
    console.log(key);
  };
  return (
    <div className={style.container}>
      <SearchBar placeholder="搜索课程试试" onSearch={onSearchHandler} />
      <TypeSelect onChange={onTypeChangeHandler} />
    </div>
  );
};

export default Home;
