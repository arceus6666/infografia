/*
rect(x:position x, y: position y, x: width, y: height)
mouseX: use the x position from the mouse
mouseY: use the y position from the mouse
*/
var bgColor = '#000000'
var hex_color = '#FFFFFF'
var size = { w: 15, h: 15 }
var sqsize = 15
var bd = sqsize // border
var lclick = true
var alg = 'dda'
var li1 = [bd, bd]
var matrix = []

function setup() {
  // put setup code here

  var ddaButton = select('#dda')
  ddaButton.mousePressed(setDDA)

  var bresButton = select('#bres')
  bresButton.mousePressed(setBRES)

  var reset = select('#reset')
  reset.mousePressed(resetMatrix)

  var black = select('#color_black')
  black.mousePressed(color_black)

  var brown = select('#color_brown')
  brown.mousePressed(color_brown)

  var red = select('#color_red')
  red.mousePressed(color_red)

  var darkorange = select('#color_darkorange')
  darkorange.mousePressed(color_darkorange)

  var darkgreen = select('#color_darkgreen')
  darkgreen.mousePressed(color_darkgreen)

  var darkblue = select('#color_darkblue')
  darkblue.mousePressed(color_darkblue)

  var yellow = select('#color_yellow')
  yellow.mousePressed(color_yellow)

  var white = select('#color_white')
  white.mousePressed(color_white)

  var grey = select('#color_grey')
  grey.mousePressed(color_grey)

  var pink = select('#color_pink')
  pink.mousePressed(color_pink)

  var lightorange = select('#color_lightorange')
  lightorange.mousePressed(color_lightorange)

  var lightgreen = select('#color_lightgreen')
  lightgreen.mousePressed(color_lightgreen)

  var skyblue = select('#color_skyblue')
  skyblue.mousePressed(color_skyblue)

  var purple = select('#color_purple')
  purple.mousePressed(color_purple)

  function color_black() {
    hex_color = '#000000'
  }

  function color_brown() {
    hex_color = '#8B4513'
  }

  function color_red() {
    hex_color = '#FF0000'
  }

  function color_darkorange() {
    hex_color = '#FF7F27'
  }

  function color_darkgreen() {
    hex_color = '#008000'
  }

  function color_darkblue() {
    hex_color = '#000080'
  }

  function color_yellow() {
    hex_color = '#FFFF00'
  }

  function color_white() {
    hex_color = '#FFFFFF'
  }

  function color_grey() {
    hex_color = '#808080'
  }

  function color_pink() {
    hex_color = '#FFAEC9'
  }

  function color_lightorange() {
    hex_color = '#FFC90E'
  }

  function color_lightgreen() {
    hex_color = '#B5E61D'
  }

  function color_skyblue() {
    hex_color = '#99D9EA'
  }

  function color_purple() {
    hex_color = '#A349A4'
  }

  function setDDA() {
    alg = 'dda'
  }

  function setBRES() {
    alg = 'bres'
  }

  function resetMatrix() {
    for (let i = bd, m = 0; i < (size.w * sqsize) + bd; i += sqsize, m++) {
      for (let j = bd, n = 0; j < (size.h * sqsize) + bd; j += sqsize, n++) {
        matrix[m][n][2] = '#FFFFFF'
      }
    }
    redraw()
  }

  for (let i = 0; i < size.w; i++) {
    matrix.push([])
    for (let j = 0; j < size.h; j++) {
      matrix[i].push([])
    }
  }
  setTimeout(() => {
    for (let i = bd, m = 0; i < (size.w * sqsize) + bd; i += sqsize, m++) {
      for (let j = bd, n = 0; j < (size.h * sqsize) + bd; j += sqsize, n++) {
        matrix[m][n] = [i, j, '#FFFFFF']
      }
    }
  }, 500)

  /*
  print(matrix.length + 'x' + matrix[0].length)
  print(matrix)
  //setTimeout(() => { console.log(matrix) }, 2000)
  */

}

function draw() {
  // put drawing code here
  //matrix[0][0][2] = true
  grid()
  noStroke()
}

function grid() {
  let w = size.w
  let h = size.h
  createCanvas((w * sqsize) + (2 * bd), (h * sqsize) + (2 * bd))
  background(bgColor)
  stroke(0)

  for (let i = bd, m = 0; i < (w * sqsize) + bd; i += sqsize, m++) {
    for (let j = bd, n = 0; j < (h * sqsize) + bd; j += sqsize, n++) {
      fill(matrix[m][n][2] ? matrix[m][n][2] : '#000000')
      rect(i, j, sqsize, sqsize)
    }
  }
}

function mousePressed() {
  // console.log('x:' + mouseX, 'y:' + mouseY)
  // console.log(lclick)
  // console.log(mouseX > bd, mouseX < (bd) + (size.w * sqsize), (bd) + (size.w * sqsize))
  // console.log(mouseY > bd, mouseY < (bd) + (size.w * sqsize), (bd) + (size.w * sqsize))
  if (mouseX > bd && mouseX < bd + (size.w * sqsize) && (mouseY > bd) && mouseY < (bd) + (size.w * sqsize)) {
    //*
    if (lclick) {
      li1 = [mouseX, mouseY]
      for (let i = bd + 1, ii = 0; i < size.w * sqsize + 2 * bd; i += sqsize, ii++) {
        if (mouseX + bd > i && mouseX + bd < i + sqsize) {
          li1[0] = ii
          break
        }
      }
      for (let j = bd + 1, jj = 0; j < size.h * sqsize + 2 * bd; j += sqsize, jj++) {
        if (mouseY + bd > j && mouseY + bd < j + sqsize) {
          li1[1] = jj
          break
        }
      }
      matrix[li1[0] - 1][li1[1] - 1][2] = hex_color
      lclick = false
    } else {
      let xb, yb
      for (let i = bd, ii = 0; i < size.w * sqsize + 2 * bd; i += sqsize, ii++) {
        if (mouseX + bd > i && mouseX + bd < i + sqsize) {
          xb = ii
          break
        }
      }
      for (let j = bd, jj = 0; j < size.h * sqsize + 2 * bd; j += sqsize, jj++) {
        if (mouseY + bd > j && mouseY + bd < j + sqsize) {
          yb = jj
          break
        }
      }
      matrix[xb - 1][yb - 1][2] = hex_color
      lclick = true

      setTimeout(() => {
        if (alg === 'dda') {
          lineDDA(li1[0] - 1, li1[1] - 1, xb - 1, yb - 1)
        } else if (alg === 'bres') {
          lineBres(li1[0] - 1, li1[1] - 1, xb - 1, yb - 1)
        }
        //console.log(li1, [xb, yb], ['puntos'])
      }, 100)
      //}
    }
    //*/
  }
}

/*
function getX(x1, y1, x2, y2, y) {
  return (((y - y1) * (x2 - x1)) / (y2 - y1)) + x1
}

function getY(x1, y1, x2, y2, x) {
  return (((x - x1) * (y2 - y1)) / (x2 - x1)) + y1
}
*/

function round(a) {
  return parseInt(a + 0.5)
}

// dda
function lineDDA(xa, ya, xb, yb) {
  let dx = xb - xa
  let dy = yb - ya
  let steps
  let xIncrement
  let yIncrement
  let x = xa
  let y = ya

  steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)

  xIncrement = dx / steps
  yIncrement = dy / steps

  setPixel(round(x), round(y))
  for (let k = 0; k < steps; k++) {
    x += xIncrement
    y += yIncrement
    setPixel(round(x), round(y))
  }
  setTimeout(() => { redraw() }, 500)
}

// Bresenham
function lineBres(xa, ya, xb, yb) {
  var dx = Math.abs(xb - xa)
  var dy = Math.abs(yb - ya)
  var sx = (xa < xb) ? 1 : -1
  var sy = (ya < yb) ? 1 : -1
  var err = dx - dy

  while (true) {
    setPixel(xa, ya)  // Do what you need to for this

    if ((xa === xb) && (ya === yb)) break
    var e2 = 2 * err
    if (e2 > -dy) { err -= dy; xa += sx }
    if (e2 < dx) { err += dx; ya += sy }
  }
  setTimeout(() => { redraw() }, 500)
}

function setPixel(x, y) {
  matrix[x][y][2] = hex_color
}
