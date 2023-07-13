import { Toast } from 'antd-mobile';

enum InfoType {
  success = 'success',
  fail = 'fail',
  load = 'loading',
  cuscom = '',
}
const msg = (type: string, info: string) => {
  Toast.show({
    icon: type,
    content: info,
  });
};

export const success = (info: string) => {
  msg(InfoType.success, info);
};

export const fail = (info: string) => {
  msg(InfoType.fail, info);
};

export const load = (info: string) => {
  msg(InfoType.load, info);
};

export const cuscom = (info: string) => {
  msg(InfoType.cuscom, info);
};
