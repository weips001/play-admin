import React from 'react';
import { Tag } from 'antd';
import ProList from '@ant-design/pro-list';
import moment from 'moment';
import styles from './index.less';

interface RechargeProps {
  dataSource: any[];
}

const RechargeRecord = (props: RechargeProps) => {
  const { dataSource } = props;

  return (
    <ProList<any>
      split
      rowKey="id"
      dataSource={dataSource}
      showActions="hover"
      showExtra="hover"
      metas={{
        title: {
          render(_, row) {
            const { cardType } = row;
            const cardName = cardType === '0' ? '次卡' : '时间卡';
            const color = cardType === '0' ? '#5BD8A6' : '#f50';
            return <Tag color={color}>{cardName}</Tag>;
          },
        },
        description: {
          render(_, row) {
            return (
              <>
                充值成功，金额￥<span className={styles.bold}>{row.money}</span> 元。
                {row.remark ? `备注：${row.remark}` : null}
              </>
            );
          },
        },
        subTitle: {
          render: (_, row) => {
            let { createdAt } = row;
            createdAt = moment(createdAt).format('YYYY-MM-DD hh:mm:ss');
            return createdAt;
          },
        },
      }}
    />
  );
};

export default RechargeRecord;
