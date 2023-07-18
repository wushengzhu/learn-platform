import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';
import { onError } from '@apollo/client/link/error'; // 引入onError
import { Toast } from 'antd-mobile';
import { useGoTo } from '@/hooks';

let uri = 'http://localhost:1024/graphql';
// uri: 'http://192.168.1.174:1024/graphql', // 可手机上调试的本地ip后端地址
if (process.env.NODE_ENV === 'production') {
  uri = '';
}
/**
 * 统一处理接口报错
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  const { go } = useGoTo();
  if (graphQLErrors) {
    Toast.show({
      content: '请求参数或者返回的数据格式不对',
    });
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        Toast.clear();
        Toast.show({
          content: '登录失效，请登录',
        });
        go('/login');
      }
    });
  }
  if (networkError) {
    Toast.clear();
    Toast.show({
      content: networkError.message,
    });
  }
});

const httpLink = createHttpLink({
  uri,
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
