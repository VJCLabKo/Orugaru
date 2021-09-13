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
        DB.Noti =[];
DB.Noti= JSON.parse(res);
        DB.ver = DB.Noti.slice(-1)[0].v;
        DB.last = { v: DB.ver, t: null };
        parse('./update/v' + DB.ver + '.md', (res) => {
            DB.last.t = res;
        });
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
            showMein(8000, function(){
                let list = ['オルガル ストーリーBGM021 一日の終わり', 'オルガル メニュー他BGM01 ホーム画面','オルガル ストーリーBGM016 ルナリア～オルゴールVer. ～'];
                // is after pm 1hr? 
                document.querySelector('audio#bgm').src = './musics/' + (new Date().getHours() > 13 ? list[0] : list[rand(1, 2)]) + '.mp3';
            });
        }, 300);
    }
}
window.onload = () => {
    showMein(5000);
    pageinit();
}
