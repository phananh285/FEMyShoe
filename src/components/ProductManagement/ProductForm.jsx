import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal,Tag,Space,Typography,Card } from 'antd';
import { CloseOutlined,UploadOutlined, PlusOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { useEffect } from 'react';
import axios from 'axios';
const ProductForm = ({ addProduct, show, setShow }) => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stocks,setStocks]=useState([])
  const [selectedSizes, setSelectedSizes] = useState([]); // Danh sách các size đã chọn
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [ImageID, setImageID] = useState([]); 
  const [mainImage, setMainImage] = useState(null); // ID của ảnh chính
  const server='https://5e81-116-96-44-182.ngrok-free.app'
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  useEffect(() => {
    form.setFieldsValue({
      items: [
        {
          name: 'Kích Cỡ',
          list: [{ size: '', stock: '' }],
        },
      ],
    }, [form]);
    form.setFieldsValue({ selectedSizes, uploadedImages });
  }, [selectedSizes, uploadedImages]);
  const addSize = (size) => {
    if (size && !selectedSizes.includes(size)) {
      setSelectedSizes((prev) => [...prev, size]);
    } else {
      message.warning('Size đã được thêm hoặc không hợp lệ!');
    }
  };

  const removeSize = (size) => {
    setSelectedSizes((prev) => prev.filter((s) => s !== size));
  };
 useEffect(() => {
    const fetchCategory = async () => {
      const apiUrl = server+"/category";
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Ngrok-Skip-Browser-Warning' : 1
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
    setShow(false);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file); // Dữ liệu file được gửi đi
    try {
      const response = await axios.post(server+'/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Ngrok-Skip-Browser-Warning' : 1
        },
      });
      message.success('Upload thành công!');
    
      console.log('Response:', response.data);
      setImageID([...ImageID,response.data.id]);
    } catch (error) {
      message.error('Upload thất bại!');
      console.error('Error:', error);
    }
  };
  const handleImageUpload = ({ fileList }) => {
    const images = fileList.map((file) => ({
      id: file.id, // ID duy nhất của ảnh
      url: file.thumbUrl || file.response?.url || URL.createObjectURL(file.originFileObj), // Fallback cho URL
    }));
    
    setUploadedImages(images);
  
    // Đặt ảnh đầu tiên làm ảnh chính nếu chưa có
    if (!mainImage && images.length > 0) {
      setMainImage(images[0].id);
    }
  };
  const removeImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    if (mainImage === id) {
      setMainImage(null);
    }
  };
  //gừi form
  const submitForm = (value) => {
    console.log(value)
    // Get sizes and stocks from Form.List
    const sizesAndStocks = value.items.flatMap(item => {
      if (item['kích cỡ'] && Array.isArray(item['kích cỡ'])) {
        return item['kích cỡ'].map(sizeStock => ({
          size: sizeStock.size,
          stock: sizeStock.stock,
        }));
      }
      return [];
    });
  
    // Extract sizes and stocks into separate arrays
    const selectedSizes = sizesAndStocks.map(item => item.size);
    const stocks = sizesAndStocks.map(item => item.stock);
    
    // Update state with extracted values
    setSelectedSizes(selectedSizes);
    setStocks(stocks);
  
    // Create the product data
    const productData = {
      name: value.productName, // Use the correct name for product name
      description: value.description,
      categoryId: categoryId, // Assuming categoryId is set correctly
      price: parseFloat(value.price), // Ensure price is a number
      images: uploadedImages.map((img) => ({
        id: img.id,
        isPrimary: img.id === mainImage,
      })),
      attributes: [
        {
          name: "kích cỡ",
          options: selectedSizes.map((size) => size.toString()),
        },
      ],
      variants: selectedSizes.map((size, index) => ({
        price: parseFloat(value.price), // Ensure variant price is a number
        stock: stocks[index], // Use the corresponding stock for the size
        attributeOptions: [size.toString()],
      })),
    };
  
   // console.log(productData);
    addProduct(productData);
    setShow(false);
  };
  

  return (
    <Modal open={show} onCancel={handleCancel} footer={null}>
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


        <Form.List name="variant">
        {(fields, { remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Name" name={[field.name, 'name']} initialValue="Kích Cỡ">
                  <Input disabled />
                </Form.Item>

                <Form.Item label="danh sách kích cỡ">
                  <Form.List name={[field.name, 'kích cỡ']}>
                    {(subFields, subOpt) => (
                      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'size']}>
                              <Input  placeholder="kích cỡ" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'stock']}>
                              <Input placeholder="Số lượng hàng tồn" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'price']}>
                              <Input placeholder="giá" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Thêm kích thước
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}
          </div>
        )}
      </Form.List>

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
        <Form.Item name="uploadedImages" initialValue={uploadedImages} label="Upload ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
  <Upload
    listType="picture-card"
    multiple
    customRequest={({ file, onSuccess, onError }) => {
      // Tự xử lý upload thay vì sử dụng cơ chế mặc định
      handleUpload(file)
        .then(() => onSuccess("ok"))
        .catch((err) => onError(err));
    }}
    
    showUploadList={false}
    value={uploadedImages}
    onChange={handleImageUpload}
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
      value={image.id}
      className={`uploaded-image ${mainImage === image.id ? 'main-image' : ''}`}
      onClick={() => setMainImage(image.id)}
    />
    {hoveredImage === image.id && (
      <Button
        className="delete-button"
        shape="circle"
        danger
        icon={<CloseOutlined />}
        onClick={() => removeImage(image.id)}
      />
    )}
    {mainImage === image.id && (
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