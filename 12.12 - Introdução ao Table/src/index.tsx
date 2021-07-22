import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <React.StrictMode>
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
        >
          {new Array(5).fill(null).map((_, index) => {
            const key = index + 1;
            return (
              <Menu.Item
                key={key}
              >{`item ${key}`}</Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className='site-layout-content'>
          <App />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        AlgaWorks &copy; 2021
      </Footer>
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
