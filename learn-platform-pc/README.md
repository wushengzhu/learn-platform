<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://react.dev/images/home/conf2021/cover.svg" width="200" alt="React Logo" /></a>
</p>

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
