import { EditableProTable, ProColumns } from "@ant-design/pro-components";
import Tree, { DataNode } from "antd/es/tree";
import { DirectoryTreeProps } from "antd/es/tree/DirectoryTree";
import { useState } from "react";
import style from "./index.module.less";
import { Button } from "antd";
import { useDeleteDict, useDicts, useEditDict } from "@/services/dict";

type DataSourceType = {
  id?: string;
  dictName?: string;
  dictCode?: string;
  isCanUse?: boolean;
  parentId?: string;
  modCode?: string;
};

const { DirectoryTree } = Tree;

/**
 * 获取用户信息组件
 */
const DataDict = () => {
  const { loading, data, page, refetch } = useDicts();
  const [delHandler, delLoading] = useDeleteDict();
  const [edit, editLoading] = useEditDict();
  const [selectedKeys, setSelectedKeys] = useState("0");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const treeData: DataNode[] = [
    {
      title: "字典分类",
      key: "0",
      children: data
        ? data.map((item) => ({
            title: item.dictName,
            key: item.id,
            isLeaf: true,
          }))
        : [],
    },
  ];
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
      readonly: true,
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
          className="ml-1"
          type="primary"
          onClick={() => {
            action?.startEditable?.(record?.id ? record?.id : "0");
          }}
        >
          编辑
        </Button>,
        <Button
          key="delete"
          className="ml-1"
          type="primary"
          onClick={() => {
            delHandler(record?.id);
          }}
          danger
        >
          删除
        </Button>,
      ],
    },
  ];

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <>
      <div className={style["dict-container"]}>
        <div className={style.left}>
          <DirectoryTree
            expandedKeys={[selectedKeys]}
            selectedKeys={[selectedKeys]}
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </div>
        <div className={style.right}>
          <EditableProTable<DataSourceType>
            rowKey="id"
            maxLength={5}
            scroll={{
              x: 960,
            }}
            loading={loading}
            columns={columns}
            request={async () => ({
              data: data,
              total: data?.length,
              success: true,
            })}
            recordCreatorProps={{
              record: (item) => ({ id: "0" }),
            }}
            value={data}
            editable={{
              type: "multiple",
              editableKeys,
              onSave: async (rowKey, data, row) => {
                data.modCode = "LearnPlatform";
                const id = data.id === "0" ? "" : data.id;
                const formValue = {
                  dictName: data.dictName,
                  dictCode: data.dictCode,
                  modCode: data.modCode,
                  isCanUse: Boolean(data.isCanUse),
                  parentId: data.parentId,
                };
                edit(id, formValue);
              },
              onChange: setEditableRowKeys,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DataDict;
