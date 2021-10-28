import React from 'react'
import { Upload, Table, Progress, Popconfirm, Button, message } from 'antd'
import './index.css'
import {
  PlusCircleFilled,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import { getType } from '@utils/convertType'

const { Dragger } = Upload

function Convert(props) {
  const [type, setType] = React.useState({ name: '', description: '' })
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const { path } = props.match.params
    const type = getType(path)
    if (type === undefined) {
      props.history.push('/404')
      return
    }
    setType(type)
  }, [])

  // 上传参数
  const uploadProps = {
    name: 'file',
    multiple: false,
    accept:
      '.doc,.dot,.wps, .wpt, .docx, .dotx, .docm, .dotm, .txt, .wpss, .lrc, .c, .cpp, .h, .asm, .s, .java, .asp, .bat, .bas, .prg, .cmd, .rtf, , .log, .xml, .htm, .html',
    showUploadList: false,
    action: 'https://wwo.wps.cn/convert/api/upload',
    onChange: (info) => {
      const file = info.file
      const { status } = info.file
      if (status === 'uploading') {
        // console.log(info.file, info.fileList)
        setData([
          {
            key: file.uid,
            fileName: file.name,
            percent: file.percent,
            downloadUrls: [],
            status: '上传中',
          },
        ])
      }
      if (status === 'done') {
        setData([
          {
            key: file.uid,
            fileName: file.name,
            percent: file.percent,
            downloadUrls: [],
            status: '上传完成',
          },
        ])
        message.success(`${info.file.name}上传成功`)
      } else if (status === 'error') {
        setData([
          {
            key: file.uid,
            fileName: file.name,
            percent: file.percent,
            downloadUrls: [],
            status: '上传失败',
          },
        ])
        message.error(`${info.file.name}上传失败`)
      }
    },
    onDrop: (e) => {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      align: 'center',
    },
    {
      title: '进度栏',
      dataIndex: 'percent',
      key: 'percent',
      align: 'center',
      render: (text, record) => (
        <div>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={text}
            size='small'
            style={{ width: 200, fontSize: 14 }}
            // status='active'
          />
          <span style={{ fontSize: 14, marginLeft: 8 }}>{record.status}</span>
        </div>
      ),
    },
    {
      title: '操作栏',
      dataIndex: '',
      key: 'action',
      align: 'center',
      render: (_, record) =>
        data.length >= 1 ? (
          <div>
            {data.length >= 1 && data[0].status === '转换完成' && (
              <DownloadOutlined
                style={{ fontSize: 18, marginRight: 12 }}
                onClick={() => handleDownload()}
              />
            )}

            <Popconfirm
              title='确定删除?'
              okText='是'
              cancelText='否'
              onConfirm={() => handleDelete(record.key)}
            >
              <DeleteOutlined style={{ fontSize: 18 }} />
            </Popconfirm>
          </div>
        ) : null,
    },
  ]

  // 处理删除
  const handleDelete = (key) => {
    console.log(key)
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
  const handleDownload = () => {}

  // 处理开始转换
  const handleConvert = () => {
    const convertFile = data[0]
    setData([{ ...convertFile, percent: 0, status: '转换中' }])
    // 请求转换
    setTimeout(() => {
      setData([{ ...convertFile, percent: 100, status: '转换完成' }])
      message.success(`${convertFile.fileName}转换完成`)
    }, 3000)
  }

  return (
    <div className='des-content'>
      <h1 className='transform-title'>{type['name']}</h1>
      <p className='transform-des'>{type['description']}</p>
      <div>
        {/* 上传文件 */}
        <div
          id='file-upload'
          style={{ display: data.length < 1 ? 'block' : 'none' }}
        >
          <span>
            <Dragger {...uploadProps}>
              <p className='ant-upload-drag-icon'>
                <PlusCircleFilled className='pluscircle-icon' />
              </p>
              <p className='ant-upload-text'>选择文件</p>
            </Dragger>
          </span>
        </div>

        {/* 文件列表 */}
        <div
          id='upload-list'
          style={{ display: data.length >= 1 ? 'block' : 'none' }}
        >
          <Table columns={columns} dataSource={data} pagination={false} />

          <div>
            {data.length > 0 && data[0].status !== '转换完成' && (
              <Button
                className='transform-button'
                type='primary'
                onClick={() => handleConvert()}
              >
                开始转换
              </Button>
            )}

            {data.length > 0 && data[0].status === '转换完成' && (
              <>
                <Button
                  className='transform-button'
                  type='primary'
                  onClick={() => handleRestart()}
                  style={{ marginRight: 30 }}
                >
                  重新开始
                </Button>
                <Button
                  className='transform-button'
                  type='primary'
                  onClick={() => handleDownload()}
                >
                  立即下载
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Convert
