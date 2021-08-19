import React from 'react';
import { Tag } from 'antd';
import ProList from '@ant-design/pro-list';
import moment from 'moment';
import styles from './index.less';

interface RechargeProps {
  dataSource: any[];
}

const RechargeList = (props: RechargeProps) => {
  const { dataSource } = props;

  return (
    <ProList<any>
      split
      rowKey="id"
      dataSource={dataSource}
      showActions="hover"
      showExtra="hover"
      metas={{
        subTitle: {
          render: (_, row, index) => {
            let { createdAt } = row;
            createdAt = moment(createdAt).format('YYYY-MM-DD hh:mm:ss');
            return (
              <>
                {index + 1}. {createdAt}消費成功，次數：
                <span className={styles.bold}>{row.consumeNum}</span> 次。
                {row.remark ? `备注：${row.remark}` : null}
              </>
            );
          },
        },
      }}
    />
  );
};

export default RechargeList;
