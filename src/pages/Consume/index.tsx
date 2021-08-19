import { Button, Input, Modal, Skeleton } from 'antd';
import type { ChangeEvent } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { CreateUpdateType } from './components/UserModal';
import { ExclamationCircleOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import UserModal from './components/UserModal';
import CardRecharge from './components/CardRecharge';
import RechargeRecord from './components/RechargeRecord';
import ConsumeRecord from './components/ConsumeRecord';
import ConsumeList from './components/ConsumeList';
import ConsumeModal from './components/ConsumeModal';
import MultipleVipModal from './components/MultipleVipModal';
import type { ConnectState } from '@/models/connect';
import type { ConsumeModelState, ActionOptions, TabOptions } from './model';
import { add, update } from './service';
import type { TableListItem, CommonRes, VipParams } from './data';

const { Search } = Input;

interface ConsumeProps extends ConsumeModelState {
  dispatch: Dispatch;
  searchLoading?: boolean;
  recordLoading?: boolean;
}
/**
 * 添加节点
 * @param fields
 */

const TableList: React.FC<ConsumeProps> = (props) => {
  const {
    dispatch,
    searchKey,
    vipInfo,
    rechargeRecord,
    activeAction,
    activeTab,
    searchLoading,
    consumeRecord,
    consumeTableList,
    recordLoading,
  } = props;
  const [userMoadlVisible, setUserMoadlVisible] = useState<boolean>(false);
  const [consumeVisible, setConsumeVisible] = useState<boolean>(false);
  const [multipleVipVisible, setMultipleVipVisible] = useState<boolean>(false);
  const [multipleVipList, setMultipleVipList] = useState<any[]>([]);

  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [modalType, setModalType] = useState<CreateUpdateType>('create');
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    fetchVipRecord();
  }, [dispatch, vipInfo]);

  const takeNoUserModal = () => {
    Modal.confirm({
      title: '此账号暂时还不是会员',
      icon: <ExclamationCircleOutlined />,
      content: '没有查到对应手机号的会员信息，是否需要新建会员？',
      okText: '确认',
      cancelText: '取消',
      onCancel() {
        console.log('cancel');
      },
      onOk() {
        setUserMoadlVisible(true);
        // console.log('confirm')
      },
    });
  };

  const serActiveAction = (action?: ActionOptions) => {
    dispatch({
      type: 'consume/saveActiveAction',
      payload: {
        activeAction: action,
      },
    });
  };

  const setActiveTab = (tab?: TabOptions) => {
    dispatch({
      type: 'consume/saveActiveTab',
      payload: {
        activeTab: tab,
      },
    });
  };

  const reset = () => {
    setActiveTab();
    serActiveAction();
  };
  const saveVipInfo = (value?: VipParams) => {
    dispatch({
      type: 'consume/saveVipInfo',
      payload: {
        vipInfo: value,
      },
    });
  };
  const changeSearchKey = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type: 'consume/saveSearchKey',
      payload: {
        searchKey: value,
      },
    });
  };
  const onSearch = async (value: string) => {
    if (value) {
      if (vipInfo) {
        saveVipInfo(undefined);
      }
      reset();
      const { data } = await dispatch({
        type: 'consume/fetchVipInfo',
        payload: {
          searchKey: value,
        },
      });
      if (data.length) {
        if (data.length === 1) {
          saveVipInfo(data[0]);
          serActiveAction('consume');
        } else {
          setMultipleVipVisible(true);
          setMultipleVipList(data);
        }
      } else {
        takeNoUserModal();
      }
    } else {
      saveVipInfo();
    }
  };

  const cancelUserModal = () => {
    setUserMoadlVisible(false);
  };
  const okUserModal = async (values: any) => {
    let res: CommonRes<VipParams>;
    if (vipInfo) {
      const params = {
        ...values,
        id: vipInfo.id,
      };
      res = await update(params);
    } else {
      res = await add(values);
    }
    dispatch({
      type: 'consume/saveSearchKey',
      payload: {
        searchKey: res.data.phone,
      },
    });
    saveVipInfo(res.data);
    Modal.success({
      content: res.msg,
    });
    setUserMoadlVisible(false);
  };
  const takeRecharge = (type: ActionOptions) => {
    if (type !== activeAction) {
      if (type === 'consume') {
        setActiveTab('settle');
      } else {
        setActiveTab('card');
      }
      serActiveAction(type);
    }
  };
  const editUser = (type: 'create' | 'update') => {
    setModalType(type);
    setUserMoadlVisible(true);
  };

  const cancelConsumeModal = () => {
    setCurrentRow(undefined);
    setConsumeVisible(false);
  };
  const fetchVipRecord = () => {
    if (vipInfo) {
      dispatch({
        type: 'consume/fetchVipRecord',
        payload: {
          vipId: vipInfo.id,
        },
      });
    }
  };
  const okConsumeModal = () => {
    fetchVipRecord();
    setConsumeVisible(false);
  };
  const showConsumeModal = (record: any) => {
    setCurrentRow(record);
    setConsumeVisible(true);
  };
  const rechargeCard = async (payload: any) => {
    const res = await dispatch({
      type: 'consume/fetchRecharge',
      payload,
    });
    Modal.success({
      content: res.msg,
      onOk() {
        takeRecharge('consume');
        fetchVipRecord();
      },
    });
  };
  let actions = [
    <Button type="link" onClick={() => takeRecharge('recharge')}>
      充值
    </Button>,
    <Button type="link" onClick={() => takeRecharge('consume')}>
      消费
    </Button>,
  ];
  if (!vipInfo) {
    actions = [];
  }

  const mainContent =
    activeAction === 'recharge' ? (
      <ProCard
        tabs={{
          tabPosition: 'top',
          activeKey: activeTab,
          onChange: (key) => {
            setActiveTab(key as TabOptions);
          },
        }}
      >
        <ProCard.TabPane key="card" tab="套卡充值">
          <CardRecharge takeRecharge={rechargeCard} vipInfo={vipInfo} />
        </ProCard.TabPane>
        <ProCard.TabPane key="gameBi" tab="游戏币充值">
          内容二
        </ProCard.TabPane>
      </ProCard>
    ) : (
      <ProCard
        tabs={{
          tabPosition: 'top',
          activeKey: activeTab,
          onChange: (key) => {
            setActiveTab(key as TabOptions);
          },
        }}
      >
        <ProCard.TabPane key="settle" tab="消费结算">
          <ConsumeList
            loading={recordLoading}
            dataSource={consumeTableList}
            setConsumeVisible={showConsumeModal}
          />
        </ProCard.TabPane>
        <ProCard.TabPane key="rechargeRecord" tab="充值记录">
          <RechargeRecord dataSource={rechargeRecord} />
        </ProCard.TabPane>
        <ProCard.TabPane key="consumeRecord" tab="消费记录">
          <ConsumeRecord dataSource={consumeRecord} />
        </ProCard.TabPane>
      </ProCard>
    );
  const showContent = activeAction ? mainContent : null;
  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="360px" actions={actions}>
          <Search
            placeholder="请输入手机号/姓名/卡号"
            allowClear
            loading={searchLoading}
            enterButton="查询"
            size="large"
            value={searchKey}
            onChange={changeSearchKey}
            onSearch={onSearch}
          />
          <Skeleton loading={searchLoading} paragraph={{ rows: 8 }}>
            <ProDescriptions
              actionRef={actionRef}
              column={1}
              style={{ marginTop: '24px' }}
              title="个人详情"
              extra={null}
            >
              <ProDescriptions.Item label="姓名">{vipInfo?.name}</ProDescriptions.Item>
              <ProDescriptions.Item label="手机号">{vipInfo?.phone}</ProDescriptions.Item>
              <ProDescriptions.Item
                label="性别"
                valueEnum={{
                  0: '男',
                  1: '女',
                }}
              >
                {vipInfo?.sex}
              </ProDescriptions.Item>

              <ProDescriptions.Item
                label="生日"
                valueType="date"
                fieldProps={{
                  format: 'YYYY年MM月DD日',
                }}
              >
                {vipInfo?.birthday}
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="创建日期"
                valueType="dateTime"
                fieldProps={{
                  format: 'YYYY-MM-DD HH:mm:ss',
                }}
              >
                {vipInfo?.createdAt}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="备注">{vipInfo?.remark}</ProDescriptions.Item>
              <ProDescriptions.Item label="文本" valueType="option">
                {vipInfo ? (
                  <Button
                    type="link"
                    onClick={() => {
                      editUser('update');
                    }}
                    icon={<EditOutlined />}
                    key="reload"
                  >
                    修改会员
                  </Button>
                ) : (
                  <Button
                    type="link"
                    onClick={() => {
                      editUser('create');
                    }}
                    icon={<PlusOutlined />}
                    key="reload"
                  >
                    新增会员
                  </Button>
                )}
              </ProDescriptions.Item>
            </ProDescriptions>
          </Skeleton>
        </ProCard>
        {vipInfo ? showContent : null}
      </ProCard>
      <UserModal
        vipInfo={vipInfo}
        phone={searchKey}
        modalType={modalType}
        onCancel={cancelUserModal}
        onOk={okUserModal}
        visible={userMoadlVisible}
      />
      <ConsumeModal
        modalType="create"
        currentRow={currentRow}
        onCancel={cancelConsumeModal}
        onOk={okConsumeModal}
        visible={consumeVisible}
      />
      <MultipleVipModal
        visible={multipleVipVisible}
        onOk={(values) => {
          saveVipInfo(values);
          serActiveAction('consume');
          setMultipleVipVisible(false);
        }}
        onCancel={() => {
          setMultipleVipVisible(false);
        }}
        dataSource={multipleVipList}
      />
    </PageContainer>
  );
};

export default connect((state: ConnectState) => {
  return {
    searchKey: state.consume.searchKey,
    vipInfo: state.consume.vipInfo,
    consumeTableList: state.consume.consumeTableList,
    rechargeRecord: state.consume.rechargeRecord,
    consumeRecord: state.consume.consumeRecord,
    activeAction: state.consume.activeAction,
    activeTab: state.consume.activeTab,
    searchLoading: state.loading.effects['consume/fetchVipInfo'],
    recordLoading: state.loading.effects['consume/fetchVipRecord'],
  };
})(TableList);
