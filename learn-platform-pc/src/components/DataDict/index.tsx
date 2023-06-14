import { EditableProTable, ProColumns } from "@ant-design/pro-components";
import Tree, { DataNode } from "antd/es/tree";
import { DirectoryTreeProps } from "antd/es/tree/DirectoryTree";
import { useState } from "react";
import style from "./index.module.less";
import { Button } from "antd";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  dictName?: string;
  dictCode?: string;
  parendId?: string;
  modCode?: string;
};

const defaultData: DataSourceType[] = [];
const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: "parent 0",
    key: "0-0",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    children: [
      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
    ],
  },
];
/**
 * 获取用户信息组件
 */
const DataDict = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

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
      fieldProps: (form, { rowIndex }) => {
        form.setFieldValue("modCode", "platform");
        return {};
      },
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
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </Button>,
        <Button
          key="delete"
          className="ml-1"
          type="primary"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          编辑
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
            multiple
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
            loading={false}
            columns={columns}
            request={async () => ({
              data: defaultData,
              total: 3,
              success: true,
            })}
            recordCreatorProps={{
              record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
            }}
            value={dataSource}
            onChange={setDataSource}
            editable={{
              type: "multiple",
              editableKeys,
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
                await waitTime(2000);
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
