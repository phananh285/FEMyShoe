import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal, Tag, Space, Typography, Card } from 'antd';
import { CloseOutlined, UploadOutlined, PlusOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { useEffect } from 'react';
import axios from 'axios';
import server from 'constant/linkapi';
const ProductForm = ({ UpdateProduct, showSua, setShowSua,selectedProduct }) => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stocks, setStocks] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]); // Danh sách các size đã chọn
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mainImage, setMainImage] = useState(null); // ID của ảnh chính


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // useEffect(() => {
  //   form.setFieldsValue({ uploadedImages });
  // }, [uploadedImages]);

  useEffect(() => {
    const fetchCategory = async () => {
      const apiUrl = server + "/category";
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Ngrok-Skip-Browser-Warning': 1
          },
        });
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchCategory();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setShowSua(false);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file); // Dữ liệu file được gửi đi
    try {
      const response = await axios.post(server + '/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Ngrok-Skip-Browser-Warning': 1
        },
      });
      message.success('Upload thành công!');
      console.log('Response:', response.data);
      setUploadedImages([...uploadedImages, { id: response.data.data.id, url: URL.createObjectURL(file) }]);
          // Nếu chưa có ảnh chính, đặt ảnh đầu tiên làm ảnh chính
    if (!mainImage) {
      setMainImage(response.data.id);
    }
    console.log('response id: ',response.data.data.id)
    } catch (error) {
      message.error('Upload thất bại!');
      console.error('Error:', error);
    }
     console.log(uploadedImages[0].id);
  };

const handleImageUpload = ({ fileList }) => {
    // const images = fileList.map((file) => ({
    //   id: file.response?.id || file.id || file.uid, // Lấy id từ response của upload, fallback qua file.id hoặc file.uid
    //   url: file.thumbUrl || file.response?.url || URL.createObjectURL(file.originFileObj), // Fallback cho URL
    // }));
    // console.log(uploadedImages[0].id);
    // Đặt ảnh đầu tiên làm ảnh chính nếu chưa có
    if (!mainImage && fileList.length > 0) {
      setMainImage(fileList[0].id);
    }
  };


  const removeImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    if (mainImage === id) {
      setMainImage(null);
    }
  };

  const submitForm = (value) => {
    console.log("selected product: ",selectedProduct)
    // Tạo dữ liệu sản phẩm, chỉ định ảnh chính
    const productData = {
      name: value.productName,
      description: value.description,
      categoryId: categoryId,
      images: uploadedImages.map((img) => {
        return img.id === mainImage
          ? { id: img.id, isPrimary: true } // Chỉ định ảnh chính
          : { id: img.id }; // Không có thuộc tính isPrimary
      }),
      attributes: [
        {
          name: "kích cỡ",
          options: selectedVariants.map((variant) => parseInt(variant.size)),
        },
      ],
      variants: selectedVariants.map((variant) => ({
        price: parseFloat(variant.price), // Chuyển giá sang số thực
        stock: parseInt(variant.stock), // Chuyển stock sang số nguyên
        attributeOptions: [variant.size],
      })),
    };
  
    console.log(productData);
    
    // Gọi hàm addProduct với dữ liệu sản phẩm
    UpdateProduct(selectedProduct,productData);
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
        <Form.Item label="Danh sách kích cỡ">
          <Space.Compact>
            <Form.Item name={['variants', 'size']} noStyle>
              <Input placeholder="size" />
            </Form.Item>
            <Form.Item name={['variants', 'stock']} noStyle>
              <Input placeholder="stock" />
            </Form.Item>
            <Form.Item name={['variants', 'price']} noStyle>
              <Input placeholder="price" />
            </Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                const size = form.getFieldValue(['variants', 'size']);
                const stock = form.getFieldValue(['variants', 'stock']);
                const price = form.getFieldValue(['variants', 'price']);

                if (size && stock && price) {
                  setSelectedVariants((prevVariants) => [
                    ...prevVariants,
                    { size, stock, price }
                  ]);
                  form.resetFields(['variants']);
                } else {
                  message.warning('Vui lòng nhập đầy đủ thông tin size, stock, và price!');
                }
              }}
            >
              Thêm
            </Button>
          </Space.Compact>
        </Form.Item>

        {selectedVariants.map((variant, index) => (
          <Tag key={index}>
            Size: {variant.size}, Stock: {variant.stock}, Price: {variant.price}
          </Tag>
        ))}

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
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item initialValue={uploadedImages} label="Upload ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            listType="picture-card"
            multiple
            customRequest={({ file, onSuccess, onError }) => {
              handleUpload(file)
                .then(() => onSuccess("ok"))
                .catch((err) => onError(err));
            }}
            showUploadList={false}
            fileList={uploadedImages}
            onChange={(fileList) => handleImageUpload(fileList)}
          >
            {uploadedImages.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {uploadedImages.map((image) => (
              <div
                key={image.id}
                className="image-container"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
               <img
                src={image.url}
               alt="uploaded"
               className={`uploaded-image ${mainImage === image.id ? 'main-image' : ''}`}
               onClick={() => setMainImage(image.id)} // Chọn ảnh làm ảnh chính
                    />
                {hoveredImage == image.id && (
                  <Button
                    className="delete-button"
                    shape="circle"
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => removeImage(image.id)}
                  />
                )}
                {mainImage == image.id && (
                  <CheckCircleTwoTone
                    twoToneColor="#52c41a"
                    className="check-icon"
                  />
                )}
              </div>
            ))}
          </div>
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductForm;
