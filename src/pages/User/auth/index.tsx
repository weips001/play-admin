import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { TableListItem, UpdateUItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields: UpdateUItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error(`添加失败，失败原因：${error.msg}！`);
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: UpdateUItem) => {
  const hide = message.loading('正在编辑');

  try {
    await updateRule(fields);
    hide();
    message.success('编辑成功');
    return true;
  } catch (error) {
    hide();
    message.error(`编辑失败，失败原因：${error.msg}！`);
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const modalRef = useRef<FormInstance>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<string[]>([]);

  const handleRemove = async (selectedRows: string) => {
    if (!selectedRows) return true;
    try {
      await removeRule(selectedRows);
      actionRef.current?.reloadAndRest?.();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * 删除节点
   *
   * @param selectedRows
   */
  const confirmDel = (selectedRows: string) => {
    confirm({
      title: '是否确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '您正在删除当前数据，是否继续？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        return handleRemove(selectedRows);
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '权限名称',
      dataIndex: 'authName',
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
      title: '权限编码',
      dataIndex: 'authCode',
      hideInSearch: true,
    },
    {
      title: '权限描述',
      hideInForm: true,
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInForm: true,
      sorter: true,
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleModalVisible(true);
            setCurrentRow(record);
            modalRef.current?.setFieldsValue(record);
          }}
        >
          编辑
        </a>,
        <a
          key="subscribeAlert"
          onClick={async () => {
            await confirmDel(record.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const onVisibleChange = (visible: boolean) => {
    handleModalVisible(visible);
  };

  const confirmAuth = async (value: UpdateUItem) => {
    let success;
    if (currentRow?.id) {
      const params = {
        ...value,
        id: currentRow.id,
      };
      success = await handleUpdate(params);
    } else {
      success = await handleAdd(value);
    }

    if (success) {
      handleModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="人员管理"
        bordered={true}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            const ids = selectedRows.map((item) => item.id);
            setSelectedRows(ids);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                {/* 服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万 */}
              </span>
            </div>
          }
        >
          {/* <Button
            onClick={async () => {
              await confirmDel(selectedRowsState);
              setSelectedRows([]);
            }}
          >
            批量删除
          </Button> */}
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        formRef={modalRef}
        title={currentRow ? '修改权限信息' : '新建权限'}
        width="600px"
        modalProps={{
          afterClose() {
            setCurrentRow(undefined);
            modalRef.current?.resetFields();
          },
        }}
        initialValues={{
          authFlag: '-1',
        }}
        visible={createModalVisible}
        onVisibleChange={onVisibleChange}
        onFinish={confirmAuth}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '权限名称为必填项',
            },
          ]}
          label="权限名称"
          width="md"
          name="authName"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '权限编码为必填项',
            },
          ]}
          label="权限编码"
          width="md"
          name="authCode"
        />
        <ProFormSelect
          name="authFlag"
          width="md"
          label="分配范围"
          valueEnum={{
            '-1': '所有用户',
            '-2': '仅超级管理员',
          }}
          placeholder="请选择分配范围"
          rules={[{ required: true, message: '请选择分配范围!' }]}
        />
        <ProFormTextArea
          name="desc"
          label="权限描述"
          rules={[
            {
              required: true,
              message: '权限描述为必填项',
            },
          ]}
          placeholder="请输入权限描述"
        />
      </ModalForm>
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.authName}
            request={async () => ({
              data: currentRow || {},
            })}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
