import React from 'react';

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
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          badge: {
            title: 'New',
            type: 'label-danger'
          },
          children: [
            {
              id: 'signup-1',
              title: 'Sign up',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'signin-1',
              title: 'Sign in',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
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
          title: 'Thống kê số lượng bán ra',
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
