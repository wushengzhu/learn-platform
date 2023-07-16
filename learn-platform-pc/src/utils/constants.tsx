import { Tag } from "antd";

export const AUTH_TOKEN = "auth_token";
export const DEFAULT_PAGE_SIZE = 10;
export const LOCAL_CURRENT_SHOP = "LOCAL_CURRENT_SHOP";
export const DAY_FORMAT = 'YYYY-MM-DD';

// 卡类型
export const CARD_TYPE = {
    TIME: "time", // 次卡
    DURATION: "duration", // 时长卡
};
export const getCardName = (type: string) => {
    switch (type) {
        case CARD_TYPE.TIME:
            return <Tag color="blue">次卡</Tag>;
        case CARD_TYPE.DURATION:
            return <Tag color="green">时长卡</Tag>;
        default:
            return "-";
    }
};
