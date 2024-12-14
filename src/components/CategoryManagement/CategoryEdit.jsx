import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const ProductEdit = ({selectedCategory, updateCategory,showSua,setShowSua}) => {
  const [name, setname] = useState('');
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setShowSua(false);
  };

  const submitForm = (value) => {
    updateCategory(selectedCategory,value);
    setShowSua(false);
  };
  return (
    <Modal  open={showSua}
            onCancel={handleCancel}
            footer={null}
    >
  <Form
        form={form}
        layout="vertical"
        onFinish={submitForm}
      >
       <Form.Item
          label="Tên thể loại"
          name="name"
        >
      
          <Input value={name} onChange={(e) => setname(e.target.value)} />
        </Form.Item>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">Lưu</Button>
        </div>
      </Form>
  </Modal>

  );
};

export default ProductEdit;