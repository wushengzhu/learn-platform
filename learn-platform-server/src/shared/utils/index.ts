import { NOT_EMPTY, SUCCESS, VALIDATE_ERROR } from '@/common/constants/code';
import { Result } from '@/common/dto/result.type';

export const getRandomCode = () => {
  const code = [];
  for (let i = 0; i < 4; i++) {
    code.push(Math.floor(Math.random() * 9));
  }
  return code.join('');
};

/**
 * 账号和密码校验
 * 密码由于是被 MD5 加密的，所以无法校验
 * @param account 账号
 * @param password 密码
 */
export const accountAndPwdValidate = (
  account: string,
  password: string,
): Result => {
  if (!account || !password) {
    return {
      code: NOT_EMPTY,
      message: '账号或者密码不能为空',
    };
  }
  // 只能输入由数字、26个英文字母或者下划线组成的字符串
  if (!/^[a-zA-Z0-9_]{3,10}$/.test(account) && account !== 'admin') {
    return {
      code: VALIDATE_ERROR,
      message: '账号格式校验失败，请重新输入账号',
    };
  }
  return {
    code: SUCCESS,
  };
};

/**
 *  process.env.NODE_ENV === 'development'出现false，由于配置时多了一个空格
 *  解决方式一：process.env.NODE_ENV.trim()
 *  解决方式二：set NODE_ENV=production&& node dist/main 注意&&前面已去掉对应的空格
 * @returns
 */
export const getEnvConfig = () =>
  process.env.NODE_ENV === 'development' ? '.env' : '/etc/server.conf/.env';
// process.env.NODE_ENV === 'development' ? '.env' : '.env';

export const getMysqlHost = () =>
  process.env.NODE_ENV === 'development'
    ? process.env.MYSQL_D_HOST
    : process.env.MYSQL_P_HOST;

export const getMysqlPwd = () =>
  process.env.NODE_ENV === 'development'
    ? process.env.MYSQL_D_PWD
    : process.env.MYSQL_P_PWD;

export const getHostIp = () =>
  process.env.NODE_ENV === 'development'
    ? process.env.DEVALOPMENT_IP
    : process.env.PRODUCTION_IP;
