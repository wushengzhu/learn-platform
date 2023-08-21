import { useEffect } from "react";

interface IProps {
    lng: number; // 经度
    lat: number; // 纬度
    onChange: (map: any) => void;
}

// 官网参考配置：https://lbs.amap.com/api/javascript-api/guide/abc/quickstart
// 博客参考配置：https://blog.csdn.net/qq_45149366/article/details/126125667
const GaoDeMap = ({ onChange, lng, lat }: IProps) => {
    //初始化地图

    const initMap = () => {
        const map = new AMap.Map("container", {
            zoom: 11, //级别
            layers: [
                //使用多个图层
                new AMap.TileLayer.Satellite(),
                new AMap.TileLayer.RoadNet(),
            ],
            center: [lng, lat], //中心点坐标
        });
        const onClick = (e: any) => {
            onChange(e);
        };
        map.on("click", onClick);
    };

    useEffect(function () {
        initMap();
    }, []);

    return (
        <div id="container" style={{ width: "100%", height: "500px" }}></div>
    );
};

export default GaoDeMap;
