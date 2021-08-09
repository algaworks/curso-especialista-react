import { Popconfirm } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React from 'react';

interface DoubleConfirmProps {
  children: React.ReactNode;
  disabled?: boolean;
  popConfirmTitle: string;
  modalTitle: string;
  modalContent: string;
  onConfirm?: () => void;
}

export default function DoubleConfirm(props: DoubleConfirmProps) {
  return (
    <Popconfirm
      disabled={props.disabled}
      title={props.popConfirmTitle}
      onConfirm={() => {
        confirm({
          title: props.modalTitle,
          onOk() {
            console.log('todo: implement payment batch approval');
          },
          content: props.modalContent,
        });
      }}
    >
      {props.children}
    </Popconfirm>
  );
}
