import { useTitle } from "@/hooks/useTitle";
import { IProduct } from "@/utils/types";
import {
    ActionType,
    PageContainer,
    ProTable,
} from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { getColumns } from "./constants";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductEdit from "@/components/ProductEdit";
import ConsumeCard from "@/components/ConsumeCard";
import {
    useDeleteProduct,
    useEditProduct,
    useProducts,
} from "@/services/product";
import RelatedCard from "@/components/RelatedCard";

const Product = () => {
    useTitle("商品管理");
    const actionRef = useRef<ActionType>();
    const [productId, setProductId] = useState("");
    const { refetch } = useProducts();
    const [delHandler, delLoading] = useDeleteProduct();
    const [edit, editLoading] = useEditProduct();
    const [showProductEdit, setProductEdit] = useState(false);
    const [showConsumeCard, setConsumeCard] = useState(false);

    const editProduct = (id?: string) => {
        if (id) {
            setProductId(id);
        } else {
            setProductId("");
        }
        setProductEdit(true);
    };

    const onCloseHander = (isReload?: boolean) => {
        setProductEdit(false);
        setConsumeCard(false);
        if (isReload) {
            actionRef.current?.reload();
        }
    };

    const onCardHandler = (id: string) => {
        setConsumeCard(true);
        setProductId(id);
    };

    const onDeleteHandler = (id: string) => {
        delHandler(id, () => actionRef.current?.reload());
    };

    const onStatusChangeHandler = (id: string, status: string) => {
        edit(
            id,
            {
                status,
            },
            () => actionRef.current?.reload()
        );
    };

    return (
        <PageContainer header={{ title: "当前门店下开设的课程" }}>
            <ProTable<IProduct>
                rowKey="id"
                loading={delLoading || editLoading}
                actionRef={actionRef}
                columns={getColumns({
                    onDeleteHandler: onDeleteHandler,
                    onEditHandler: editProduct,
                    onCardHandler,
                    onStatusChangeHandler,
                })}
                request={refetch}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE,
                }}
                toolBarRender={() => [
                    <Button
                        key="add"
                        onClick={() => editProduct()}
                        type="primary"
                        icon={<PlusOutlined rev={undefined} />}
                    >
                        新建
                    </Button>,
                ]}
            />
            {showProductEdit && (
                <ProductEdit
                    id={productId}
                    title={productId ? "编辑" : "新增"}
                    onClose={onCloseHander}
                />
            )}
            {showConsumeCard && (
                <RelatedCard
                    id={productId}
                    title={productId ? "编辑" : "新增"}
                    onClose={onCloseHander}
                />
            )}
        </PageContainer>
    );
};

export default Product;
