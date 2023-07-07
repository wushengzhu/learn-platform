import { useLazyCards } from "@/services/card";
import { useEditProduct, useProductInfo } from "@/services/product";
import { getCardName } from "@/utils/constants";
import { CreditCardOutlined } from "@ant-design/icons";
import { CheckCard } from "@ant-design/pro-components";
import { Modal, Result, Row, Space, Typography } from "antd";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import CourseSearch from "../CourseSearch";

interface IModalProps {
    id: string;
    title?: string;
    width?: string | number;
    onClose: (isReload?: boolean) => void;
}
const RelatedCard = ({ id, title, onClose }: IModalProps) => {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const { data: product, loading: getProductLoading } = useProductInfo(id);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const { getCards, data: cards, loading: getCardsLoading } = useLazyCards();
    const [edit, editLoading] = useEditProduct();

    const newCards = useMemo(
        // 对数组去重
        () => _.unionBy(product?.cards || [], cards, "id"),
        [cards, product?.cards]
    );
    useEffect(() => {
        setSelectedCards(product?.cards?.map((item) => item.id) || []);
    }, [product?.cards]);

    const handleOk = () => {
        edit(id, { cards: selectedCards }, () => onClose());
        // setIsModalOpen(false);
    };
    const onSelectedHandler = (courseId: string) => {
        getCards(courseId);
    };
    return (
        <Modal
            title="绑定消费卡"
            open
            onOk={handleOk}
            onCancel={() => onClose()}
        >
            <Row justify="end">
                <CourseSearch onSelected={onSelectedHandler} />
            </Row>
            <Row justify="center" style={{ padding: "15px" }}>
                {newCards.length === 0 && (
                    <Result
                        status="warning"
                        title="请搜索课程并选择对应的消费卡"
                    />
                )}
                <CheckCard.Group
                    multiple
                    loading={
                        getProductLoading || editLoading || getCardsLoading
                    }
                    onChange={(value) => {
                        setSelectedCards(value as string[]);
                    }}
                    value={selectedCards}
                >
                    {newCards.map((item) => (
                        <CheckCard
                            key={item.id}
                            value={item.id}
                            size="small"
                            avatar={<CreditCardOutlined rev={undefined} />}
                            title={
                                <>
                                    <Space>
                                        <Typography.Text
                                            ellipsis
                                            style={{ width: "100px" }}
                                        >
                                            {item.course?.name}
                                        </Typography.Text>
                                        {getCardName(item.type)}
                                    </Space>
                                    <div>{item.name}</div>
                                </>
                            }
                            description={
                                <Space>
                                    <span>
                                        次数：
                                        {item.time}
                                    </span>
                                    <span>
                                        有效期：
                                        {item.validityDay}
                                    </span>
                                </Space>
                            }
                        />
                    ))}
                </CheckCard.Group>
            </Row>
        </Modal>
    );
};

export default RelatedCard;
