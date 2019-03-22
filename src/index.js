import html2canvas from 'html2canvas'

/**
* @name: canvas 转 base64
* @param: canvas 静态地图
*/
function downCanvas (canvas) {
  const test = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/)
  const isIE = test ? !!test[1] : false
  const url = canvas.toDataURL()
  const fName = new Date().getTime()
  if (isIE) {
    const img = url.replace(/^data:image\/png;base64,/, '')
    const byteString = window.atob(img)
    const buffer = new ArrayBuffer(byteString.length)
    const intArray = new Uint8Array(buffer)
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i)
    }
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new window.Blob([intArray], { type: 'image/png' }), `${fName}.png`)
    }
  } else {
    const alink = document.createElement('a')
    if ('download' in alink) {
      alink.setAttribute('download', fName)
    } else {
      alink.setAttribute('target', '_blank')
    }
    alink.href = url
    const evt = document.createEvent('MouseEvents')
    evt.initEvent('click', true, true)
    alink.dispatchEvent(evt)
  }
}

/**
 * @name:  剪裁
 * @param : canvas:切片,rectangle:Array[pixel], lineWidth:线宽
 * @return : 剪裁后的canvas
 */
function cutShape (canvas, rectangle, lineWidth = 0) {
  // 左上角
  let min = rectangle[0]
  // 右下角
  let max = rectangle[1]
  // 去掉边框
  let width = max[0] - min[0] - 2 * lineWidth
  let height = max[1] - min[1] - 2 * lineWidth
  // 裁剪
  let cutData = canvas.getContext('2d').getImageData(min[0] + lineWidth, min[1] + lineWidth, width, height)
  // imgData数据写入新的canvas
  let newCanvas = document.createElement('canvas')
  newCanvas.width = width
  newCanvas.height = height
  newCanvas.getContext('2d').putImageData(cutData, 0, 0, 0, 0, width, height)
  return newCanvas
}

/**
 * @name: html2canvas 生成静态地图
 * @param: domId 地图容器 dom id
 */
export function toCanvas (domId, { rect, borderWidth } = {}) {
  return new Promise((resolve, reject) => {
    html2canvas(document.getElementById(domId), {
      useCORS: true,
      logging: false
    }).then(canvas => {
      if (rect instanceof Array && rect.length === 2) {
        let newCanvas = cutShape(canvas, rect, borderWidth)
        resolve(newCanvas)
      } else {
        resolve(canvas)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * @name: html2canvas 生成静态地图并下载
 * @param: domId 地图容器 dom id
 */
export function down (domId, { rect, borderWidth } = {}) {
  toCanvas(domId, { rect, borderWidth }).then(canvas => downCanvas(canvas))
}
