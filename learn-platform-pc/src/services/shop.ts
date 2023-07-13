import {
    COMMIT_SHOP,
    DEL_SHOP,
    GET_SHOP,
    GET_SHOPS,
    GET_SIMPLE_SHOP,
} from "@/graphql/shop";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TBaseShop, TShopQuery, TShopsQuery } from "@/utils/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { message } from "antd";

export const useShops = (
    pageNum = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    isSimple = false
) => {
    const { loading, data, refetch } = useQuery<TShopsQuery>(
        isSimple ? GET_SIMPLE_SHOP : GET_SHOPS,
        {
            variables: {
                page: {
                    pageNum,
                    pageSize,
                },
            },
        }
    );

    return {
        loading,
        refetch,
        page: data?.getShops.page,
        data: data?.getShops.data,
    };
};

export const useShop = (id: string) => {
    const { loading, data } = useQuery<TShopQuery>(GET_SHOP, {
        variables: {
            id,
        },
    });
    return {
        loading,
        data: data?.getShopById?.data,
    };
};

// 手动触发
export const useOnShop = () => {
    const [get, { loading }] = useLazyQuery(GET_SHOP);

    const getShop = async (id: string) => {
        const res = await get({
            variables: {
                id,
            },
        });

        return res.data?.getShopById?.data;
    };

    return { getShop, loading };
};

export const useEditInfo = (): [handleEdit: Function, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_SHOP);

    const handleEdit = async (id: string, params: TBaseShop) => {
        const res = await edit({
            variables: {
                id,
                params,
            },
        });
        if (res.data.saveShop.code === 200) {
            message.success(res.data.saveShop.message);
        } else {
            message.error(res.data.saveShop.message);
        }
    };

    return [handleEdit, loading];
};

export const useDeleteShop = (): [handleEdit: Function, loading: boolean] => {
    const [del, { loading }] = useMutation(DEL_SHOP);

    const delHandler = async (id: number, callback: () => void) => {
        const res = await del({
            variables: {
                id,
            },
        });
        if (res.data.deleteShop.code === 200) {
            message.success(res.data.deleteShop.message);
            callback();
            return;
        }
        message.error(res.data.deleteShop.message);
    };

    return [delHandler, loading];
};
