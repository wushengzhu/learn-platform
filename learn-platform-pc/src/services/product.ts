import { message } from "antd";
import {
    TBaseProduct,
    TProductQuery,
    TProductTypeQuery,
    TProductsQuery,
} from "@/utils/types";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import {
    SAVE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    DEL_PRODUCT,
    GET_PRODUCT_TYPES,
} from "../graphql/product";

export const useProductTypes = () => {
    const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

    return {
        data: data?.getProductTypes.data || [],
        loading,
    };
};

export const useProducts = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    const { loading, data, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
        skip: true, // 跳过重复请求，只是由列表请求就行
        variables: {
            page: {
                pageNum,
                pageSize,
            },
        },
    });

    const refetchHandler = async (params: {
        name?: string;
        pageSize?: number;
        current?: number;
    }) => {
        const { data: res, errors } = await refetch({
            name: params?.name,
            page: {
                pageNum: params?.current || 1,
                pageSize: params?.pageSize || DEFAULT_PAGE_SIZE,
            },
        });

        if (errors) {
            return {
                success: false,
            };
        }
        return {
            total: res?.getProducts.page.total,
            data: res?.getProducts.data,
            success: true,
        };
    };

    return {
        loading,
        refetch: refetchHandler,
        page: data?.getProducts.page,
        data: data?.getProducts.data,
    };
};

export const useEditProduct = (): [handleEdit: Function, loading: boolean] => {
    const [edit, { loading }] = useMutation(SAVE_PRODUCT);

    const handleEdit = async (
        id: string,
        params: TBaseProduct,
        callback?: (isReload: boolean) => void
    ) => {
        const res = await edit({
            variables: {
                id,
                params,
            },
        });
        if (res.data.saveProduct.code === 200) {
            message.success(res.data.saveProduct.message);
            callback?.(true);
            return;
        }
        message.error(res.data.saveProduct.message);
    };

    return [handleEdit, loading];
};

// 手动触发
export const useProduct = () => {
    const [get, { loading }] = useLazyQuery(GET_PRODUCT);

    const getProduct = async (id: string) => {
        const res = await get({
            variables: {
                id,
            },
        });

        return res.data.getProductById?.data;
    };

    return { getProduct, loading };
};

export const useProductInfo = (id: string) => {
    const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
        variables: {
            id,
        },
    });

    return { data: data?.getProductById.data, refetch, loading };
};

export const useDeleteProduct = (): [
    delHandler: Function,
    loading: boolean
] => {
    const [del, { loading }] = useMutation(DEL_PRODUCT);
    const delHandler = async (id: number, callback: () => void) => {
        const res = await del({
            variables: {
                id,
            },
        });
        if (res.data.deleteProduct.code === 200) {
            message.success(res.data.deleteProduct.message);
            callback();
            return;
        }
        message.error(res.data.deleteProduct.message);
    };

    return [delHandler, loading];
};
