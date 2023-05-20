import { Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET, SIGN_NAME, TEMPLATE_CODE } from 'src/common/constants/aliyun';
import { getRandomCode } from 'src/shared/utils';

@Injectable()
export class AuthService {
   async sendCodeMsg(tel:string):Promise<string>{
    const code = getRandomCode()
    let config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: ACCESS_KEY_ID,
      // 必填，您的 AccessKey Secret
      accessKeySecret: ACCESS_KEY_SECRET,
    });
    // 访问的域名
    config.endpoint = `dysmsapi.aliyuncs.com`;
    let client = new Dysmsapi20170525(config);
    let sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: SIGN_NAME,
      templateCode: TEMPLATE_CODE,
      phoneNumbers: tel,
      templateParam: `{"code":${code}}`,
    });
    let runtime = new $Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
    } catch (error) {
      // 如有需要，请打印 error
      console.log(error)
      Util.assertAsString(error.message);
    }
    return code
   }
}
