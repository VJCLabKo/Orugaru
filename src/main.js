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
function appendSoundCtrl(){
    let sCtrlEle = document.querySelector('#sound-control');
    let audioElm = document.querySelector('audio#bgm');
    sCtrlEle.onclick = ()=>{
        if (audioElm.paused && audioElm.currentTime >= 0 && !audioElm.started) {
            audioElm.play();
            sCtrlEle.innerText = '♪ BGM : ON';
            sCtrlEle.classList.add('on')
        }else{
            audioElm.pause();
            sCtrlEle.innerText = '♪ BGM : Off';
            sCtrlEle.classList.remove('on')
        }
    }
}

window.onload = () => {
    document.addEventListener('click',()=>{
        document.getElementById('sfx_Onclick').play();
    });
    //addTop(document.getElementById('main'))
    appendSoundCtrl();
}