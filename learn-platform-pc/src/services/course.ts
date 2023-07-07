import { message } from "antd";
import { TBaseCourse, TCourseQuery, TCoursesQuery } from "@/utils/types";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import {
    SAVE_COURSE,
    GET_COURSE,
    GET_COURSES,
    DEL_COURSE,
} from "../graphql/course";

export const useCourses = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
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
            total: res?.getCourses.page.total,
            data: res?.getCourses.data,
            success: true,
        };
    };

    return {
        loading,
        refetch: refetchHandler,
        page: data?.getCourses.page,
        data: data?.getCourses.data,
    };
};

export const useCoursesForSample = () => {
    const [get, { data, loading }] = useLazyQuery<TCoursesQuery>(GET_COURSES);

    const searchHandler = (name: string) => {
        get({
            variables: {
                name,
                page: {
                    pageNum: 1,
                    pageSize: DEFAULT_PAGE_SIZE,
                },
            },
        });
    };

    return {
        loading,
        data: data?.getCourses.data,
        search: searchHandler,
    };
};

export const useEditCourse = (): [handleEdit: Function, loading: boolean] => {
    const [edit, { loading }] = useMutation(SAVE_COURSE);

    const handleEdit = async (
        id: string,
        params: TBaseCourse,
        callback?: (isReload: boolean) => void
    ) => {
        const res = await edit({
            variables: {
                id,
                params,
            },
        });
        if (res.data.saveCourse.code === 200) {
            message.success(res.data.saveCourse.message);
            callback?.(true);
            return;
        }
        message.error(res.data.saveCourse.message);
    };

    return [handleEdit, loading];
};

// 手动触发
export const useCourse = () => {
    const [get, { loading }] = useLazyQuery(GET_COURSE);

    const getCourse = async (id: string) => {
        const res = await get({
            variables: {
                id,
            },
        });

        return res.data.getCourseById?.data;
    };

    return { getCourse, loading };
};

export const useCourseInfo = (id: string) => {
    const { data, loading, refetch } = useQuery<TCourseQuery>(GET_COURSE, {
        variables: {
            id,
        },
    });

    return { data: data?.getCourseById.data, refetch, loading };
};

export const useDeleteCourse = (): [delHandler: Function, loading: boolean] => {
    const [del, { loading }] = useMutation(DEL_COURSE);
    const delHandler = async (id: number, callback: () => void) => {
        const res = await del({
            variables: {
                id,
            },
        });
        if (res.data.deleteCourse.code === 200) {
            message.success(res.data.deleteCourse.message);
            callback();
            return;
        }
        message.error(res.data.deleteCourse.message);
    };

    return [delHandler, loading];
};
