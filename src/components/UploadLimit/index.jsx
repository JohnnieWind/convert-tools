import React from 'react'
import { Button } from 'antd'
import './index.css'

function UploadLimit() {
  return (
    <div id='upload-limit'>
      <div style={{ padding: 42 }}>
        <h1 className='limit-h1'>今日体验次数已用完</h1>
        <p className='limit-p'>需要继续使用文档转换服务，请联系与你同行管理员，您将获得不受限制的转换服务。</p>
        <Button type='primary' className='limit-button'>立即联系</Button>
      </div>
    </div>
  )
}

export default UploadLimit
