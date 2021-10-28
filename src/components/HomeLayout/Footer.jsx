import React from 'react'
import FooterConfig from './footer.config'
import { Layout } from 'antd'

function Footer() {
  // 渲染所有底部内容
  const FootItems = () => {
    return FooterConfig.map((item, index) => (
      <FootItem item={item} key={index} />
    ))
  }

  // 每个栏目
  const FootItem = (props) => {
    const { item } = props
    return (
      <div className='footer-item'>
        <div className='bottom-title'>{item.title}</div>
        {item.subItem.map((sub, index) => (
          <FootSubItem subItem={sub} key={index} />
        ))}
      </div>
    )
  }

  // 栏目下的标题项
  const FootSubItem = (props) => {
    const { subItem } = props
    return (
      <a
        href={subItem.url}
        className='bottom-link'
        target='_blank'
        rel='noreferrer'
      >
        {subItem.title}
      </a>
    )
  }

  return (
    <Layout.Footer className='layout-footer'>
      <div className='footer-content'>
        <div className='footer-left'>
          <FootItems />
        </div>
        <div className='footer-right'>
          <div className='bottom-title'>联系我们</div>
          <span className='bottom-link'>合作邮箱：949394048@qq.cn</span>
          <span className='bottom-link'>技术支持：QQ群：198195803</span>
        </div>
      </div>
      <div className='footer-copyright'>
        <span>2021 YNTX Corporation, All Rights Reserved</span>
      </div>
    </Layout.Footer>
  )
}

export default Footer
