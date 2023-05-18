import { useEffect } from 'react';
import useLatest from './useLatest';

/**
 * 组件卸载运行
 * @param fn
 */
const useUnMount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  useEffect(() => () => fnRef.current(), []);
};

export default useUnMount;
