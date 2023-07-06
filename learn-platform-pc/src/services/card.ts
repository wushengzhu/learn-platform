import { DEL_CARD, GET_CARDS, SAVE_CARD } from "@/graphql/card";
import { ICard } from "@/utils/types";
import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";

export const useCards = (courseId: string) => {
    const { data, loading, refetch } = useQuery(GET_CARDS, {
        variables: {
            courseId,
        },
    });
    return {
        loading,
        data: data?.getCards.data,
        refetch,
    };
};

export const useEditCard = (): [handleEdit: Function, loading: boolean] => {
    const [edit, { loading }] = useMutation(SAVE_CARD);

    const handleEdit = async (
        id: string,
        params: ICard,
        courseId: string,
        callback?: () => void
    ) => {
        const res = await edit({
            variables: {
                id: id === "new" ? "" : id,
                params,
                courseId,
            },
        });
        if (res.data.saveCard.code === 200) {
            message.success(res.data.saveCard.message);
            callback?.();
            return;
        }
        message.error(res.data.saveCard.message);
    };

    return [handleEdit, loading];
};

export const useDeleteCard = (): [delHandler: Function, loading: boolean] => {
    const [del, { loading }] = useMutation(DEL_CARD);
    const delHandler = async (id: number, callback: () => void) => {
        const res = await del({
            variables: {
                id,
            },
        });
        if (res.data.deleteCard.code === 200) {
            message.success(res.data.deleteCard.message);
            callback();
            return;
        }
        message.error(res.data.deleteCard.message);
    };

    return [delHandler, loading];
};
