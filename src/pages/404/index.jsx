import React from 'react'
import { Result,Button } from 'antd'

function NotFound() {
  return (
    <Result
      status='404'
      title='页面不存在'
      subTitle='对不起，你访问的页面不存在。'
      extra={
        <a href="/">
          <Button type='primary'>回到首页</Button>
        </a>
      }
    />
  )
}

export default NotFound
