import { AutoCenter } from 'antd-mobile';
import { STATUS, TIPS, usePullToRefresh } from './hooks';

interface IProps {
  children: React.ReactNode;
  onRefresh: () => void;
}

const PullToRefresh = ({ children, onRefresh }: IProps) => {
  const { status, containerRef } = usePullToRefresh(onRefresh);
  return (
    <div ref={containerRef}>
      {status !== STATUS.FINISH && <AutoCenter>{TIPS[status]}</AutoCenter>}
      {children}
    </div>
  );
};

export default PullToRefresh;
