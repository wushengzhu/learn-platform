import { Button, Col, Drawer, Row, Space, Tabs } from "antd";
import { EditableProTable } from "@ant-design/pro-components";
import _ from "lodash";
import { ICard } from "@/utils/types";
import { getColumns } from "./constants";
import { useCards, useDeleteCard, useEditCard } from "@/services/card";

interface IDrawerParams {
    id: string;
    title?: string;
    width?: string | number;
    onClose: (isReload?: boolean) => void;
}

const ConsumeCard = ({ title, id, width, onClose }: IDrawerParams) => {
    const { data, loading, refetch } = useCards(id);
    const [edit, editLoading] = useEditCard();
    const [del, delLoading] = useDeleteCard();
    const onDeleteHandler = (key: string) => {
        del(key, refetch);
    };
    const onSaveHandler = (d: ICard) => {
        edit(
            d.id,
            id,
            {
                name: d.name,
                type: d.type,
                time: d.time,
                validityDay: d.validityDay,
            },
            refetch
        );
    };
    return (
        <Drawer
            title={title}
            width={width}
            open
            forceRender
            onClose={() => onClose()}
        >
            <EditableProTable<ICard>
                rowKey="id"
                headerTitle="请管理该课程的消费卡"
                loading={loading || editLoading || delLoading}
                value={data}
                recordCreatorProps={{
                    record: () => ({
                        id: "new",
                        name: "",
                        type: "time",
                        time: 0,
                        validityDay: 0,
                    }),
                }}
                columns={getColumns(onDeleteHandler)}
                editable={{
                    onSave: async (rowKey, d) => {
                        onSaveHandler(d);
                    },
                    onDelete: async (key, d) => {
                        onDeleteHandler(key as string);
                    },
                }}
            />
        </Drawer>
    );
};

ConsumeCard.defaultProps = {
    id: null,
    title: "新增",
    width: 750,
};

export default ConsumeCard;
