import React from 'react'
import { Upload, Table, Progress, Popconfirm, Button, message } from 'antd'
import './index.css'
import { PlusCircleFilled, DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
import { getType } from '@utils/convertType'
import UploadLimit from '../../components/UploadLimit'
import download from '../../utils/download'

const { Dragger } = Upload

function Convert(props) {
  const [type, setType] = React.useState({ name: '', description: '', accept: '', exportType: '', downloadUrls: [] })
  const [data, setData] = React.useState([])
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    async function fetchData() {
      // 校验次数
      const response = await fetch('https://wwo.wps.cn/convert/api/ipCount')
      const result = await response.json()
      // setCount(result.count || 0)
    }

    fetchData()

    // 根据路由获取转换类型信息
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
    accept: type.accept,
    showUploadList: false,
    action: 'https://wwo.wps.cn/convert/api/upload',
    onChange: (info) => {
      console.log('info', info)

      const file = info.file
      const { status, response } = info.file

      if (status === 'uploading') {
        // console.log(info.file, info.fileList)
        setData([
          {
            key: file.uid,
            fileName: file.name,
            percent: file.percent,
            downloadUrls: [],
            status: '上传中',
            response: file.response,
          },
        ])
      }

      if (status === 'done') {
        // 文件上传服务端返回结果
        console.log('response', response)

        setData([
          {
            key: file.uid,
            fileName: file.name,
            percent: file.percent,
            downloadUrls: [],
            status: '上传完成',
            response: file.response,
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
            response: file.response,
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
            // strokeColor={{
            //   '0%': '#108ee9',
            //   '100%': '#87d068',
            // }}
            percent={text}
            size='small'
            style={{ width: 200, fontSize: 14 }}
            status={record.status.indexOf('失败') === -1 ? '' : 'exception'}
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
              <DownloadOutlined style={{ fontSize: 18, marginRight: 12 }} onClick={() => handleDownload()} />
            )}

            <Popconfirm title='确定删除?' okText='是' cancelText='否' onConfirm={() => handleDelete(record.key)}>
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
  const handleDownload = () => {
    if (data && data.length > 0) {
      if (data[0] && data[0].downloadUrls && data[0].downloadUrls.length > 0) {
        const { downloadUrls, fileName } = data[0]
        const url = downloadUrls[0]
        // 文件下载，创建a标签点击
        const downloadTag = document.createElement('a')
        downloadTag.style.display = 'none'
        downloadTag.href = url
        downloadTag.download = fileName.replace(/.[^/.]+$/, '.pdf')
        document.body.appendChild(downloadTag)
        downloadTag.click()
        document.body.removeChild(downloadTag)
      }
    }
  }

  // 处理开始转换
  const handleConvert = async () => {
    const convertFile = data[0]
    setData([{ ...convertFile, percent: 0, status: '转换中' }])

    // 请求转换 https://wwo.wps.cn/convert/api/fileconvert
    // const url = 'https://wwo.wps.cn/convert/api/fileconvert'
    // const param = {
    //   taskId: data[0].response.taskId,
    //   taskId: data[0].response.taskId,
    //   srcUri: data[0].response.ks3DownloadUrls[0],
    //   fileName: data[0].response.taskId,
    //   exportType: type.exportType
    // }
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    //   body: JSON.stringify(param),
    // })
    // const json = await response.json()
    // // {"status":"success","data":{"Code":"OK"}}
    // console.log('转换结果', json);

    // 查询转换结果
    const intervalFetch = setInterval(async () => {
      const response = convertFile.response
      // const response1 = await fetch('https://wwo.wps.cn/convert/api/getfile/' + response.taskId)
      const response1 = await fetch('https://wwo.wps.cn/convert/api/getfile/7821635745038734583.pptx')
      const json1 = await response1.json()
      const { result, code, downloadUrls } = json1

      if (result === 'fail') {
        if (code === 2) {
          setData([{ ...convertFile, response, percent: 50, status: '转换失败' }])
          // ip超限
          message.error('超出IP次数限制')
          clearInterval(intervalFetch)
          return
        }

        setData([{ ...convertFile, percent: 0, response, status: '转换中' }])
      } else if (result === 'success') {
        console.log('json1', json1)
        console.log('downloadUrls', downloadUrls)

        setData([{ ...convertFile, downloadUrls, percent: 100, status: '转换完成' }])

        clearInterval(intervalFetch)
      }
    }, 1000)
  }

  return (
    <div className='des-content'>
      <h1 className='transform-title'>{type['name']}</h1>
      <p className='transform-des'>{type['description']}</p>
      <div>
        {count < 3 && (
          // 上传文件
          <div id='file-upload' style={{ display: data.length < 1 ? 'block' : 'none' }}>
            <span>
              <Dragger {...uploadProps}>
                <p className='ant-upload-drag-icon'>
                  <PlusCircleFilled className='pluscircle-icon' />
                </p>
                <p className='ant-upload-text'>选择文件</p>
              </Dragger>
            </span>
          </div>
        )}

        {count < 3 && (
          // 文件列表
          <div id='upload-list' style={{ display: data.length >= 1 ? 'block' : 'none' }}>
            <Table columns={columns} dataSource={data} pagination={false} />

            <div>
              {data.length > 0 && data[0].status === '上传完成' && (
                <Button className='transform-button' type='primary' onClick={() => handleConvert()}>
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
                  <Button className='transform-button' type='primary' onClick={() => handleDownload()}>
                    立即下载
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        {/* 超出限制 */}
        {count >= 3 && <UploadLimit />}
        <Button className='transform-button' type='primary' onClick={() => handleDownload()}>
          立即下载
        </Button>
      </div>
    </div>
  )
}

export default Convert
