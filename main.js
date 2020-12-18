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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var colors = [
  "blue",
  "red",
  "green",
  "purple",
  "yellow",
  "white",
  "aquamarine",
  "chartreuse",
  "crimson",
  "DarkOrange",
  "HotPink",
];

var numCubesRow;
var numCubesCol;
var numCubes;

function setup() {
  var pageWidth = getWidth();
  var pageHeight = getHeight();

  var cubeContainer = document.createElement("div");
  cubeContainer.setAttribute("id", "cubeContainer");

  var containerWidth = pageWidth - (pageWidth % 50) - 50;
  cubeContainer.style.width = containerWidth + "px";
  var containerHeight = pageHeight - (pageHeight % 50) - 100;
  cubeContainer.style.height = containerHeight + "px";

  var prevcubeContainer = document.getElementById("cubeContainer");
  if (prevcubeContainer) {
    mainContainer.removeChild(prevcubeContainer);
  }
  numCubesRow = containerWidth / 50;
  numCubesCol = containerHeight / 50;
  numCubes = numCubesRow * numCubesCol;

  for (var i = 0; i < numCubes; i++) {
    var newCube = document.createElement("div");
    newCube.className = "cube";
    var cubeID = "c" + i;
    newCube.setAttribute("id", cubeID);
    newCube.style.backgroundColor = colors[getRandomInt(colors.length)];
    newCube.style.border = "5px solid " + colors[getRandomInt(colors.length)];
    var content = document.createElement("div");
    content.setAttribute("id", "i" + i);
    content.style.backgroundColor = colors[getRandomInt(colors.length)];
    content.style.border = "5px solid " + colors[getRandomInt(colors.length)];
    if (getRandomInt(2) == 0) {
      content.className = "circle";
    } else {
      content.className = "square";
    }
    newCube.appendChild(content);
    cubeContainer.appendChild(newCube);
  }
  cubeContainer.style.border = "5px solid white";
  mainContainer.appendChild(cubeContainer);
  setAnimations();
}

var animationDuration = 2600;
function updateSpeed(speed) {
  animationDuration = 5100 - speed;
}

function changeColors(i) {
  var cube = document.getElementById("c" + i);
  cube.style.backgroundColor = colors[getRandomInt(colors.length)];
  cube.style.border = "5px solid " + colors[getRandomInt(colors.length)];
  var contents = document.getElementById("i" + i);
  contents.style.backgroundColor = colors[getRandomInt(colors.length)];
  contents.style.border = "5px solid " + colors[getRandomInt(colors.length)];
}

function setAnimations() {
  if (paused == false) {
    for (var i = 0; i < numCubes; i++) {
      var thisCube = document.getElementById("c" + i);
      var animationNum = getRandomInt(4);
      var animationType = "";
      var animateFrom = "";
      var animateTo = "";
      if (animationNum == 0) {
        animationType = "rotateX";
        animateFrom = "0deg";
        animateTo = "180deg";
      } else if (animationNum == 1) {
        animationType = "rotateX";
        animateFrom = "180deg";
        animateTo = "0deg";
      } else if (animationNum == 2) {
        animationType = "rotateY";
        animateFrom = "0deg";
        animateTo = "180deg";
      } else {
        animationType = "rotateY";
        animateFrom = "180deg";
        animateTo = "0deg";
      }
      thisCube.animate(
        [
          // keyframes
          { transform: "" + animationType + "(" + animateFrom + ")" },
          { transform: "" + animationType + "(" + animateTo + ")" },
        ],
        {
          // timing options
          duration: animationDuration,
          iterations: 1,
          timing: "ease",
        }
      );
    }
    var testCube = document.getElementById("c1");
    Promise.all(
      testCube
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished)
    ).then(() => setAnimations());
  }
}

var paused = false;
document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    if (paused == false) {
      paused = true;
    } else {
      paused = false;
      setAnimations();
    }
  }
});

// thisCube.onmouseover = function() {
//     var mouseoverCube = document.getElementById(this.id);
//     mouseoverCube.animate(
//       [
//         // keyframes
//         { transform: "rotateZ(" + animateFrom + ")" },
//         { transform: "rotateZ(" + animateTo + ")" },
//       ],
//       {
//         // timing options
//         duration: animationDuration,
//         iterations: Infinity,
//         timing: "linear",
//       }
//     );
//   };
