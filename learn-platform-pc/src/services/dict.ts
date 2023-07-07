import {
    COMMIT_DICT,
    DEL_DICT,
    GET_DICT,
    GET_DICTS,
    GET_DICT_PARENTDID,
} from "@/graphql/dict";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TBaseDict, TDictQuery, TDictsQuery } from "@/utils/types";
import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";

export const useDicts = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    const { loading, data, refetch } = useQuery<TDictsQuery>(GET_DICTS, {
        variables: {
            page: {
                pageNum,
                pageSize,
            },
        },
    });

    const refetchHandler = async (params: {
        parentId?: string;
        name?: string;
        code?: string;
        pageSize?: number;
        current?: number;
    }) => {
        const { data: res, errors } = await refetch({
            parentId: params?.parentId,
            name: params?.name,
            code: params?.code,
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
            total: res?.getDicts.page.total,
            data: res?.getDicts.data,
            success: true,
        };
    };

    return {
        loading,
        refetch: refetchHandler,
        page: data?.getDicts.page,
        data: data?.getDicts.data,
    };
};

export const useDictsByParentId = () => {
    const { loading, data, refetch } = useQuery<TDictsQuery>(
        GET_DICT_PARENTDID,
        {
            variables: {
                parentId: "0",
            },
        }
    );

    const refetchHandler = async (parentId: string) => {
        const { data: res, errors } = await refetch({
            parentId: parentId || "0",
        });

        if (errors) {
            return {
                success: false,
            };
        }
        return {
            data: res?.getDictsByParentId.data,
            success: true,
        };
    };

    return {
        loading,
        refetchByParentId: refetchHandler,
        data: data?.getDictsByParentId.data,
    };
};

export const useDict = (id: string) => {
    const { loading, data } = useQuery<TDictQuery>(GET_DICT, {
        variables: {
            id,
        },
    });
    return {
        loading,
        data: data?.getDictInfoById?.data,
    };
};

export const useEditDict = (): [handleEdit: Function, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_DICT);
    const handleEdit = async (id: string, params: TBaseDict) => {
        const res = await edit({
            variables: {
                id,
                params,
            },
        });
        if (res.data.saveDict.code === 200) {
            message.success(res.data.saveDict.message);
        } else {
            message.error(res.data.saveDict.message);
        }
    };

    return [handleEdit, loading];
};

export const useDeleteDict = (): [handleEdit: Function] => {
    const [del, { loading }] = useMutation(DEL_DICT);
    const delHandler = async (id: number) => {
        const res = await del({
            variables: {
                id,
            },
        });
        if (res.data.deleteDict.code === 200) {
            message.success(res.data.deleteDict.message);
            // callback();
            return;
        }
        message.error(res.data.deleteDict.message);
    };

    return [delHandler];
};
