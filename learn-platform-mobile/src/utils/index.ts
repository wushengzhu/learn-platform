import { Toast } from 'antd-mobile';

export const showSuccess = (content: string) => {
  Toast.show({
    content,
    icon: 'success',
  });
};

export const showFail = ({
  code,
  message,
}: {
  code: number;
  message: string;
}) => {
  Toast.show({
    content: `${code}：${message}`,
    icon: 'fail',
  });
};

// 把英文天转为周几，中文的
export const getWeekZh = (day: string) => {
  const weekMap: Record<string, string> = {
    Sunday: '周日',
    Monday: '周一',
    Tuesday: '周二',
    Wednesday: '周三',
    Thursday: '周四',
    Friday: '周五',
    Saturday: '周六',
  };

  return weekMap[day];
};
