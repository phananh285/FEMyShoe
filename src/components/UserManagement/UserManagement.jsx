import React, { useState,useEffect } from 'react';
import {Table } from 'react-bootstrap';
import MainCard from '../Card/MainCard';
import {Button, Form, Input, Switch, Space,Pagination} from 'antd';
import './ProductManagement.css';
import server from 'constant/linkapi';
const ProductManagement = () => {
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false)
  const [showSua, setShowSua] = useState(false)
  const [findID, setfindID] = useState('');
  const [isLoad,setIsLoad]=useState(false);
  const [findName,setfindName]=useState('');
  const [UserStatus,setUserStatus]=useState(true);
    const [pageSize, setPageSize] = useState(1);
      const [currentPage, setCurrentPage] = useState(0);  // Current page number
      const [totalPages, setTotalPages] = useState(0);
      const [totalElements, setTotalElements] = useState(0);  
  // Sample data - replace with your actual data source
  const [Users, setUser] = useState([
  ]);
  useEffect(() => {
    const fetchPro = async () => {
   //sua lại api khi có nhiều người dùng hơn
      const apiUrl =server+`/user?page=0&size=1`;
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Ngrok-Skip-Browser-Warning': 1
          },
        });
        const data = await res.json();
        console.log(data)
        setUserStatus(data.data.data.isActive)
        setUser(data.data.data);
        setTotalPages(data.data.totalPage);
        setTotalElements(data.data.totalElements)
        // setTotalPages(data.data.totalPage);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchPro();
  }, [isLoad]);

//hàm tìm kiếm theo tên
  const funcfindName = async () =>{
    const apiUrl = server+`/user/search?username=${findName}`; // URL tìm kiếm
    try {
      const res = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Ngrok-Skip-Browser-Warning': 1,
        },
      });
      const data = await res.json();
      console.log(data)
      if (data) {
        setUser([data.data]);
        console.log(Users) // Đặt kết quả vào danh sách đơn hàng
      } else {
        console.error("Không tìm thấy người dùng!");
        setUser([]);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm người dùng:", error);
      setUser([]);
    }
  }
//hàm tìm kiếm theo id
const funcfindId = async () =>{
  const apiUrl = server+`/user/${findID}`; // URL tìm kiếm
  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    const data = await res.json();
    console.log(data)
    if (data) {
      setUser([data.data]);
      console.log(Users) // Đặt kết quả vào danh sách đơn hàng
    } else {
      console.error("Không tìm thấy người dùng!");
      setUser([]);
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm người dùng:", error);
    setUser([]);
  }
}

//Reset kết quả tìm kiếm
const resetSearch = async () => {
  // Xóa mã tìm kiếm
  try {
    const apiUrl = server+`/user`; // API danh sách gốc
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    const data = await res.json();
    setUser(data.data.data); // Khôi phục danh sách ban đầu
  } catch (error) {
    console.error("Lỗi khi reset tìm kiếm:", error);
  }
};
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    // Implement Excel file import logic here
    console.log('Importing file:', file);
  };
  
  const ChangePage = async (page, size) => {
    const apiUrl = server + `/user?page=${page-1}&size=${size}`;
    try {
      const res = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Ngrok-Skip-Browser-Warning': 1,
        },
      });
      const data = await res.json();
      setUser(data.data.data);
      setTotalPages(data.data.totalPage);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };
  return (
    <MainCard title="Quản lý người dùng">
      <div className="product-management">
        <div className="management-header">
          <div className="management-actions">
          <Input 
    value={findName}
    onChange={(e) => setfindName(e.target.value)} 
    placeholder="Nhập tên đăng nhập" 
    style={{ width: '250px' }} /* Đặt chiều rộng cho Input */
  />
  <Button 
    className="action-button add-button"
    type="primary"
    onClick={funcfindName} /* Gọi hàm tìm kiếm theo mã */
  >
    Tìm theo tên
  </Button>
  <Input 
    value={findID}
    onChange={(e) => setfindID(e.target.value)} 
    placeholder="Nhập id" 
    style={{ width: '250px' }} /* Đặt chiều rộng cho Input */
  />
  <Button 
    className="action-button add-button"
    type="primary"
    onClick={funcfindId} /* Gọi hàm tìm kiếm theo mã */
  >
    Tìm theo Id
  </Button>

  <Button 
    className="action-button reset-button"
    type="default"
    onClick={resetSearch} /* Gọi hàm reset */
  >
    Đặt lại
  </Button>
          <div >
    
          </div>
      
          </div>
          
        </div>
        <Pagination
          current={currentPage + 1} // Chuyển từ 0-based sang 1-based
          total={totalElements} // Tổng số sản phẩm
          pageSize={1}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={[1]}
          onChange={(page, size) => {
            setCurrentPage(page - 1); // Chuyển từ 1-based sang 0-based
            setPageSize(size);
            ChangePage(page, size);
          }}
          showTotal={(total) => `Total ${total} items`}
        />
        <Table responsive className="product-table">
          <thead>
            <tr>
              <th className='text'>Mã người dùng</th>
              <th>Tên đăng nhập</th>
              <th>Email</th>
              <th>Họ tên</th>
              <th>Avatar</th>
              <th>Ngày tạo</th>
              <th>Tình trạng tài khoản</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((User) => (
              <tr key={User.id}>
                <td>{User.id}</td>
                <td>{User.username}</td>
                <td>{User.email}</td>
                <td>{User.fullName}</td>
                <td><img src={User.avatar}/></td>
                <td>{User.createdAt}</td>
                <td className="action-cell">
 
 <Space direction="vertical">
    <Switch value={User.isActive} onChange={ async () => {
                const newStatus=!User.isActive
                 await fetch(server+`/user/9/status?isActive=${newStatus}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Ngrok-Skip-Browser-Warning': 1,
                  },
                });
                setIsLoad(!isLoad)
                return;
              }} checkedChildren="active" unCheckedChildren="in-active" defaultChecked />

  </Space>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </MainCard>
  );
};

export default ProductManagement;
