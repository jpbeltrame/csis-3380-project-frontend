import './Header.css';
import React, { useState } from 'react';
import { Avatar ,Button,Menu, Layout} from 'antd';
import { Typography } from 'antd';
import { UserOutlined} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const items = [
  getItem('User Name', 'sub1', <Avatar />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ])];


function Header() {
  const routes = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
  ];

  const menuItens = routes.map((r) => <li><a href={r.path}>{r.name}</a></li>);
  const { Title } = Typography;
  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
 
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="header">
      
      <Title style={{ background: "#27024B", color:"white", padding:'4%',fontSize:'40px'}}>BookTrackr
      
      <div
      style={{
        width: 256,
        float:'right'
      }}
    >

      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
    <Avatar onClick={toggleCollapsed} src={<img src={url} />} size={60} style={{float:'right', margin:'5px',backgroundColor: '#87d068'}} icon={<UserOutlined />}>
      <Layout.Sider style={{ background: "#27024B" }}>
      {collapsed ?  <img src='none' />: <Avatar />}
            </Layout.Sider>
            </Avatar>
      </Title>
      
      {/* <ul>
        {menuItens}
      </ul> */}
 
    <div >
      
    </div>
    </div>
    
  );

}

export default Header;
