const convertNameMap = {
  // 转pdf
  word2pdf: {
    name: 'Word转PDF',
    description: '在线将word转为pdf'
  },
  excel2pdf: {
    name: 'Excel转PDF',
    description: '在线将excel转为pdf'
  },
  ppt2pdf: {
    name: 'PPT转PDF',
    description: '在线将ppt转为pdf'
  },
  jpg2pdf: {
    name: 'JPG转PDF',
    description: '在线将jpg转为pdf'
  },
  // 转图片
  word2jpg: {
    name: 'Word转JPG',
    description: '在线将word转为jpg'
  },
  excel2jpg: {
    name: 'Excel转JPG',
    description: '在线将excel转为jpg'
  },
  ppt2jpg: {
    name: 'PPT转JPG',
    description: '在线将ppt转为jpg'
  },
  pdf2jpg: {
    name: 'PDF转JPG',
    description: '在线将pdf转为jpg'
  },
  word2png: {
    name: 'Word转PNG',
    description: '在线将word转为png'
  },
  excel2png: {
    name: 'Excel转PNG',
    description: '在线将excel转为png'
  },
  ppt2png: {
    name: 'PPT转PNG',
    description: '在线将ppt转为png'
  },
  pdf2png: {
    name: 'PDF转PNG',
    description: '在线将pdf转为png'
  },
  // 转文本
  word2txt: {
    name: 'Word转TXT',
    description: '在线将word转为txt'
  },
  excel2txt: {
    name: 'Excel转TXT',
    description: '在线将excel转为txt'
  },
  ppt2txt: {
    name: 'PPT转TXT',
    description: '在线将ppt转为txt'
  },
  pdf2txt: {
    name: 'PDF转TXT',
    description: '在线将jpg转为txt'
  },
}

export const getType = (typeKey) => {
  let type = convertNameMap[typeKey]
  return type
}

