import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import type { UploadFile, UploadListType } from 'antd/es/upload/interface';
import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '@/graphql/oss';
import ImgCrop from 'antd-img-crop';
// import { ProFormUploadButton } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface OSSUploadProps {
  value?: UploadFile[];
  label?: string;
  listType?: UploadListType;
  maxCount?: number;
  imgCropAspect?: number;
  onChange?: (file?: UploadFile[]) => void;
}

const ImageUpload = ({
  label,
  listType,
  maxCount,
  imgCropAspect,
  value,
  onChange,
}: OSSUploadProps) => {
  const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);
  const OSSData = data?.getOSSInfo;

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const files = fileList.map((f) => ({
      ...f,
      url: f.url || getKey(f).url,
    }));
    onChange?.(files);
  };

  const getKey = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const key = `${OSSData?.dir}${file.uid}${suffix}`;
    const url = `${OSSData?.host}/${key}`;
    return { key, url };
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: getKey(file).key,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  })

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await refetch();
    }
    return file;
  };

  return (
    <ImgCrop rotationSlider aspect={imgCropAspect}>
      {/* ImgCrop实现在上传前，先对图片进行裁切，然后上传裁切后的图片 */}
      <Upload
        name='file'
        maxCount={maxCount}
        listType={listType}
        fileList={value}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
      >
        {maxCount !== value?.length ? <PlusOutlined rev={undefined} /> : ''}
      </Upload>
    </ImgCrop>
  );
};



ImageUpload.defaultProps = {
  label: '上传图片',
  value: null,
  onChange: () => { },
  listType: "picture-circle",// picture-card picture text
  maxCount: 1,
  imgCropAspect: 1 / 1,
};

export default ImageUpload;
