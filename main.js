/* eslint-disable no-unused-vars */
var mainContainer = document.getElementById("mainContainer");

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}
function setup() {
  var pageWidth = getWidth();
  var pageHeight = getHeight();

  var squareContainer = document.createElement("div");
  squareContainer.setAttribute("id", "squareContainer");

  var marginWidth = (pageWidth % 20) / 2 + 20;
  var containerWidth = pageWidth - (pageWidth % 20) - 40;
  squareContainer.style.marginLeft = marginWidth + "px";
  squareContainer.style.marginRight = marginWidth + "px";
  squareContainer.style.width = containerWidth + "px";

  var marginHeight = (pageHeight % 20) / 2 + 20;
  var containerHeight = pageHeight - (pageHeight % 20) - 40;
  squareContainer.style.marginTop = marginHeight + "px";
  squareContainer.style.marginBottom = marginHeight + "px";
  squareContainer.style.height = containerHeight + "px";

  var prevsquareContainer = document.getElementById("squareContainer");
  if (prevsquareContainer) {
    mainContainer.removeChild(prevsquareContainer);
  }
  numCubesRow = containerWidth / 20;
  numCubesCol = containerHeight / 20;
  numCubes = numCubesRow * numCubesCol;

  var currRow = 0;
  for (var i = 0; i < numCubes; i++) {
    var x = i % numCubesRow;
    var y;
    if (i % numCubesRow == numCubesRow - 1) {
      y = currRow;
      currRow += 1;
    } else {
      y = currRow;
    }
    var newCube = document.createElement("div");
    newCube.className = "cube";
    newCube.setAttribute("id", x + "-" + y);
    newCube.onmouseover = function() {
      spin(this.id);
    };
    squareContainer.appendChild(newCube);
  }
  squareContainer.style.border = "1px solid darkblue";
  mainContainer.appendChild(squareContainer);
}

function spin(cubeID) {
  var currCube = document.getElementById(cubeID);
}
