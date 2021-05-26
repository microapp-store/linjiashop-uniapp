import config from "@/common/config.js"

/**
 * 拼接图片地址
 * @param {String} idFile 
 * @returns {String} 完整的图片地址
 */
export default function getImgPath (idFile) {
  return `${config.baseApi}/file/getImgStream?idFile=${idFile}`
}
