import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const ProductEdit = ({selectedProduct, UpdateProduct,showSua,setShowSua}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [created_at,setCreatedate] = useState('');
  const [updated_at,setUpdateddate] = useState('');
  const [form] = Form.useForm();
  const [categoryId, setCategoryId] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mainImage, setMainImage] = useState(null); // ID của ảnh chính
  const [categoríes,setCategory]=useState([
    {id:1,name:'Category 1'},
    {id:2,name:'Cate2'}
  ]);
  console.log('Selected Product:', selectedProduct);     
  const server='https://b64c-2402-800-61c5-f47b-8ce5-2d84-a0f4-6cdd.ngrok-free.app'
  const { Option } = Select;
  const handleCancel = () => {
    form.resetFields();
    setShowSua(false);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleImageUpload = (fileList) => {
    const images = fileList.map((file, index) => ({
      id: index, // ID tạm thời, có thể thay bằng giá trị khác
      url: file.thumbUrl || file.url,
    }));
    setUploadedImages(images);
    if (!mainImage && images.length > 0) {
      setMainImage(images[0].id); // Đặt ảnh đầu tiên làm mặc định
    }
  };
  const submitForm = (e) => {
    e.preventDefault();

    const updateProduct = {
    };

    UpdateProduct(updateProduct);
    setShowSua(false);
  };


  return (
    <Modal open={showSua} onCancel={handleCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={submitForm}>
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
        >
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
        >
          <Select
            placeholder="Chọn danh mục"
            value={categoryId}
            onChange={(value) => setCategoryId(value)}
          >
            {categoríes.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Upload ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            listType="picture-card"
            multiple
            action="https://1b6d-2402-800-61c5-f47b-84c6-6956-84ee-4377.ngrok-free.app/product?page=0&size=35/upload"
            onChange={({ fileList }) => handleImageUpload(fileList)}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {uploadedImages.map((image) => (
              <div
                key={image.id}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
                onClick={() => setMainImage(image.id)}
              >
                <img
                  src={image.url}
                  alt="uploaded"
                  style={{
                    width: 100,
                    height: 100,
                    border: mainImage === image.id ? '2px solid green' : '1px solid #ccc',
                  }}
                />
                {mainImage === image.id && (
                  <CheckCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ position: 'absolute', top: 5, right: 5 }}
                  />
                )}
              </div>
            ))}
          </div>
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit" onClick={handleCancel}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>

  );
};

export default ProductEdit;