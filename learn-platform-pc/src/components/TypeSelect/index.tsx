import { useProductTypes } from "@/services/product";
import { Select } from "antd";
import { IProductType } from "@/utils/types";

interface IProps {
    value?: string;
    onChange?: (val: string) => void;
}

/**
 * 分类选择器
 * @param param0
 * @returns
 */
const TypeSelect = ({ onChange, value }: IProps) => {
    const { data, loading } = useProductTypes();

    const onChangeHandler = (val: string) => {
        onChange?.(val);
    };

    return (
        <Select placeholder="请选择" value={value} onChange={onChangeHandler}>
            {data?.map((item: IProductType) => (
                <Select.Option key={item.key} value={item.key}>
                    {item.title}
                </Select.Option>
            ))}
        </Select>
    );
};

TypeSelect.defaultProps = {
    value: undefined,
    onChange: () => {},
};

export default TypeSelect;
