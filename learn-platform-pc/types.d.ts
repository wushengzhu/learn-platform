declare module "react-bmapgl"; // 防止打包出错

interface window {
    AMap: any;
}
declare class AMap {
    static Map: any;
    static Marker: any;
    static TileLayer: any;
}
