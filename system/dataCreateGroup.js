const fse = require('fs-extra');
let musicData = require('./musicList.json');
const musicFiles = fse.readdirSync('./downloadFiles');

// 对数据分组，10个一组
let obj = {};
musicFiles.forEach((item, index) => {
    const y = (index / 10).toString().split('.')[0];
    if (!obj[y]) {
        obj[y] = [];
    }
    obj[y].push(item);
})

function dataItemAddPath(name, i) {
    let id = name.split('.')[0];
    musicData.forEach((item, index) => {
        if (item.songid === id) {
            musicData[index].path = `${i}/${name}`;
        }
    })
}

console.log('文件拷贝中');
for (let i in obj) {
    const item = obj[i];
    fse.ensureDirSync(`./musicGroup/${i}`);
    item.forEach(v => {
        fse.copySync(`./downloadFiles/${v}`, `./musicGroup/${i}/${v}`);
        dataItemAddPath(v, i);
    })
}
fse.writeJSONSync('./musicList.json', musicData);
console.log('拷贝完成');
