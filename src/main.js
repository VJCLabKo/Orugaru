const thislang = navigator.language;
const isKor = /^ko\b/.test(thislang);
const textDB = {
    title: ["オルタナティブガールズ\nweb", "얼터너티브 걸즈\nWeb"]
}

function addTop(meinEle) {
    let title = document.createElement('div');
    title.id = 'title';
    title.innerText = textDB.title[isKor ? 1 : 0];
    meinEle.appendChild(title);
}

window.onload = () => {
    //addTop(document.getElementById('main'))
    let audioElm = document.querySelector('audio#bgm');
    document.querySelector('#sound-control').onclick = ()=>{
        if (audioElm.paused && audioElm.currentTime >= 0 && !audioElm.started) {
            audioElm.play();
            document.querySelector('#sound-control').innerText = '♪ BGM : ON';
            document.querySelector('#sound-control').classList.add('on')
        }else{
            audioElm.pause();
            document.querySelector('#sound-control').innerText = '♪ BGM : Off';
            document.querySelector('#sound-control').classList.remove('on')
        }
    }
}