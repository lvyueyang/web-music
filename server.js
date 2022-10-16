const miguMusic = require('migu-music-api').default;
const { Octokit } = require('@octokit/core');

if (!process.env.GITHUB_TOKEN) {
  throw new Error('缺少环境变量: GITHUB_TOKEN');
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

function main() {
  console.log('开始获取');
  return getAllData()
    .then((d) => {
      const data = { list: d, errData: d.filter((item) => !item.songInfo) };
      if (d.length < 360) {
        console.log('歌曲数据不全，不推送');
        throw new Error('歌曲数据不全');
      }
      updateData(data)
        .then((res) => {
          console.log('更新完成', res);
        })
        .catch((e) => {
          console.error('更新失败', e);
        });
    })
    .catch((e) => {
      console.error('更新失败', e);
    })
    .finally(() => {
      console.log('结束');
    });
}

main();

/** 将数据更新到 gist */
function updateData(data) {
  return octokit.request('PATCH /gists/cb11eaafbe69fc7ba63c38f9ff40e0d9', {
    gist_id: 'GIST_ID',
    description: new Date(),
    files: {
      'jay-music.json': {
        content: JSON.stringify(data),
      },
    },
  });
}

/** 数组切割 */
function arraySlice(arr, total = 10) {
  let newArr = [];

  function loop(start = 0, end = total) {
    const _arr = arr.slice(start, end);
    if (arr.length) {
      newArr.push(_arr);
    }
    if (end <= arr.length) {
      loop(end, end + total);
    }
  }
  loop();
  return newArr;
}

/** 获取全部歌曲列表 */
function getAllSongs() {
  const list = [];
  return new Promise((resolve) => {
    function loop(pageNo = 1) {
      miguMusic('singer/songs', { id: 112, pageNo })
        .then((data) => {
          list.push(...(data.list || []));
          if (data.totalPage < 20) {
            resolve(list);
          } else {
            loop(pageNo + 1);
          }
        })
        .catch((e) => {
          console.error(`第 ${pageNo} 页获取失败`);
          loop(pageNo + 1);
        });
    }
    loop();
  });
}

/** 获取歌曲信息 */
function getSongInfo(cid) {
  return miguMusic('song', { cid });
}

/** 整合成一个完整的 json */
function getAllData() {
  return new Promise((resolve) => {
    console.log('获取全部歌曲');
    getAllSongs().then((data) => {
      console.log('获取完成');
      const sliceList = arraySlice(data);

      function loop(current = 0) {
        Promise.allSettled(
          sliceList[current].map(({ cid }) => getSongInfo(cid)),
        ).then((resList) => {
          resList.forEach((d, ind) => {
            const currentSong = sliceList[current][ind];
            if (d.status === 'fulfilled') {
              currentSong.songInfo = d.value;
            } else {
              console.log(
                `歌曲信息获取失败:  cid={${currentSong.cid}}  name={${currentSong.name}}`,
              );
            }
          });
          const nextCurrent = current + 1;
          if (nextCurrent === sliceList.length) {
            resolve(sliceList.flat());
          } else {
            loop(nextCurrent);
          }
        });
      }
      loop();
    });
  });
}
