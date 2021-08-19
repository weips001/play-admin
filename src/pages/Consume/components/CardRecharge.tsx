import React, { useRef, useState } from 'react';
import { message, RadioChangeEvent } from 'antd';
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { FormInstance } from 'antd';
import { VipProps } from '../model';
import { CardTypeProps } from '../data';
import { rechargeType, sexType } from '@/utils/constant';
import moment from 'moment';

type CardRechargeProps = {
  takeRecharge: (data: any) => void;
  vipInfo?: VipProps;
};

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
};

const CardRecharge: React.FC<CardRechargeProps> = (props) => {
  const { takeRecharge, vipInfo } = props;
  const formRef = useRef<FormInstance>();
  const [cardDetail, setCardDetail] = useState<CardTypeProps>();
  console.log('vipInfo', vipInfo);
  const changeCard = (e: RadioChangeEvent) => {
    const target: any = e.target;
    console.log(target);
    let { cardType, label, money, value, total, month } = target;
    const values = {
      cardType,
      label,
      money,
      total,
      month,
      value,
    };
    setCardDetail(values);
    total = total === -1 ? '不限次' : total;
    const overdate = moment(new Date()).add(month, 'month').format('YYYY-MM-DD');
    formRef.current?.setFieldsValue({
      money,
      total,
      overdate,
    });
    console.log('e', e);
  };
  return (
    <ProForm<{
      vipId?: string;
    }>
      title="充值"
      formRef={formRef}
      initialValues={{
        sex: '0',
        createAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        cardId: moment().format('YYYYMMDDhhmmss'),
      }}
      onFinish={async (values) => {
        if (cardDetail) {
          values = {
            ...values,
            ...cardDetail,
            vipId: vipInfo?.id,
          };
        }
        await takeRecharge(values);
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
            onChange(e: RadioChangeEvent) {
              changeCard(e);
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
      {/* <ProForm.Group>
        <ProFormDateTimePicker name="createAt" label="充值时间" />
      </ProForm.Group> */}
      <ProForm.Group>
        <ProFormTextArea width="md" name="remark" label="备注" />
      </ProForm.Group>
    </ProForm>
  );
};

export default CardRecharge;
