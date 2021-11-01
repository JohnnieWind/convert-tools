const convertNameMap = {
  // 转pdf
  word2pdf: {
    name: 'Word转PDF',
    description: '在线将word转为pdf',
    // accept: '.doc,.dot,.wps, .wpt, .docx, .dotx, .docm, .dotm, .txt, .wpss, .lrc, .c, .cpp, .h, .asm, .s, .java, .asp, .bat, .bas, .prg, .cmd, .rtf, , .log, .xml, .htm, .html',
    accept: '.doc,.docx',
    exportType: 'pdf',
  },
  excel2pdf: {
    name: 'Excel转PDF',
    description: '在线将excel转为pdf',
    accept: '.xls,.xlt,.et,.ett, .xlsx, .xltx, .csv, .xlsb, .xlsm, .xltm, .ets',
    exportType: 'pdf',
  },
  ppt2pdf: {
    name: 'PPT转PDF',
    description: '在线将ppt转为pdf',
    accept: '.pptx, .ppt, .pot, .potx, .pps, .ppsx, .dps, .dpt, .pptm, .potm, .ppsm, .dpss',
    exportType: 'pdf',
  },
  jpg2pdf: {
    name: 'JPG转PDF',
    description: '在线将jpg转为pdf',
    accept: '.jpg',
    exportType: 'pdf',
  },
  // 转图片
  word2jpg: {
    name: 'Word转JPG',
    description: '在线将word转为jpg',
    accept: '.doc,.dot,.wps, .wpt, .docx, .dotx, .docm, .dotm, .txt, .wpss, .lrc, .c, .cpp, .h, .asm, .s, .java, .asp, .bat, .bas, .prg, .cmd, .rtf, , .log, .xml, .htm, .html',
    exportType: 'jpg',
  },
  excel2jpg: {
    name: 'Excel转JPG',
    description: '在线将excel转为jpg',
    accept: '.xls,.xlt,.et,.ett, .xlsx, .xltx, .csv, .xlsb, .xlsm, .xltm, .ets',
    exportType: 'jpg',
  },
  ppt2jpg: {
    name: 'PPT转JPG',
    description: '在线将ppt转为jpg',
    accept: '.pptx, .ppt, .pot, .potx, .pps, .ppsx, .dps, .dpt, .pptm, .potm, .ppsm, .dpss',
    exportType: 'jpg',
  },
  pdf2jpg: {
    name: 'PDF转JPG',
    description: '在线将pdf转为jpg',
    accept: '.pdf',
    exportType: 'jpg',
  },
  word2png: {
    name: 'Word转PNG',
    description: '在线将word转为png',
    accept: '.doc,.dot,.wps, .wpt, .docx, .dotx, .docm, .dotm, .txt, .wpss, .lrc, .c, .cpp, .h, .asm, .s, .java, .asp, .bat, .bas, .prg, .cmd, .rtf, , .log, .xml, .htm, .html',
    exportType: 'png',
  },
  excel2png: {
    name: 'Excel转PNG',
    description: '在线将excel转为png',
    accept: '.xls,.xlt,.et,.ett, .xlsx, .xltx, .csv, .xlsb, .xlsm, .xltm, .ets',
    exportType: 'png',
  },
  ppt2png: {
    name: 'PPT转PNG',
    description: '在线将ppt转为png',
    accept: '.pptx, .ppt, .pot, .potx, .pps, .ppsx, .dps, .dpt, .pptm, .potm, .ppsm, .dpss',
    exportType: 'png',
  },
  pdf2png: {
    name: 'PDF转PNG',
    description: '在线将pdf转为png',
    accept: '.pdf',
    exportType: 'png',
  },
  // 转文本
  word2txt: {
    name: 'Word转TXT',
    description: '在线将word转为txt',
    accept: '.doc,.dot,.wps, .wpt, .docx, .dotx, .docm, .dotm, .txt, .wpss, .lrc, .c, .cpp, .h, .asm, .s, .java, .asp, .bat, .bas, .prg, .cmd, .rtf, , .log, .xml, .htm, .html',
    exportType: 'txt',
  },
  excel2txt: {
    name: 'Excel转TXT',
    description: '在线将excel转为txt',
    accept: '.xls,.xlt,.et,.ett, .xlsx, .xltx, .csv, .xlsb, .xlsm, .xltm, .ets',
    exportType: 'txt',
  },
  ppt2txt: {
    name: 'PPT转TXT',
    description: '在线将ppt转为txt',
    accept: '.pptx, .ppt, .pot, .potx, .pps, .ppsx, .dps, .dpt, .pptm, .potm, .ppsm, .dpss',
    exportType: 'txt',
  },
  pdf2txt: {
    name: 'PDF转TXT',
    description: '在线将jpg转为txt',
    accept: '.pdf',
    exportType: 'txt',
  },
}

export const getType = (typeKey) => {
  let type = convertNameMap[typeKey]
  return type
}

