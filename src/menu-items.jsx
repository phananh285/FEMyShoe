import React,{useState} from 'react';

const menuItems = {

  items: [


    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'auth',
          title: 'Tài khoản',
          type: 'collapse',
          icon: 'feather icon-lock',
          badge: {
            title: 'New',
            type: 'label-danger'
          },
          children: [
            {
              id: 'logout',
              title: 'Đăng Xuất',
              type: 'item',
              url:'/ConfirmLogOut',
              icon: 'feather icon-log-out',
              breadcrumbs: false
            },
          ]
        },
        {
          id: 'UserManagement',
          title: 'Quản lý người dùng',
          type: 'item',
          url: '/UserManagement',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'sample-page',
          title: 'Quản lý sản phẩm',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'OrderCheck',
          title: 'Xem danh sách đơn hàng',
          type: 'item',
          url: '/OrderCheck',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'CategoryManagement',
          title: 'Quản lý danh mục',
          type: 'item',
          url: '/CategoryManagement',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'ProductStat',
          title: 'Thống kê',
          type: 'item',
          url: '/ProductStat',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
      ]
    }
  ]
};

export default menuItems;
