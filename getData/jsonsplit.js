const jsonData = require('./jayjsondata')
const fs = require('fs')

// 数据分割
function dataSplice() {
    const jdata = JSON.parse(JSON.stringify(jsonData))
    let datas = []

    function ds(num) {
        if (jdata.length) {
            jdata.push(jdata.splice(0, 40))
            ds(num + 10)
        }
    }

    ds(0)


    datas.forEach((item, i) => {
        fs.writeFile(`./jsonpage/data${i + 1}.json`, JSON.stringify(item, null, 4), (e, res) => {
        })
    })

}

// 歌词分离
function lrcPart() {
    const jdata = JSON.parse(JSON.stringify(jsonData))

    const data = jdata.map(item=>{
        const d = {
            lrc: item.lrc
        }
        fs.writeFile(`./lrcs/${item.songid}.json`, JSON.stringify(d, null, 4), (e, res) => {
        })

        delete item.lrc
        return item
    })
    fs.writeFile(`./jayjsondataNolrc.json`, JSON.stringify(data, null, 4), (e, res) => {
    })
}
lrcPart()
