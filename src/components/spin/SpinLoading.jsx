import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './spinLoading.css';

function SpinLoading() {
  return (
    <div className="spin-container">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 64, color: '#9e78cf' }} spin />}
      />
    </div>
  );
}

export default SpinLoading;