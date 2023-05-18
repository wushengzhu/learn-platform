import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '../graphql/oss';

const useUploadOSS = () => {
  // 1 获取到签名信息
  // 2 fetch post 请求把参数传到服务端
  const { data } = useQuery(GET_OSS_INFO);
  console.log('data', data);
};

export default useUploadOSS;
