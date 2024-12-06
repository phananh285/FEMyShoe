import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const CategoryForm = ({addCategory,show,setShow}) => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [id, setid] = useState('');
  const [name, setname] = useState('');
  const [description, setDescription] = useState('');
  const [created_at,setCreatedate] = useState('');
  const [updated_at, setUpdateddate] = useState('');
  const [categoríes,setCategory]=useState([
    {id:1,name:'Category 1'},
    {id:2,name:'Cate2'}
  ]);
  const { Option } = Select;
  // Xử lý upload ảnh
  const handleImageUpload = ({ fileList }) => {
    setImageList(fileList);
    if (fileList.length > 0) {
      message.success(`Đã tải lên ${fileList.length} ảnh thành công`);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setShow(false);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      id,
      name,
      description,
      created_at,
      updated_at,
    };

    addCategory(newProduct);
    setShow(false);

  };

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     const apiUrl = '/api/jobs?_limit=3';
  //     try {
  //       const res = await fetch(apiUrl);
  //       const data = await res.json();
  //       setPro(data);
  //     } catch (error) {
  //       console.log('Error fetching data', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategory();
  // }, []);

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


        {/* <Form.Item
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
        </Form.Item> */}

        {/* <Form.Item
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
        </Form.Item> */}

        {/* <Form.Item
          label="Màu sắc"
          name="color"
       
        >
          
          <Input />
        </Form.Item> */}
        <Form.Item
        label="Danh mục"
        name="category"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
      >
        <Select
          placeholder="Chọn danh mục"
          value={category_id}
        >
          {categoríes.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
        <Form.Item
          label="Mô tả"
          name="descripton"
        >
      
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
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