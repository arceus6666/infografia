/*
rect(x:position x, y: position y, x: width, y: height)
mouseX: use the x position from the mouse
mouseY: use the y position from the mouse
*/
var hex_color = '#FFFFFF'
var bgColor = '#000000'
var size = { w: 10, h: 10 }
var sqsize = 10
var bd = sqsize / 2 // border
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

  var sizep = select('#plus')
  sizep.mousePressed(sizeplus)

  var sizem = select('#minus')
  sizem.mousePressed(sizeminus)

  function sizeplus() {
    //console.log(sqsize, size.w, size.h)
    //size.w += 2
    //size.h += 2
    sqsize++
    resizeSqMatrix()
    //console.log(sqsize, size.w, size.h)
  }

  function sizeminus() {
    //console.log(sqsize, size.w, size.h)
    //size.w -= 2
    //size.h -= 2
    sqsize--
    resizeSqMatrix()
    //console.log(sqsize, size.w, size.h)
  }


  var rs = select('#resize')
  rs.mousePressed(resize)

  function resize() {
    var inputw = select('#w').elt.value
    var inputh = select('#h').elt.value
    //console.log(inputw, inputh)
    size.w = inputw
    size.h = inputh
    resetMatrix()
  }

  var upw = select('#upw')
  var uph = select('#uph')
  var downw = select('#downw')
  var downh = select('#downh')

  upw.mousePressed(uw)
  uph.mousePressed(uh)
  downw.mousePressed(dw)
  downh.mousePressed(dh)

  function uw() {
    size.w++;
    if (matrix[0].length < size.w) {
      upwMatrix();
    }
  }
  function uh() {
    size.h++;
    if (matrix.length < size.h) {
      uphMatrix();
    }
  }
  function dw() {
    size.w--; //resetMatrix();
  }
  function dh() {
    size.h--; //resetMatrix();
  }

  function resetMatrix() {
    prevMatrix = matrix
    matrix = []
    for (let i = bd, m = 0; i < (size.w * sqsize) + bd; i += sqsize, m++) {
      matrix.push([])
      for (let j = bd, n = 0; j < (size.h * sqsize) + bd; j += sqsize, n++) {
        matrix[m][n] = [i, j, '#FFFFFF']
      }
    }
    //redraw()
  }

  function resizeSqMatrix() {
    for (let i = bd, m = 0; i < (size.w * sqsize) + bd; i += sqsize, m++) {
      for (let j = bd, n = 0; j < (size.h * sqsize) + bd; j += sqsize, n++) {
        matrix[m][n][0] = i
        matrix[m][n][1] = j
      }
    }
  }

  function upwMatrix() {
    for (let y = 0; y < size.h; y++) {
      let last = matrix[y][matrix[y].length - 1]
      // console.log(last)
      // antigua ultima columna: matrix[y][matrix[y].length - 1]
      // en esta se recorren columnas
      // a estas les tengo q aumentar una fila
      //*

      matrix[y].push([
        last[0],
        last[1] + sqsize,
        '#FFFFFF'
      ])
      //*/
    }
  }

  function uphMatrix() {
    matrix.push([])
    for (let x = 0, j = bd; x < size.h; j += sqsize, x++) {
      matrix[matrix.length][x] = [
        j,
        matrix[matrix.length][0][1],
        '#FFFFFF'
      ]
    }
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
  setTimeout(() => { grid() }, 150)
}

function grid() {
  createCanvas((size.w * sqsize) + (2 * bd), (size.h * sqsize) + (2 * bd))
  background(bgColor)
  noStroke(0)
  //stroke(0)

  for (let i = bd, m = 0; m < size.h; i += sqsize, m++) {
    for (let j = bd, n = 0; n < size.w; j += sqsize, n++) {
      let current = matrix[m][n]
      try {
        myfill(matrix[m][n][2] ? matrix[m][n][2] : '#FFFFFF')
        rect(i, j, sqsize, sqsize)
      } catch (e) {
        //console.log(m, 'x', n, ':', matrix[m][n])
      }
    }
  }
}

function mousePressed() {
  if (mouseX > bd && mouseX < bd + (size.w * sqsize) && (mouseY > bd) && mouseY < (bd) + (size.w * sqsize)) {
    //*
    if (lclick) {
      let x = Math.floor(map(mouseX, bd, sqsize * size.w + bd, 0, size.w))
      let y = Math.floor(map(mouseY, bd, sqsize * size.h + bd, 0, size.h))
      li1 = [x, y]
      matrix[x][y][2] = hex_color
      lclick = false
    } else {
      let x = Math.floor(map(mouseX, bd, sqsize * size.w + bd, 0, size.w))
      let y = Math.floor(map(mouseY, bd, sqsize * size.h + bd, 0, size.h))
      matrix[x][y][2] = hex_color
      lclick = true
      switch (alg) {
        case 'dda': lineDDA(li1[0], li1[1], x, y)
          break
        case 'bres': lineBres(li1[0], li1[1], x, y)
          break
        default: lineDDA(li1[0], li1[1], x, y)
          break
      }
      //console.log(li1, [x, y], ['puntos'])
      //}
    }
    //*/
  }
}

function round(a) {
  return parseInt(a + 0.5)
}

// dda
function lineDDA(xa, ya, xb, yb) {
  let dx = xb - xa
  let dy = yb - ya
  let x = xa
  let y = ya

  let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)

  let xIncrement = dx / steps
  let yIncrement = dy / steps

  setPixel(round(x), round(y))
  for (let k = 0; k < steps; k++) {
    x += xIncrement
    y += yIncrement
    setPixel(round(x), round(y))
  }
  //setTimeout(() => { redraw() }, 1)
}

// Bresenham
function lineBres(xa, ya, xb, yb) {
  let dx = Math.abs(xb - xa)
  let dy = Math.abs(yb - ya)
  let sx = (xa < xb) ? 1 : -1
  let sy = (ya < yb) ? 1 : -1
  let err = dx - dy

  while (true) {
    setPixel(xa, ya)  // Do what you need to for this

    if ((xa === xb) && (ya === yb)) break
    var e2 = 2 * err
    if (e2 > -dy) { err -= dy; xa += sx }
    if (e2 < dx) { err += dx; ya += sy }
  }
  //setTimeout(() => { redraw() }, 1)
}

function setPixel(x, y) {
  matrix[x][y][2] = hex_color
}
