import { useMemo } from "react";
import { useCourseInfo, useEditCourse } from "@/services/course";
import { IOrderTime, IWeekCourse, TWeek } from "@/utils/types";
import { DAYS, isWorkDay } from "./constants";

export const useOrderTime = (id: string, currentDayKey: TWeek) => {
    const { data, loading, refetch } = useCourseInfo(id);
    const [edit, editLoading] = useEditCourse();

    // useMemo相当于vue的计算属性，只有当它所依赖的值发生变化的时候，useMemo才会重新返回一个新的值。
    const orderTime = useMemo(
        () =>
            (data?.reducibleTime || []).find(
                (item) => item.week === currentDayKey
            )?.orderTime || [],
        [data, currentDayKey]
    );

    const onSaveHandler = (ot: IOrderTime[]) => {
        const rt = [...(data?.reducibleTime || [])];
        const index = rt.findIndex((item) => item.week === currentDayKey);
        if (index > -1) {
            rt[index] = {
                week: currentDayKey,
                orderTime: ot,
            };
        } else {
            rt.push({
                week: currentDayKey,
                orderTime: ot,
            });
        }
        edit(
            id,
            {
                reducibleTime: rt,
            },
            () => refetch()
        );
    };

    const onDeleteHandler = (key: number) => {
        // 排除当前key
        const newData = orderTime.filter((item) => item.key !== key);
        onSaveHandler(newData);
    };

    // 选择一周中的工作日
    const allWorkDaySyncHandler = () => {
        const rt: IWeekCourse[] = [];
        DAYS.forEach((item) => {
            if (isWorkDay(item.key)) {
                rt.push({
                    week: item.key,
                    orderTime,
                });
            }
        });
        edit(
            id,
            {
                reducibleTime: rt,
            },
            () => refetch()
        );
    };

    // 选择一周所有天
    const allWeekSyncHandler = () => {
        const rt: IWeekCourse[] = [];
        DAYS.forEach((item) => {
            rt.push({
                week: item.key,
                orderTime,
            });
        });
        edit(
            id,
            {
                reducibleTime: rt,
            },
            () => refetch()
        );
    };

    return {
        orderTime,
        loading: loading || editLoading,
        onDeleteHandler,
        onSaveHandler,
        allWeekSyncHandler,
        allWorkDaySyncHandler,
    };
};
