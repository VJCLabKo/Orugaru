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
    audioElm.addEventListener('ended',()=>{
        sCtrlEle.innerText = '♪ BGM : Off';
            sCtrlEle.classList.remove('on')
    });
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
function onPcFn(){
    let tii = null;
    if(window.screen.width > 481){
        tii = document.querySelector('#global-header .logo img');
        tii.src = './images/3_bg.jpg';
    }
}
function getlastVer(cbf){
    xhr = new XMLHttpRequest();
xhr.open('GET','./update/logs.json');
xhr.onload =()=>{
let j = JSON.parse(xhr.responseText);
cbf('v'+j.pop().v);
};
xhr.send();

}
window.onload = () => {
    showMein(5000);
    getlastVer((x)=>document.getElementById('siteVerDisplay').innerText = x);
    onPcFn();
    document.addEventListener('click',()=>{
        document.getElementById('sfx_Onclick').play();
    });
    //addTop(document.getElementById('main'))
    appendSoundCtrl();
}