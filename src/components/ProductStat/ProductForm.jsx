import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductForm = () => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);

  // Danh sách màu sắc
  const colors = ['Xanh', 'Đỏ', 'Tím', 'Vàng'];
  
  // Danh sách size
  const sizes = Array.from({length: 7}, (_, i) => i + 39);

  // Xử lý upload ảnh
  const handleImageUpload = ({ fileList }) => {
    setImageList(fileList);
    if (fileList.length > 0) {
      message.success(`Đã tải lên ${fileList.length} ảnh thành công`);
    }
  };

  // Xử lý submit form
  const handleSubmit = (value) => {
    const formData = {
      ...value,
      images: imageList.map(file => file.originFileObj)
    };
    
    // TODO: Gọi API để lưu sản phẩm
    /* 
    try {
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Xử lý response
    } catch (error) {
      // Xử lý lỗi
    }
    */
    
    console.log('Form values:', formData);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
  
      <Form
        form={form}
        layout="vertical"
        
      >
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
         
          ]}
        >
          <Input type="number" min={0} />
        </Form.Item>


        <Form.Item
          label="Thêm ảnh"
          name="images"
        >
          <Upload
            listType="picture"
            multiple
            onChange={handleImageUpload}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Ảnh mặc định"
          name="defaultImage"
        >
          <Select>
            {imageList.map((file, index) => (
              <Option key={index} value={file.name}>
                {file.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Màu sắc"
          name="color"
       
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
      
        >
      
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => { form.resetFields()}}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" onClick={()=>handleSubmit}>
              Lưu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;