import { LOCAL_CURRENT_SHOP } from "./constants";

export const currentShop = () => {
    try {
        const res = JSON.parse(
            localStorage.getItem(LOCAL_CURRENT_SHOP) || "{}"
        );
        return res;
    } catch {
        return undefined;
    }
};
