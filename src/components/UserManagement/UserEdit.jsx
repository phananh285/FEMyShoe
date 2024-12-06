import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const ProductEdit = ({selectedUser, UpdateUser,showSua,setShowSua}) => {
  const [imageList, setImageList] = useState([]);
  const [password, setPassword] = useState([]);
  const [id, setid] = useState(selectedUser);
  const [username, setUsername] = useState('');
  const [full_name, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email,setEmail]=useState('');
  const [created_at,setCreatedate] = useState('');
  const [updated_at, setUpdateddate] = useState('');
  const [form] = Form.useForm();
  const [categoríes,setCategory]=useState([
    {id:1,name:'Category 1'},
    {id:2,name:'Cate2'}
  ]);
  console.log('Selected Product:', id);     

  const { Option } = Select;
  // Xử lý upload ảnh
  // const handleImageUpload = ({ fileList }) => {
  //   setImageList(fileList);
  //   if (fileList.length > 0) {
  //     message.success(`Đã tải lên ${fileList.length} ảnh thành công`);
  //   }
  // };
  const handleCancel = () => {
    form.resetFields();
    setShowSua(false);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const updateUser = {
      id,
      username,
      password,
      email,
      full_name,
      address,
      phone_number,
      created_at,
      updated_at,
    };

    UpdateUser(updateUser);
    setShowSua(false);
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
          label="User name"
          name="Username"
          rules={[{ required: true, message: 'Vui lòng nhập user name!' }]}
        >
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="password"
          name="passửod"
          rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
        >
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="hovaten"
          rules={[
            { required: true, message: 'Vui lòng nhập họ và tên!' },
         
          ]}
        >
          <Input value={full_name}  onChange={(e) => setFullname(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="descripton"
        >
      
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="sdt"
        >
      
          <Input value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="Address"
        >
      
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
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