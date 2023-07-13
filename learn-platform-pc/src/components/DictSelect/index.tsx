import { useDicts } from "@/services/dict";
import { IDict } from "@/utils/types";
import { Select } from "antd";
import { useEffect } from "react";

interface IProps {
    dictCode: string;
    value?: string;
    mode?: "multiple" | "tags";
    onChange?: (val: string) => void;
}

const DictSelect = ({ value, dictCode, onChange, mode }: IProps) => {
    const { data, refetch } = useDicts();

    useEffect(() => {
        refetch({ code: dictCode });
    }, [dictCode]);

    const onChangeHandler = (val: string) => {
        onChange?.(val);
    };

    return (
        <Select
            placeholder="请选择"
            value={value}
            onChange={onChangeHandler}
            mode={mode}
        >
            {data?.map(
                (item: IDict) =>
                    item.parentId !== "0" && (
                        <Select.Option
                            value={item.dictName}
                            key={item.dictName}
                        >
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
