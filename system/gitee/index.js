const shell = require('shelljs');
shell.cd('../musicGroup');

function push(index) {
    console.log(`提交至仓库jayMusic${index}`);
    shell.cd(`./${index}`);
    shell.exec(`git init`);
    shell.exec(`git add .`);
    shell.exec(`git commit -m '周杰伦音乐'`);
    shell.exec(`git remote add origin git@gitee.com:jayMusic/jayMusic${index}.git`);
    shell.exec(`git push -u origin master`);
    shell.cd(`../`);
    console.log(`提交完成`);
}
let i = 1;

function init() {
    if (i > 39) {
        return;
    }
    push(i);
    i += 1;
    init();
}
init();