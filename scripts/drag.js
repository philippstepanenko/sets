var cx,cy;
var blocks = ["left","right"];

function init_blocks(){
	var root = document.querySelector(":root");
	var s = getComputedStyle(root).getPropertyValue('--button-size');
	var button_size = Number(s.substr(0,s.indexOf("px")));
	cx = button_size + 2;
	cy = button_size + 1;

	for (var i=0; i<blocks.length; i++){
		document.getElementById(blocks[i]).onmousedown = mousedown;
	}
}

function mousedown(e) {
	var elem = e.currentTarget;
  var coords = getCoords(elem);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;
  elem.parentNode.parentNode.style.position = 'absolute';
  document.body.appendChild(elem.parentNode.parentNode);
  moveAt(e);

  elem.style.zIndex = 1000;

  function moveAt(e) {
    elem.parentNode.parentNode.style.left = e.pageX - cx - shiftX + 'px';
    elem.parentNode.parentNode.style.top = e.pageY - cy - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  document.onmouseup = function() {
    document.onmousemove = null;
    elem.onmouseup = null;
  };

  elem.ondragstart = function() {
  return false;
	};

	function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: Math.floor(box.top) + pageYOffset,
    left: Math.floor(box.left) + pageXOffset
  };
}

}

window.addEventListener("load", init_blocks, true);