import { Select, Space } from "antd";
import { useShops } from "@/services/shop";
import lodash from "lodash";
import { useUserContext } from "@/hooks/useHooks";
import { LOCAL_CURRENT_SHOP } from "@/utils/constants";
import { useEffect } from "react";
import { useGoTo } from "@/hooks";
import { ROUTE_KEY } from "@/routes/menu";
import { currentShop } from "@/utils";

const ShopSelect = () => {
    const { data, refetch } = useShops(1, 10, true);
    const { setStore } = useUserContext();
    const { go } = useGoTo();
    // 防抖：延迟执行，等输入完后等待0.5ms在执行函数
    // 节流：在等待的时间内只执行一次
    const onSearchHandler = lodash.debounce((name: string) => {
        // 防抖
        refetch({
            name,
        });
    }, 500);
    useEffect(() => {
        if (currentShop()?.value) {
            setStore({
                currentShop: currentShop().value,
            });
        } else {
            go(ROUTE_KEY.NO_SHOP);
        }
    }, []);
    const onChangeHandler = (val: { value: string; label: string }) => {
        setStore({
            currentShop: val.value,
        });
        localStorage.setItem(LOCAL_CURRENT_SHOP, JSON.stringify(val));
    };

    return (
        <Select
            style={{ width: "200px" }}
            showSearch
            filterOption={false} // 去掉默认过滤，使用请求过滤
            placeholder="选择门店"
            defaultValue={currentShop()}
            onSearch={onSearchHandler}
            onChange={onChangeHandler}
            labelInValue
        >
            {data?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
};

export default ShopSelect;
