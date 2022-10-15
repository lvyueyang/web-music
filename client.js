/** 配置信息 */
const DATA_URL =
  'https://gist.githubusercontent.com/lvyueyang/cb11eaafbe69fc7ba63c38f9ff40e0d9/raw/919f5e8c46bc10962fd3a7bf7ff8a6a8bbbb75ad/jay-music.json';

const coverDom = document.querySelector('#player .cover img');
const audioDom = document.querySelector('#audio');
const listDom = document.querySelector('#list');

let songList = [];
let currentSong = null;
let currentIndex = 0;

/** 创建 歌曲列表 */
function createItemDom(item, index) {
  return `<div class="item" data-cid="${item.cid}" data-index=${index}>
        <div class="index">${index + 1}</div>
        <div class="name">${item.name}</div>
      </div>`;
}

/** 设置播放器内容 */
function setPlayer(item) {
  // 设置封面
  coverDom.setAttribute('src', item.songInfo.picUrl);

  // 设置播放歌曲
  const songUrls = [
    item.songInfo.flac,
    item.songInfo['320'],
    item.songInfo['320'],
  ].filter((item) => !!item);
  audioDom.setAttribute('src', songUrls[0]);
  document
    .querySelectorAll(`#list .active`)
    .forEach((item) => item.classList.remove('active'));
  document
    .querySelector(`#list .item[data-cid="${item.cid}"]`)
    .classList.add('active');
}

/** 拉取歌曲列表 */
function getList() {
  fetch(DATA_URL)
    .then((res) => res.json())
    .then((res) => {
      songList = res.list.map((item) => {
        return {
          ...item,
          songInfo: item.songInfo.value,
        };
      });
      if (!currentSong) {
        currentSong = songList[0];
        currentIndex = 0;
      }
      listDom.innerHTML = songList.map(createItemDom).join('');
      setPlayer(currentSong);
    });
}
getList();

// 点击播放
document.querySelector('#list').addEventListener('click', (e) => {
  let item = null;
  if (e.target.className.includes('item')) {
    item = e.target;
  }
  if (e.target.parentNode.className.includes('item')) {
    item = e.target.parentNode;
  }

  if (item) {
    const cid = item.getAttribute('data-cid');
    // 播放，暂停
    if (currentSong.cid === cid && !audioDom.paused) {
      audioDom.pause();
    } else {
      currentSong = songList.find((item, index) => {
        if (item.cid === cid) {
          currentIndex = index;
        }
        return item.cid === cid;
      });
      setPlayer(currentSong);
      audioDom.play();
    }
  }
});

// 自动播放下一首
audioDom.onended = (e) => {
  if (currentIndex === songList.length - 1) {
    document.querySelector(`#list .item[data-index="0"]`).click();
  } else {
    document
      .querySelector(`#list .item[data-index="${currentIndex + 1}"]`)
      .click();
  }
};

let timer;
// 搜索
document.querySelector('#search input').addEventListener('input', (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    document.querySelectorAll('#list .item').forEach((item) => {
      const name = item.querySelector('.name').innerText.trim();
      if (!name.includes(e.target.value.trim())) {
        item.style.display = 'none';
      } else {
        item.style.display = '';
      }
    });
  }, 500);
});
