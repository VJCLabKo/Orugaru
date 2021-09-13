var myVar;
var i = 0;
var loaded = false;
function move(barID, time) {
  if (time == undefined) { time = 1000 };
  time = Math.floor(time / 1000);
  if (i == 0) {
    i = 1;
    var elem = document.getElementById(barID);
    var width = 0;
    var id = setInterval(frame, 10 * time);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        // elem.innerHTML = width  + "%";
      }
    }
  }
}
function showMein(time,fn) {
  if (time == undefined) { time = 1000 };
  document.getElementById("LoaderOverlay").style.display = "block";
  move("LoaderBar", time);
  myVar = setTimeout(function(){showPage(fn)}, time);

}

function showPage(fn) {
  if(fn&&typeof fn == 'function'){
    fn(true,"finshed");
  }
  document.getElementById("LoaderOverlay").style.display = "none";
  document.getElementById("wrapper").style.display = "block";
  loaded = true;
};