import { ActionType, EditableProTable, ProColumns } from "@ant-design/pro-components";
import Tree, { DataNode } from "antd/es/tree";
import { DirectoryTreeProps } from "antd/es/tree/DirectoryTree";
import { useEffect, useRef, useState } from "react";
import style from "./index.module.less";
import { Button, Card, Popconfirm } from "antd";
import { useDeleteDict, useDicts, useEditDict } from "@/services/dict";
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

type DataSourceType = {
  id: React.Key;
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
  // const actionRef = useRef<ActionType>();
  const { loading, data, page, refetch } = useDicts();
  // const [delHandler] = useDeleteDict();
  const [edit, editLoading] = useEditDict();
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState("0");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  useEffect(() => {

    const treeNode = [
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
    if (data) {
      setDataSource(data);
    }

    setTreeData(treeNode)
  }, [data])
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
            action?.startEditable?.(record?.id ? record?.id : '0');
          }}
        >
          <EditOutlined rev={undefined} />
        </Button>,
        <Popconfirm
          title="删除字典"
          description="删除操作不可恢复，确定要删除吗?"
          // onConfirm={delHandler(record?.id)}
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
        </Popconfirm>

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
          <Card
            style={{
              minHeight: '500px'
            }}
          >
            <DirectoryTree
              expandedKeys={[selectedKeys]}
              selectedKeys={[selectedKeys]}
              defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
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
              // newRecordType: 'dataSource',
              record: () => ({
                id: Date.now().toString(),
              }),
            }}
            // recordCreatorProps={false}
            // actionRef={actionRef}
            editable={{
              type: "multiple",
              editableKeys,
              saveText: (<SaveOutlined rev={undefined} />),
              cancelText: (<CloseOutlined rev={undefined} />),
              onDelete: async (key, row) => {
                console.log(Date.now().toString())
              },
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
                refetch();
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
