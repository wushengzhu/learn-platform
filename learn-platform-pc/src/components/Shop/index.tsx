import ShopEdit from "@/components/ShopEdit";
import { useDeleteShop, useShops } from "@/services/shop";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { PlusOutlined } from "@ant-design/icons";
import { ProList } from "@ant-design/pro-components";
import { Button, Popconfirm, Tag } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const Shop = () => {
    const { loading, data, page, refetch } = useShops();
    const [delHandler, delLoading] = useDeleteShop();
    const [showEdit, setShowEdit] = useState(false);
    const [shopId, setShopId] = useState("");
    const addInfoHandler = () => {
        setShowEdit(true);
        setShopId("");
    };
    const editInfoHandler = (id: string) => {
        setShopId(id);
        setShowEdit(true);
    };
    const onCloseHander = () => {
        setShowEdit(false);
        refetch();
    };

    const onPageChangeHandler = (pageNum: number, pageSize: number) => {
        refetch({
            page: {
                pageNum,
                pageSize,
            },
        });
    };

    const delInfoHandler = async (id: string) => {
        delHandler(id, refetch);
    };

    const dataSource = data?.map((item) => ({
        ...item,
        key: item.id,
        subTitle: (
            <div>
                {item.tags?.split(",").map((tag) => (
                    <Tag key={tag} color="#5BD8A6">
                        {tag}
                    </Tag>
                ))}
            </div>
        ),
        actions: [
            <Button
                type="link"
                onClick={() => editInfoHandler(item.id)}
                style={{ padding: 0 }}
            >
                编辑
            </Button>,
            <Popconfirm
                title="提醒"
                okButtonProps={{
                    loading: delLoading,
                }}
                description={`确定要删除 ${item.name} 吗？`}
                onConfirm={() => delInfoHandler(item.id)}
            >
                <Button type="link" style={{ padding: 0 }}>
                    删除
                </Button>
            </Popconfirm>,
        ],
        avatar: "https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg",
        content: (
            <div
                style={{
                    flex: 1,
                }}
            >
                <div>
                    成立日期：
                    {dayjs(item.establishmentDate).format("YYYY-MM-DD")}
                </div>
                <div>地址：{item.address}</div>
            </div>
        ),
    }));
    return (
        <div>
            <ProList<any>
                pagination={{
                    defaultPageSize: DEFAULT_PAGE_SIZE,
                    showSizeChanger: false,
                    total: page?.total,
                    onChange: onPageChangeHandler,
                }}
                showActions="hover"
                rowSelection={false}
                grid={{ gutter: 10, column: 2 }}
                metas={{
                    title: {
                        dataIndex: "name",
                    },
                    subTitle: {},
                    type: {},
                    avatar: {
                        dataIndex: "logo",
                    },
                    content: {},
                    actions: {
                        cardActionProps: "extra",
                    },
                }}
                dataSource={dataSource}
                toolBarRender={() => [
                    <Button type="primary" onClick={addInfoHandler}>
                        <PlusOutlined className="mr-1" rev={undefined} />
                        新增门店
                    </Button>,
                ]}
            />
            {showEdit && <ShopEdit id={shopId} onClose={onCloseHander} />}
        </div>
    );
};

export default Shop;
