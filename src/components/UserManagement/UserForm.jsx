import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const UserForm = ({addUser,show,setShow}) => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState([]);
  const [id, setid] = useState('');
  const [username, setUsername] = useState('');
  const [full_name, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email,setEmail]=useState('');
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

    const newuser = {

      username,
      password,
      email,
      full_name,
      address,
      phone_number,
      created_at,
      updated_at,
    };

    addUser(newuser);
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
         <Form.Item
          label="Tên người dùng"
          name="productName"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
        >
          <Input value={id} onChange={(e) => setid(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input value={name} onChange={(e) => setname(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
         
          ]}
        >
          <Input value={price}  onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>


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
          label="Mô tả"
          name="descripton"
        >
      
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
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
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">Lưu</Button>
        </div>
      </Form>
  </Modal>

  );
};

export default UserForm;