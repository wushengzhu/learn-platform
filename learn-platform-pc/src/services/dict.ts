import { COMMIT_DICT, DEL_DICT, GET_DICT, GET_DICTS } from "@/graphql/dict";
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

  return {
    loading,
    refetch,
    page: data?.getDicts.page,
    data: data?.getDicts.data,
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
    if (res.data.commitDict.code === 200) {
      message.success(res.data.commitDict.message);
    } else {
      message.error(res.data.commitDict.message);
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
