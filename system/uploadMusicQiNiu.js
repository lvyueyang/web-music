const qiniu = require('qiniu')
const path = require('path')
const fs = require('fs')
const CONFIG = require('./CONFIG.js')
// 生成凭证
const mac = new qiniu.auth.digest.Mac(CONFIG.ACCESS_KEY, CONFIG.SECRET_KEY)
const putPolicy = new qiniu.rs.PutPolicy({
    scope: CONFIG.bucket
})
const uploadToken = putPolicy.uploadToken(mac)

// 添加配置
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z1

// 表单上传
function uploadMusic(filePath, key) {
    return new Promise((resolve, reject) => {
        const formUploader = new qiniu.form_up.FormUploader(config)
        const putExtra = new qiniu.form_up.PutExtra()
        formUploader.putFile(uploadToken, key, filePath, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr)
            }
            if (respInfo.statusCode === 200) {
                resolve(respBody)
            } else {
                console.log(respInfo.statusCode)
                console.log(respBody)
                reject(respInfo)
            }
        })
    })
}

// 获取文件列表
const files = fs.readdirSync('./downloadFiles')

// 上传
let num = 0
async function uploadFn() {
    const key = files[num]
    num += 1
    if (num > files.length) {
        return false
    }
    try {
        await uploadMusic(path.join('./downloadFiles', key), key)
        console.log(`${key} 上传成功`)
    } catch (e) {
        console.log('\n')
        console.log('---------------------------')
        console.error(`|    ${key} 上传失败   |`)
        console.log('---------------------------')
        console.log('\n')
    }
    uploadFn(num)
}

uploadFn()
