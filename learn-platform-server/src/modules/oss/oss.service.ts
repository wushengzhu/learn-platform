import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import * as dayjs from 'dayjs';
import { OSSType } from './dto/oss.type';

@Injectable()
export class OSSService {
  async getSignture(): Promise<OSSType> {
    const config = {
      accessKeyId: process.env.ACCESS_KEY_ID,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      bucket: process.env.BUCKET,
      dir: 'images/',
    };

    const client = new OSS(config);

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
      ],
    };

    // //  跨域才设置
    // res.set({
    //   'Access-Control-Allow-Origin': req.headers.origin || '*',
    //   'Access-Control-Allow-Methods': 'PUT,POST,GET',
    // });

    //签名
    const formData = await client.calculatePostSignature(policy);
    //bucket域名
    const host = `http://${config.bucket}.${
      (await client.getBucketLocation()).location
    }.aliyuncs.com`.toString();

    //返回参数
    const params = {
      expire: dayjs().add(1, 'days').unix().toString(),
      policy: formData.policy,
      signature: formData.Signature,
      accessId: formData.OSSAccessKeyId,
      host,
      dir: config.dir,
    };

    return params;
  }
}
