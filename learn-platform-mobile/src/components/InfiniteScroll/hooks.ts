import _ from 'lodash';
import { useEffect, useState } from 'react';

const OFFSET = 90;

export const useLoad = ({ hasMore = false, loadMore = () => {} }) => {
  const [tips, setTips] = useState('');

  useEffect(() => {
    window.onscroll = _.debounce(async () => {
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (hasMore && scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setTips('加载中...');
        await loadMore();
        setTips('加载完成');
        setTimeout(() => {
          setTips('');
        }, 1000);
      }
    }, 500);

    return () => {
      window.onscroll = null;
    };
  }, [hasMore]);

  return { tips };
};
