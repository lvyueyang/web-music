const request = require('request')
const fs = require('fs')
const path = require('path')
let list = require('./musicList.json') || []

/*
* 歌曲下载
* */
function downloadFile(item, callback) {
    const uri = item.url
    const name = `${item.songid}.${uri.split('?')[0].split('com/')[1].split('.')[1]}`
    const stream = fs.createWriteStream(path.join(`./downloadFiles/${name}`))
    request(uri)
        .pipe(stream)
        .on('close', () => {
            callback ? callback(null) : true
        })
        .on('error', e => {
            callback ? callback(e) : true
        })
}

/**
 * 下载队列
 * @param {Number} max @default 5 -最大并行下载数
 * @param {Array} list            -下载列表
 *
 * state not : 未下载; loading : 下载中; done : 下载完成
 * */

function downloadQueue(list, max) {
    for (let i of list) {
        i.state = 'not'
    }
    // 是否下载完成
    let allDone = false

    const down = () => {
        let noIndex = null
        let notDownload = null

        for (let i = 0; i < list.length; i++) {
            const item = list[i]
            if (item.state === 'not') {
                notDownload = item
                noIndex = i
                break
            }
        }

        if (!notDownload) {
            console.log('全部下载完毕')
            allDone = true
            return
        }

        const downLoadings = list.filter(item => item.state === 'loading')
        if (downLoadings.length >= max) {
            return
        }
        notDownload.state = 'loading'
        console.log(`下载第 ${noIndex} 个`)
        down()
        // 执行下载
        downloadFile(notDownload, (e) => {
            if (e) {
                console.log('\n')
                console.log('---------------------------')
                console.error(`|    ${notDownload.title} 下载失败   |`)
                console.log('---------------------------')
                console.log('\n')
                console.error(e)
            } else {
                console.log(`${notDownload.title} 下载完成`)
            }
            list[noIndex].state = 'done'
            if (allDone) {
                return
            }
            down()
        })
    }
    down()
}

downloadQueue(list, 5)
