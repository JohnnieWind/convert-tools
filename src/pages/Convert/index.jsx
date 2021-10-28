import React from 'react'
import { Upload, Table, Progress, Popconfirm, Button } from 'antd'
import './index.css'
import { PlusCircleFilled, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { getType } from '@utils/convertType'

const { Dragger } = Upload;

const uploadProps = {
  accept: '.doc,.dot,.wps, .wpt, .docx, .dotx, .docm, .dotm, .txt, .wpss, .lrc, .c, .cpp, .h, .asm, .s, .java, .asp, .bat, .bas, .prg, .cmd, .rtf, , .log, .xml, .htm, .html',
  showUploadList: false,
}

function Convert(props) {

  const [type, setType] = React.useState({ name: '', description: '' })
  const [isUploaded, setIsUploaded] = React.useState(true)
  const [data, setData] = React.useState([
    {
      key: '1',
      fileName: 'index.txt',
      progress: '上传完成'
    }
  ])


  React.useEffect(() => {
    const { path } = props.match.params
    const type = getType(path)
    if (type === undefined) {
      props.history.push('/404')
      return
    }
    setType(type);
  }, [])

  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      align: 'center',
    },
    {
      title: '进度栏',
      dataIndex: 'progress',
      key: 'progress',
      align: 'center',
      render: (text) =>
        <div>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={100}
            size='small'
            style={{ width: 200, fontSize: 14 }}
          // status='active'
          />
          <span style={{ fontSize: 14, marginLeft: 8 }}>{text}</span>
        </div>
    },
    {
      title: '操作栏',
      dataIndex: '',
      key: 'action',
      align: 'center',
      render: (_, record) =>
        data.length >= 1 ? (
          <div>
            <DownloadOutlined style={{ fontSize: 18, marginRight: 12 }} onClick={() => handleDownload()} />
            <Popconfirm title='确定删除?' okText='是' cancelText='否' onConfirm={() => handleDelete(record.key)}>
              <DeleteOutlined style={{ fontSize: 18 }} />
            </Popconfirm>
          </div>
        ) : null,
    }
  ]

  // 处理删除
  const handleDelete = (key) => {
    console.log(key);
    // setIsUploaded(false)
    // 暂时全删
    setData([])
  }

  // 处理重新开始
  const handleRestart = () => {
    // setIsUploaded(false)
    setData([])
  }

  // 处理下载
  const handleDownload = () => {

  }

  return (
    <div className='des-content'>
      <h1 className='transform-title'>{type['name']}</h1>
      <p className="transform-des">{type['description']}</p>
      <div>
        {/* 上传文件 */}
        <div id="file-upload" style={{ display: isUploaded ? 'block' : 'none' }}>
          <span>
            <Dragger {...uploadProps} >
              <p className="ant-upload-drag-icon">
                <PlusCircleFilled className='pluscircle-icon' />
              </p>
              <p className="ant-upload-text">选择文件</p>
            </Dragger>
          </span>
        </div>

        {/* 文件列表 */}
        <div id='upload-list' style={{ display: isUploaded ? 'block' : 'none' }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          />

          <div>
            <Button className='transform-button' type='primary' onClick={() => handleRestart()} style={{ marginRight: 30 }}>重新开始</Button>
            <Button className='transform-button' type='primary' onClick={() => handleDownload()}> 立即下载</Button>
          </div>
        </div>

      </div>
    </div >
  )
}

export default Convert
