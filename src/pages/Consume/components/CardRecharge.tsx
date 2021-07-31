import React, { useRef, useEffect } from 'react';
import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormDateTimePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { FormInstance } from 'antd';
import { sexType, rechargeType } from '@/utils/constant';
import { add } from '../service';
import type { VipProps } from '../model';

export type CreateUpdateType = 'create' | 'update';

type UserMoadlProps = {
  vipInfo?: VipProps;
  // onCancel: () => void;
  // onOk: () => void;
};
const titleMap = {
  create: '创建会员',
  update: '更新会员',
};
const CardRecharge: React.FC<UserMoadlProps> = (props) => {
  const { vipInfo, currentRow, onCancel, onOk } = props;
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue(vipInfo);
  }, [vipInfo]);

  const onVisibleChange = (visible: boolean) => {
    if (visible) {
      const { name, phone } = currentRow;
      const values = {
        name,
        phone,
      };
      formRef.current?.setFieldsValue(values);
    }
  };

  return (
    <ProForm<{
      name: string;
      company: string;
    }>
      title="充值"
      formRef={formRef}
      initialValues={{
        sex: '0',
        cardId: moment().format('YYYYMMDDhhmmss'),
        createdAt: new Date(),
      }}
      onFinish={async (values) => {
        // values.cardType = values.cardType < 0 ? '1' : '0';
        // const { birthday, sex, remark } = currentRow;
        // const params = {
        //   ...values,
        //   birthday,
        //   sex,
        //   restTotal: values.total,
        //   cardId: moment().format('YYYYMMDDhhmmss'),
        //   remark,
        // };
        // await add(params);
        // onOk();
        // message.success('充值成功');
        // return true;
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="cardId" label="卡号" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormRadio.Group
          name="cardType"
          radioType="button"
          label="套卡类型"
          rules={[
            {
              required: true,
              message: '请选择套卡类型!',
            },
          ]}
          fieldProps={{
            onChange(e) {
              console.log('e', e);
              const { label, value, month, money } = e.target;
              const overdate = moment(new Date()).add(month, 'month').format('YYYY-MM-DD');
              formRef.current?.setFieldsValue({
                money,
                total: value,
                overdate,
              });
              console.log('e', e);
            },
          }}
          options={rechargeType}
        ></ProFormRadio.Group>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="money" readonly label="金额" />
        <ProFormText width="md" name="total" label="次数" readonly />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          rules={[
            {
              required: true,
              message: '请选择有效期!',
            },
          ]}
          name="overdate"
          label="有效期至"
          placeholder="请选择有效期"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDateTimePicker name="createdAt" label="充值时间" />
      </ProForm.Group>
    </ProForm>
  );
};

export default CardRecharge;
