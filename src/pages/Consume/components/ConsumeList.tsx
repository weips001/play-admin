import { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Tag } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from '../data';
// import { sexType, rechargeType, cardTypeEnum } from '@/utils/constant';

function ConsumeList(props) {
  const { dataSource, setConsumeVisible } = props;
  console.log('in', dataSource.length);
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    actionRef.current?.reload();
  }, [dataSource]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '卡号',
      dataIndex: 'cardId',
      order: 1,
    },
    {
      title: '卡种',
      dataIndex: 'cardType',
      render(_, { cardType }) {
        const cardName = cardType === '0' ? '次卡' : '时间卡';
        const color = cardType === '0' ? '#5BD8A6' : '#f50';
        return <Tag color={color}>{cardName}</Tag>;
      },
    },
    {
      title: '金额',
      hideInSearch: true,
      valueType: 'money',
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
            key="consume"
            onClick={() => {
              setConsumeVisible(record);
            }}
          >
            消费
          </a>,
        ];

        return operate;
      },
    },
  ];
  return (
    <ProTable<TableListItem>
      headerTitle={null}
      bordered={true}
      actionRef={actionRef}
      rowKey="id"
      options={false}
      search={false}
      request={() => {
        return Promise.resolve({
          success: true,
          data: dataSource,
        });
      }}
      columns={columns}
    />
  );
}

export default ConsumeList;
