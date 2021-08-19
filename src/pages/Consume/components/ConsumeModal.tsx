import React, { useRef, useState } from 'react';
import { Modal, Tag } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { FormInstance } from 'antd';
import { consumeNum } from '@/utils/constant';
import { consume } from '../service';

export type CreateUpdateType = 'create' | 'update';

type ConsumeProps = {
  visible: boolean;
  currentRow: {
    cardId: string;
    cardType: string;
    restTotal: number;
    id: string;
  };
  phone: string;
  onCancel: () => void;
  onOk: () => void;
};

const ConsumeModal: React.FC<ConsumeProps> = (props) => {
  const { visible, currentRow, onCancel, onOk } = props;
  const formRef = useRef<FormInstance>();
  const [activeConsume, setActiveConsume] = useState(consumeNum);

  const onVisibleChange = (consumeVisible: boolean) => {
    if (consumeVisible) {
      const { cardId, cardType, restTotal } = currentRow;
      const values = {
        cardType,
        cardId,
      };
      formRef.current?.setFieldsValue(values);
      if (restTotal === -1) {
        const newConsume = activeConsume.filter((item) => item.value === 1);
        setActiveConsume(newConsume);
      } else {
        const newConsume = activeConsume.filter((item) => item.value <= restTotal);
        setActiveConsume(newConsume);
      }
    } else {
      setActiveConsume(consumeNum);
    }
  };

  return (
    <ModalForm<{
      deleteNum: number;
    }>
      title="消费"
      visible={visible}
      formRef={formRef}
      initialValues={{
        deleteNum: 1,
      }}
      onVisibleChange={onVisibleChange}
      modalProps={{
        onCancel: () => {
          onCancel();
        },
        afterClose: () => {
          formRef.current?.resetFields();
        },
      }}
      onFinish={async (values) => {
        const params = {
          deleteNum: values.deleteNum,
          id: currentRow.id,
        };
        const { msg } = await consume(params);
        onOk();
        Modal.success({
          content: msg,
        });
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="cardId" label="卡号" readonly />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          name="cardType"
          label="卡种"
          valueEnum={{
            0: <Tag color="#5BD8A6">次卡</Tag>,
            1: <Tag color="#f50">年卡</Tag>,
          }}
          readonly
        />
        {/* <ProFormText width="md" name="cardType" label="卡种" readonly /> */}
      </ProForm.Group>
      <ProForm.Group>
        <ProFormRadio.Group
          name="deleteNum"
          radioType="button"
          label="消费次数"
          rules={[
            {
              required: true,
              message: '请选择消费次数!',
            },
          ]}
          options={activeConsume}
        ></ProFormRadio.Group>
      </ProForm.Group>
      {/* <ProForm.Group>
        <ProFormTextArea width="md" name="remark" label="备注" />
      </ProForm.Group> */}
      {/* <ProForm.Group>
        <ProFormDateTimePicker name="createdAt" label="消费时间" />
      </ProForm.Group> */}
    </ModalForm>
  );
};

export default ConsumeModal;
