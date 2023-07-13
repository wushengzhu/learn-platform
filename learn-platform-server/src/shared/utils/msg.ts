import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import { config } from 'dotenv';

config();

const openApiConfig = new $OpenApi.Config({
  // 必填，您的 AccessKey ID
  accessKeyId: process.env.ACCESS_KEY_ID,
  // 必填，您的 AccessKey Secret
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
});
// 访问的域名
openApiConfig.endpoint = `dysmsapi.aliyuncs.com`;
export const msgClient = new Dysmsapi20170525(openApiConfig);
