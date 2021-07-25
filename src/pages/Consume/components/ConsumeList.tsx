import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from '../data';
import { sexType, rechargeType, cardTypeEnum } from '@/utils/constant';

function ConsumeList() {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '卡号',
      dataIndex: 'cardId',
      order: 1,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      // initialValue: localStorage.getItem('phone'),
      order: 2,
    },
    {
      title: '创建日期',
      hideInSearch: true,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '生日',
      hideInSearch: true,
      hideInTable: true,
      dataIndex: 'birthday',
      valueType: 'date',
    },
    {
      title: '性别',
      hideInSearch: true,
      dataIndex: 'sex',
      valueEnum: {
        0: '男',
        1: '女',
      },
    },
    {
      title: '卡种',
      dataIndex: 'cardType',
      valueEnum: cardTypeEnum,
    },
    {
      title: '金额',
      hideInSearch: true,
      dataIndex: 'money',
    },
    {
      title: '总次数',
      hideInSearch: true,
      dataIndex: 'total',
    },
    {
      title: '剩余次数',
      hideInSearch: true,
      dataIndex: 'restTotal',
    },
    {
      title: '已用次数',
      hideInSearch: true,
      dataIndex: 'usedTotal',
    },
    {
      title: '有效期',
      dataIndex: 'overdate',
      hideInForm: true,
      sorter: true,
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const { cardType, overdate } = record;
        const operate = [
          <a
            key="recharge"
            onClick={() => {
              setRechargeVisible(true);
              setCurrentRow(record);
            }}
          >
            充值
          </a>,

          // <a
          //   key="subscribeAlert"
          //   onClick={async () => {
          //     await confirmDel(record.id);
          //   }}
          // >
          //   删除
          // </a>,
        ];
        const consumeBtn = (
          <a
            key="consume"
            onClick={() => {
              consumeTao(record);
            }}
          >
            消费
          </a>
        );
        const editBtn = (
          <a
            key="config"
            onClick={() => {
              handleModalVisible(true);
              setCurrentRow(record);
              modalRef.current?.setFieldsValue(record);
            }}
          >
            编辑
          </a>
        );
        if (canUse(record)) {
          operate.push(consumeBtn, editBtn);
        }
        return operate;
      },
    },
  ];
  return (
    <ProTable<TableListItem>
      headerTitle="查询表格"
      bordered={true}
      actionRef={actionRef}
      formRef={searchFormRef}
      rowKey="id"
      search={{
        labelWidth: 120,
      }}
      toolBarRender={() => [
        // <Upload {...props}>
        //   <Button icon={<UploadOutlined />}>上传充值记录</Button>
        // </Upload>,
        // <Upload {...Userprops}>
        //   <Button icon={<UploadOutlined />}>上传会员</Button>
        // </Upload>,
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            setCurrentRow(undefined);
            handleModalVisible(true);
          }}
        >
          <PlusOutlined /> 新增
        </Button>,
      ]}
      request={(params, sorter, filter) => getTableList({ ...params, sorter, filter })}
      columns={columns}
      rowSelection={{
        onChange: (_, selectedRows) => {
          const ids = selectedRows.map((item) => item.id);
          setSelectedRows(ids);
        },
      }}
    />
  );
}

module.exports = ConsumeList;
