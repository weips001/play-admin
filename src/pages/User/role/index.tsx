import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal, Drawer, Checkbox, Row, Col, Form, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormCheckbox,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import type { TableListItem, UpdateParams } from './data.d';
import {
  queryRule,
  updateRule,
  addRule,
  removeRule,
  getAllAuth,
  getAuthFromRole,
  bindAuth,
} from './service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

const { confirm } = Modal;
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule(fields);
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [authModalVisible, setAuthModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const modalRef = useRef<FormInstance>();
  const authRef = useRef<FormInstance>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [authInfo, setAuthInfo] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<string[]>([]);
  const [authList, setAuthList] = useState([]);
  const [authLabel, setAuthLabel] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    async function getAuthList() {
      const { data = [] } = await getAllAuth();
      setAuthList(data);
    }
    getAuthList();
  }, []);

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

  const showAuthModal = async (record: TableListItem) => {
    setAuthInfo(record);
    setAuthModalVisible(true);
    const { data } = await getAuthFromRole({ roleId: record.id });
    const params = {
      ...record,
      auth: data,
    };
    authRef.current?.setFieldsValue(params);
  };

  const confirmBindAuth = async (value: UpdateParams) => {
    const params = {
      ...value,
      roleId: authInfo?.id,
    };
    const { msg } = await bindAuth(params);
    setAuthModalVisible(false);
    message.success(msg);
  };
  const confirmUpdate = async (value: TableListItem) => {
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      render: (dom, record) => {
        return (
          <a
            onClick={async () => {
              setCurrentRow(record);
              setShowDetail(true);
              const { data } = await getAuthFromRole({ roleId: record.id });
              getAuthLabel(data);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      hideInSearch: true,
    },
    {
      title: '角色描述',
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
      render: (_, record) => {
        if (record.roleCode === '-1') {
          return null;
        }
        return [
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
              await showAuthModal(record);
            }}
          >
            綁定權限
          </a>,
          <a
            key="subscribeAlert"
            onClick={async () => {
              await confirmDel(record.id);
            }}
          >
            删除
          </a>,
        ];
      },
    },
  ];

  const onVisibleChange = (visible: boolean) => {
    handleModalVisible(visible);
  };
  const getAuthLabel = (ids: string[]) => {
    const list = authList.filter((auth) => ids.includes(auth.value));
    setAuthLabel(list);
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
        formRef={authRef}
        title="绑定权限"
        width="400px"
        modalProps={{
          afterClose() {
            setAuthInfo(undefined);
            authRef.current?.resetFields();
          },
        }}
        visible={authModalVisible}
        onVisibleChange={(visible) => setAuthModalVisible(visible)}
        onFinish={confirmBindAuth}
      >
        <ProFormText readonly label="角色名称" width="md" name="roleName" />
        <ProFormText readonly label="角色编码" width="md" name="roleCode" />
        <ProFormCheckbox.Group
          name="auth"
          label="权限列表"
          options={authList}
          rules={[
            {
              required: true,
              message: '联系方式为必填项',
            },
          ]}
        ></ProFormCheckbox.Group>
      </ModalForm>
      <ModalForm
        formRef={modalRef}
        title={currentRow ? '修改角色信息' : '新建角色'}
        width="400px"
        modalProps={{
          afterClose() {
            setCurrentRow(undefined);
            modalRef.current?.resetFields();
          },
        }}
        visible={createModalVisible}
        onVisibleChange={onVisibleChange}
        onFinish={confirmUpdate}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '角色名称为必填项',
            },
          ]}
          label="角色名称"
          width="md"
          name="roleName"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '角色编码为必填项',
            },
          ]}
          label="角色编码"
          width="md"
          name="roleCode"
        />
        <ProFormTextArea
          name="desc"
          rules={[
            {
              required: true,
              message: '角色描述为必填项',
            },
          ]}
          label="角色描述"
        ></ProFormTextArea>
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
          <>
            <ProDescriptions<TableListItem>
              column={1}
              title={currentRow?.roleName}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.userName,
              }}
              columns={columns as ProDescriptionsItemProps<TableListItem>[]}
            />
            <div className={styles.auth}>
              <p className={styles.title}>权限列表：</p>
              {authLabel.length ? (
                <div>
                  {authLabel.map((auth) => (
                    <div className={styles.label} key={auth.value}>
                      {auth.label}
                    </div>
                  ))}
                </div>
              ) : (
                <div>暂无权限</div>
              )}
            </div>
          </>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
