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
  const handleSubmit = (values) => {
    const formData = {
      ...values,
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
      <h2>Thêm Sản phẩm</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
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
            { type: 'number', min: 0, message: 'Giá phải lớn hơn 0!' }
          ]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item
          label="Mô tả sản phẩm"
          name="description"
        >
          <Input.TextArea rows={4} />
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
          rules={[{ required: true, message: 'Vui lòng chọn màu sắc!' }]}
        >
          <Select>
            {colors.map(color => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: 'Vui lòng chọn size!' }]}
        >
          <Select>
            {sizes.map(size => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => form.resetFields()}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;