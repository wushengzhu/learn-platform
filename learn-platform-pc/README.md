<h3 align="center">网页端</h3>
<p align="center">
	<a href="https://pnpm.io/" target="_blank">
    <img src="https://img.shields.io/badge/pnpm-8.6.1-blue">
    </a>
	<a href="https://nodejs.org"  target="_blank">
      <img src="https://img.shields.io/badge/node-16.15.0-blue">
    </a>
	<a href="https://react.docschina.org/"  target="_blank">
      <img src="https://img.shields.io/badge/react-%5E18.2.0-blue">
    </a>
        <a href="https://graphql.org/"  target="_blank">
      <img src="https://img.shields.io/badge/graphql-%5E16.6.0-blue">
    </a>
    <a href="https://ant.design/zh"  target="_blank">
      <img src="https://img.shields.io/badge/antd-%5E5.5.0-blue">
    </a>
    <a href="https://dayjs.gitee.io/zh-CN/"  target="_blank">
      <img src="https://img.shields.io/badge/dayjs-%5E1.11.7-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/md5-%5E2.3.0-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/lodash-%5E4.17.21-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/vite-%5E4.3.2-blue">
    </a>
</p>

## 启动本地 网页 端：

```
pnpm dev
```

## 单元测试:jest

-   安装包：pnpm i vitest jsdom @testing-library/react -D
-   vitest 文档：https://vitest.dev/api/
-   react-testing-library 文档：https://testing-library.com/docs/react-testing-library/api

## 使用百度地图定位门店

-   认证百度开放平台开发者，添加应用，相关配置请看官方文档
-   下载 react-bmapgl
-   封装组件

```react
import { Map, Marker, NavigationControl, InfoWindow } from "react-bmapgl";

interface IProps {
    lng: number; // 经度
    lat: number; // 纬度
    onChange: (map: any) => void;
}

const BaiduMap = ({ onChange, lng, lat }: IProps) => {
    return (
        <Map
            center={{ lng, lat }}
            zoom="11"
            onClick={(e: any) => onChange(e)}
            enableScrollWheelZoom
        >
            <Marker position={{ lng, lat }} />
            <NavigationControl />
            {/* <InfoWindow position={{ lng, lat }} text="内容" title="标题" /> */}
        </Map>
    );
};

export default BaiduMap;
```

> 由于百度地图定位精确度不太好，所以需要额外插件精度化，所以不推荐使用

## 使用高德地图定位门店

-   以本项目 GaodeMap 组件为例子

## License

Nest is [MIT licensed](LICENSE).
