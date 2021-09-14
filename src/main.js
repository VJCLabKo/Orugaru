const thislang = navigator.language;
const isKor = /^ko\b/.test(thislang);
const DB = {};
const textDB = {
    title: ["オルタナティブガールズ\nweb", "얼터너티브 걸즈\nWeb"]
}

function addTop(meinEle) {
    let title = document.createElement('div');
    title.id = 'title';
    title.innerText = textDB.title[isKor ? 1 : 0];
    meinEle.appendChild(title);
}
function appendSoundCtrl() {
    let sCtrlEle = document.querySelector('#sound-control');
    let audioElm = document.querySelector('audio#bgm');
    audioElm.addEventListener('ended', () => {
        sCtrlEle.innerText = '♪ BGM : Off';
        sCtrlEle.classList.remove('on')
    });
    sCtrlEle.onclick = () => {
        if (audioElm.paused && audioElm.currentTime >= 0 && !audioElm.started) {
            audioElm.play();
            sCtrlEle.innerText = '♪ BGM : ON';
            sCtrlEle.classList.add('on')
        } else {
            audioElm.pause();
            sCtrlEle.innerText = '♪ BGM : Off';
            sCtrlEle.classList.remove('on')
        }
    }
}
function onPcFn() {
    let tii = null;
    if (window.screen.width > 481) {
        tii = document.querySelector('#global-header .logo img');
        tii.src = './images/3_bg.jpg';
    }
}
function parse(u, cbf, head) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', u, true);
    xhr.onload = () => {
        if (cbf) {
            cbf(xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }
    xhr.send();
}
function getNotis(cbf) {
    parse('./update/logs.json', (res) => {
        DB.Noti = [];
        DB.Noti = JSON.parse(res);
        DB.ver = DB.Noti[DB.Noti.length - 1].v;
        DB.last = { v: DB.ver, t: null };
        parse('./update/v' + DB.ver + '.md', (res) => {
            DB.last.t = res;
        });
        if (isKor) {
            xhr = new XMLHttpRequest();
            xhr.open('GET', './update/v' + DB.ver + ' (ko).md');
            xhr.onload = () => {
                DB.last.t = xhr.responseText;
            }
            xhr.onerror = () => {
                console.log('cannot found korean noti')
            }
            xhr.send();
        }
        cbf(DB.ver);
    })
}
function addNotiView(instant) {
    noti = document.querySelector('#wrapper .noti');
    if (noti) { noti.remove() };
    const disp = function () {
        noti = document.createElement('div');
        noti.className = 'noti';
        //top
        let notitp = document.createElement('div');
        notitp.className = 'topw';
        let notitpT = document.createElement('div');
        notitpT.id = 'top';
        notitpT.innerText = 'Noti';
        notitp.appendChild(notitpT);
        //items
        let notiI = document.createElement('div');
        notiI.className = 'items';
        let notiItp = document.createElement('div');
        notiItp.id = 'top';
        notiItp.innerText = 'v' + DB.ver;
        let notiIData = document.createElement('div');
        notiIData.id = 'notiIData';
        notiI.append(notiItp, notiIData);
        //close button
        let btnw = document.createElement('div');
        btnw.className = 'closew';
        let btn = document.createElement('button');
        btn.id = 'close';
        btn.innerText = 'close';
        btn.onclick = () => {
            noti.style.animation = '.35s close';
            setTimeout(() => {
                noti.remove()
            }, 320);
        }
        btnw.append(btn)
        noti.append(notitp, notiI, btnw);
        document.getElementById("wrapper").appendChild(noti);
        document.getElementById('notiIData').innerHTML = window.marked(DB.last.t);
    };
    if (!instant) {
        let timer = setInterval(() => {
            if (DB.last) {
                clearInterval(timer);
                setTimeout(disp, 5000);
            }
        }, 1000);
    } else {
        disp();
    }
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function appendWarningScr(tit, str) {
    t = document.getElementById("wrapper");
    b = document.createElement('div');
    b.className = 'warn';
    dt = document.createElement('div');
    dt.id = 'warnTitle';
    dt.innerText = tit ? tit : '404';
    dd = document.createElement('div');
    dd.id = 'warnData';
    dd.innerText = str ? str : '[Description String]';
    t.classList.add('warning');
    btn = document.createElement('button');
    btn.id = 'reload';
    btn.innerText = 'reload';
    btn.onclick = () => {
        location.reload();
    }
    b.append(dt, dd, btn);
    t.append(b);
}
function initMenu() {
    let audioElm = document.querySelector('audio#bgm');
    setSrc = (u) => audioElm.src = './musics/' + u + '.mp3';
    audioElm.loop = true;
    let list = ['オルガル メニュー他BGM01 ホーム画面', 'オルガル ストーリーBGM019 一難去って', 'オルガル ストーリーBGM021 一日の終わり', 'オルガル ストーリーBGM016 ルナリア～オルゴールVer. ～'];
    let time = new Date().getHours();
    // is less then pm 3hr?
    if (time <= 13) {
        setSrc(list[0]);
    } else if (time >= 14 && time <= 17) {
        // is after then pm 4hr && less then pm 7?
        setSrc(list[1]);
    } else {
        setSrc(list[rand(2, 3)]);
    }
    document.querySelector("#masthead img").remove();
    if (isKor) {
        t = ["무기한 점검입니다.","빠른 시일내에 컨텐츠가 추가될 예정입니다.","불편을 드려 죄송합니다."];
        appendWarningScr('점검 중', t.join('\n'));
    } else {
        t = ["We are sorry,","It's under Construction. ","Content will be added as soon as possible."]
        appendWarningScr('WIP... Sorry.', t.join('\n'));
    }
}
function pageinit() {
    DB.Noti = {};
    getNotis((x) => document.getElementById('siteVerDisplay').innerText = x);
    onPcFn();
    document.addEventListener('click', () => {
        document.getElementById('sfx_Onclick').play();
    });
    //addTop(document.getElementById('main'))
    appendSoundCtrl();
    document.getElementById('siteVerDisplay').onclick = () => addNotiView(true);
    addNotiView();
    startBtn.onclick = () => {
        let audioElm = document.querySelector('audio#bgm');
        audioElm.pause();
        audioElm.src = './musics/オルガル 戦闘BGM01 通常戦闘.mp3';
        audioElm.autoplay = true;
        document.getElementById('global-header').style.animation = '.32s fadeout';
        setTimeout(() => {
            document.getElementById('global-header').remove();
            let img = document.createElement('img');
            img.src = './images/bg.jpg';
            document.getElementById("masthead").style.overflow = 'hidden';
            document.getElementById("masthead").appendChild(img);
            showMein(8000, initMenu);
        }, 300);
    }
}
window.onload = () => {
    showMein(5000);
    pageinit();
}
