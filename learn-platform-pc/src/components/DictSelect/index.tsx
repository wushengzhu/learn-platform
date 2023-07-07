import { useDicts } from "@/services/dict";
import { IDict } from "@/utils/types";
import { Select } from "antd";
import { useEffect } from "react";

interface IProps {
    dictCode: string;
    value?: string;
    onChange?: (val: string) => void;
}

const DictSelect = ({ value, dictCode, onChange }: IProps) => {
    const { data, refetch } = useDicts();

    useEffect(() => {
        refetch({ code: dictCode });
    }, [dictCode]);

    const onChangeHandler = (val: string) => {
        onChange?.(val);
    };

    return (
        <Select placeholder="请选择" value={value} onChange={onChangeHandler}>
            {data?.map(
                (item: IDict) =>
                    item.parentId !== "0" && (
                        <Select.Option key={item.id} value={item.id}>
                            {item.dictName}
                        </Select.Option>
                    )
            )}
        </Select>
    );
};

DictSelect.defaultProps = {
    value: undefined,
    onChange: () => {},
};

export default DictSelect;
