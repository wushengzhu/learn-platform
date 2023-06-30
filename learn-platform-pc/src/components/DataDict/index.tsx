import {
    ActionType,
    EditableProTable,
    ProColumns,
} from "@ant-design/pro-components";
import Tree, { DataNode } from "antd/es/tree";
import { DirectoryTreeProps } from "antd/es/tree/DirectoryTree";
import { useEffect, useRef, useState } from "react";
import style from "./index.module.less";
import { Button, Card, Popconfirm } from "antd";
import { useDeleteDict, useDicts, useEditDict } from "@/services/dict";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
} from "@ant-design/icons";

type DataSourceType = {
    id: string;
    dictName?: string;
    dictCode?: string;
    isCanUse?: boolean;
    parentId?: string;
    modCode?: string;
};

/**
 * 获取用户信息组件
 */
const DataDict = () => {
    // const actionRef = useRef<ActionType>();
    const { loading, data, page, refetch } = useDicts();
    const [delHandler] = useDeleteDict();
    const [edit, editLoading] = useEditDict();
    const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
    const [selectedKeys, setSelectedKeys] = useState("0");
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [treeData, setTreeData] = useState<DataNode[]>([]);
    useEffect(() => {
        if (data) {
            setDataSource(data);
        }
        refreshTree();
    }, [data]);

    const refreshTree = () => {
        const treeNode = [
            {
                title: "字典分类",
                key: "0",
                children: data ? listToTree(data, "0") : [],
            },
        ];
        setTreeData(treeNode);
    };

    // 递归
    const listToTree = (list: Array<DataSourceType>, id: string) => {
        const child: Array<any> = [];
        if (!list) return;
        list.forEach((ele: DataSourceType) => {
            if (id === ele.parentId) {
                const children = listToTree(list, ele.id);
                child.push({
                    title: ele.dictName,
                    key: ele.id,
                    isLeaf: children ? true : false,
                    children: children,
                });
            }
        });
        return child;
    };

    const deleteDict = (id: string) => {
        // 注意不能直接调这个函数放在组件onClick中，会报错
        delHandler(id);
        refetch();
    };

    const columns: ProColumns<DataSourceType>[] = [
        {
            title: "字典名称",
            dataIndex: "dictName",
            tooltip: "此列为必填项",
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: [{ required: true, message: "此项为必填项" }],
                };
            },
            width: "30%",
        },
        {
            title: "字典编码",
            dataIndex: "dictCode",
            tooltip: "此列为必填项",
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: [{ required: true, message: "此项为必填项" }],
                };
            },
            width: "15%",
        },
        {
            title: "模块编码",
            dataIndex: "modCode",
            tooltip: "只读，使用form.getFieldValue可以获取到值",
            // readonly: true,
            width: "15%",
        },
        {
            title: "是否启用",
            key: "isCanUse",
            dataIndex: "isCanUse",
            valueType: "select",
            valueEnum: {
                false: {
                    text: "否",
                    status: "Default",
                },
                true: {
                    text: "是",
                    status: "Success",
                },
            },
        },
        {
            title: "操作",
            valueType: "option",
            width: 200,
            render: (text, record, _, action) => [
                <Button
                    key="editable"
                    type="link"
                    className="btn"
                    onClick={() => {
                        action?.startEditable?.(record?.id ? record?.id : "0");
                    }}
                >
                    <EditOutlined rev={undefined} />
                </Button>,
                <Popconfirm
                    title="删除字典"
                    key="delete-pop"
                    description="删除操作不可恢复，确定要删除吗?"
                    onConfirm={() => deleteDict(record?.id)}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button
                        key="delete"
                        className="ml-2 btn text-red-600"
                        type="link"
                        danger
                    >
                        <DeleteOutlined rev={undefined} />
                    </Button>
                </Popconfirm>,
            ],
        },
    ];

    const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
        // info.nativeEvent.preventDefault()
        info.nativeEvent.stopPropagation();
        setSelectedKeys(keys[0] + "");
        if (data && keys[0] === "0") {
            setDataSource(data.filter((item) => item.parentId === "0"));
        } else {
            setDataSource(
                data ? data.filter((item) => item.id === keys[0] + "") : []
            );
        }
    };

    const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
        console.log("Trigger Expand", keys, info);
    };

    return (
        <>
            <div className={style["dict-container"]}>
                <div className={style.left}>
                    <Card
                        style={{
                            minHeight: "500px",
                        }}
                    >
                        <Tree
                            showLine
                            // expandedKeys={[selectedKeys]}
                            selectedKeys={[selectedKeys]}
                            defaultExpandAll
                            onSelect={onSelect}
                            // onExpand={onExpand}
                            treeData={treeData}
                        />
                    </Card>
                </div>
                <div className={style.right}>
                    <EditableProTable<DataSourceType>
                        rowKey="id"
                        // maxLength={5}
                        scroll={{
                            x: 960,
                        }}
                        loading={loading}
                        columns={columns}
                        value={dataSource ? dataSource : []}
                        onChange={setDataSource}
                        recordCreatorProps={{
                            record: () => ({
                                id: Date.now().toString(),
                            }),
                        }}
                        editable={{
                            type: "multiple",
                            editableKeys,
                            saveText: <SaveOutlined rev={undefined} />,
                            cancelText: <CloseOutlined rev={undefined} />,
                            onDelete: async (key, row) => {},
                            onSave: async (rowKey, data, row) => {
                                data.modCode = "LearnPlatform";
                                const id = data.id === "0" ? "" : data.id;
                                const formValue = {
                                    dictName: data.dictName,
                                    dictCode: data.dictCode,
                                    modCode: data.modCode,
                                    isCanUse: Boolean(data.isCanUse),
                                    parentId: selectedKeys[0],
                                };
                                edit(id, formValue);
                                refreshTree();
                            },
                            onChange: setEditableRowKeys,
                            // actionRender: (row, config, dom) => [dom.save, dom.cancel],
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default DataDict;
