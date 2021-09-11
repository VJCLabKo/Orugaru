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
function showMein(time) {
  if (time == undefined) { time = 1000 };
  document.getElementById("LoaderOverlay").style.display = "block";
  move("LoaderBar", time);
  myVar = setTimeout(showPage, time);

}

function showPage() {
  document.getElementById("LoaderOverlay").style.display = "none";
  document.querySelector("header").style.display = "block";
  document.getElementById("masthead").style.display = "block";
  document.getElementById("global-footer").style.display = "block";
  loaded = true;
};