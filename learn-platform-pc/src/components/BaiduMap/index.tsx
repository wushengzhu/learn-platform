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
