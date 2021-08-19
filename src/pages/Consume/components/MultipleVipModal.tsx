import { Modal, Table, Space } from 'antd';
import moment from 'moment';
type MultipleVipModalProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  dataSource: any[];
};

const MultipleVipModal = (props: MultipleVipModalProps) => {
  const { visible, onCancel, onOk, dataSource } = props;
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (_, record) => {
        if (record.sex !== undefined) {
          return record.sex === '0' ? '男' : '女';
        }
        return null;
      },
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => {
        if (record.createdAt != undefined) {
          return moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
        }
        return '-';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onOk(record)}>选择</a>
        </Space>
      ),
    },
  ];
  return (
    <Modal visible={visible} width="800px" title="请选择一个会员" onCancel={onCancel} footer={null}>
      <Table pagination={false} columns={columns} rowKey="id" dataSource={dataSource} />
    </Modal>
  );
};

export default MultipleVipModal;
