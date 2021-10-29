import React from 'react'
import { Layout, Menu } from 'antd'
import './index.css'
import { CaretDownOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom'
import Home from '@pages/Home'
import Convert from '@pages/Convert'
import NotFound from '@pages/404'
// import Logo from '@components/Logo'
import LogoPNG from '@assets/image/logo.png'
import Footer from './Footer'

const { Content } = Layout
const { SubMenu } = Menu


function HomeLayout(props) {

  const handleClick = (e) => {
    // 获取点击菜单
    const { key } = e
    props.history.push('/convert/' + key)
  }

  const SubMenuTitleWrapper = (p) => {
    return (
      <span className='submenu-title-wrapper'>
        {p.children}
        <CaretDownOutlined style={{ marginLeft: 4 }} />
      </span>
    )
  }

  return (
    <Layout className='layout-container'>
      <div className='home-header'>
        <div className='home-content'>
          <a className='logo' href='/' >
            <img src={LogoPNG} className='logo-img' alt='logo-img' />
            {/* <Logo className="logo-img" /> */}
            <p className='logo-title'>文档格式转换</p>
          </a>

          <Menu
            className='header-menu'
            onClick={(e) => handleClick(e)}
            selectedKeys={[]}
            mode='horizontal'
          >
            <SubMenu
              key='2pdf'
              title={<SubMenuTitleWrapper>转为PDF</SubMenuTitleWrapper>}
              popupOffset={[-50, -5]}
            >
              <Menu.Item key='word2pdf'>Word转PDF</Menu.Item>
              <Menu.Item key='excel2pdf'>Excel转PDF</Menu.Item>
              <Menu.Item key='ppt2pdf'>PPT转PDF</Menu.Item>
              <Menu.Item key='jpg2pdf'>JPG转PDF</Menu.Item>
            </SubMenu>
            {/* <SubMenu
              key='2image'
              title={<SubMenuTitleWrapper>图片转换</SubMenuTitleWrapper>}
              popupOffset={[-50, -5]}
            >
              <Menu.Item key='word2jpg'>Word转JPG</Menu.Item>
              <Menu.Item key='excel2jpg'>Excel转JPG</Menu.Item>
              <Menu.Item key='ppt2jpg'>PPT转JPG</Menu.Item>
              <Menu.Item key='pdf2jpg'>PDF转JPG</Menu.Item>
              <Menu.Item key='word2PNG'>Word转PNG</Menu.Item>
              <Menu.Item key='excel2PNG'>Excel转PNG</Menu.Item>
              <Menu.Item key='ppt2PNG'>PPT转PNG</Menu.Item>
              <Menu.Item key='pdf2PNG'>PDF转PNG</Menu.Item>
            </SubMenu>
            <SubMenu
              key='2txt'
              title={<SubMenuTitleWrapper>文本转换</SubMenuTitleWrapper>}
              popupOffset={[-50, -5]}
            >
              <Menu.Item key='word2txt'>Word转TXT</Menu.Item>
              <Menu.Item key='excel2txt'>Excel转TXT</Menu.Item>
              <Menu.Item key='ppt2txt'>PPT转TXT</Menu.Item>
              <Menu.Item key='pdf2txt'>PDF转TXT</Menu.Item>
            </SubMenu> */}
          </Menu>
        </div>
      </div>
      {/* 内容区 加上key后让组件刷新*/}
      <Content className='layout-content' key={props.location.key}>
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/convert/:path' exact component={Convert} />
            <Route path='/404' exact component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Content>
      {/* 底部区 */}
      <Footer />
    </Layout>
  )
}

export default withRouter(HomeLayout)
