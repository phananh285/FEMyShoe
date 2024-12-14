import React, { useState } from 'react';
import { Form, Input,Button,Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const CategoryForm = ({addCategory,show,setShow}) => {
  const [form] = Form.useForm();
  const [name, setname] = useState('');
  const handleCancel = () => {
    form.resetFields();
    setShow(false);
  };
  const submitForm = (value) => {
    console.log(value)
 
    
    addCategory(value);
    setShow(false);
  };

  return (
    <Modal  open={show}
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

export default CategoryForm;