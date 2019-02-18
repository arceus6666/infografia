/*
rect(x:position x, y: position y, x: width, y: height)
mouseX: use the x position from the mouse
mouseY: use the y position from the mouse
*/
var hex_color = '#FFFFFF'
var bgColor = '#000000'
var h = 10
var w = 10
var sqsize = 20
var bd = sqsize / 2 // border
var lclick = true
var eclick = 0
var alg = 'dda'
var li1 = new Array(2)
var li2 = new Array(2)

let cols = w;
let rows = h;
//var matrix = new Array(cols)
var matrix = []

// Two nested loops allow us to visit every spot in a 2D array.   
// For every column I, visit every row J.
for (let i = 0; i < cols; i++) {
  //matrix[i] = new Array(rows)
  matrix[i] = []
  for (let j = 0; j < rows; j++) {
    // object in each cell
    matrix[i][j] = [];
  }
}

//console.log(matrix)
/*
var matrix = []
//var m2 = []

for (let i = 0; i < h; i++) {
  matrix.push([])
  //m2.push([])
  for (let j = 0; j < w; j++) {
    matrix[i].push([])
    //m2[i].push(i + ',' + j)
  }
}
*/
//console.log(m2)

var brush = 'dot'

function setup() {
  // put setup code here

  var ddaButton = select('#dda')
  ddaButton.mousePressed(() => { alg = 'dda' })

  var bresButton = select('#bres')
  bresButton.mousePressed(() => { alg = 'bres' })

  var brush_bucket = select('#bucket')
  brush_bucket.mousePressed(() => { brush = 'bucket' })

  var brush_line = select('#line')
  brush_line.mousePressed(() => { brush = 'line' })

  var brush_circle = select('#circle')
  brush_circle.mousePressed(() => { brush = 'circle' })

  var brush_ellipse = select('#ellipse')
  brush_ellipse.mousePressed(() => { brush = 'ellipse' })

  var brush_dot = select('#dot')
  brush_dot.mousePressed(() => { brush = 'dot' })

  var reset = select('#reset')
  reset.mousePressed(resetMatrix)

  var black = select('#color_black')
  black.mousePressed(() => { hex_color = '#000000' })

  var brown = select('#color_brown')
  brown.mousePressed(() => { hex_color = '#8B4513' })

  var red = select('#color_red')
  red.mousePressed(() => { hex_color = '#FF0000' })

  var darkorange = select('#color_darkorange')
  darkorange.mousePressed(() => { hex_color = '#FF7F27' })

  var darkgreen = select('#color_darkgreen')
  darkgreen.mousePressed(() => { hex_color = '#008000' })

  var darkblue = select('#color_darkblue')
  darkblue.mousePressed(() => { hex_color = '#000080' })

  var yellow = select('#color_yellow')
  yellow.mousePressed(() => { hex_color = '#FFFF00' })

  var white = select('#color_white')
  white.mousePressed(() => { hex_color = '#FFFFFF' })

  var grey = select('#color_grey')
  grey.mousePressed(() => { hex_color = '#808080' })

  var pink = select('#color_pink')
  pink.mousePressed(() => { hex_color = '#FFAEC9' })

  var lightorange = select('#color_lightorange')
  lightorange.mousePressed(() => { hex_color = '#FFC90E' })

  var lightgreen = select('#color_lightgreen')
  lightgreen.mousePressed(() => { hex_color = '#B5E61D' })

  var skyblue = select('#color_skyblue')
  skyblue.mousePressed(() => { hex_color = '#99D9EA' })

  var purple = select('#color_purple')
  purple.mousePressed(() => { hex_color = '#A349A4' })

  var sizep = select('#plus')
  sizep.mousePressed(sizeplus)

  var sizem = select('#minus')
  sizem.mousePressed(sizeminus)

  function sizeplus() {
    sqsize++
    resizeSqMatrix()
  }

  function sizeminus() {
    sqsize--
    resizeSqMatrix()
  }


  var rs = select('#resize')
  rs.mousePressed(resize)

  function resize() {
    var inputw = select('#w').elt.value
    var inputh = select('#h').elt.value
    //console.log(inputw, inputh)
    w = inputw
    h = inputh
    resetMatrix()
  }

  var upw = select('#upw')
  var uph = select('#uph')
  var downw = select('#downw')
  var downh = select('#downh')

  upw.mousePressed(upwMatrix)
  uph.mousePressed(uphMatrix)
  downw.mousePressed(() => { w-- })
  downh.mousePressed(() => { h-- })

  function resetMatrix() {
    matrix = []
    for (let i = bd, m = 0; m < w; i += sqsize, m++) {
      matrix.push([])
      for (let j = bd, n = 0; n < h; j += sqsize, n++) {
        matrix[m].push([i, j, '#FFFFFF'])
      }
    }
    //redraw()
  }

  function resizeSqMatrix() {
    for (let i = bd, m = 0; m < w; i += sqsize, m++) {
      for (let j = bd, n = 0; n < h; j += sqsize, n++) {
        matrix[m][n][0] = i
        matrix[m][n][1] = j
      }
    }
  }

  function upwMatrix() {
    // add column i
    let i = w
    w++
    for (i; i < w; i++) {
      matrix[i] = []
      for (let j = 0; j < h; j++) {
        let prev = matrix[i - 1][j]
        // console.log(prev)
        matrix[i][j] = [prev[0] + sqsize, prev[1], '#FFFFFF']
      }
    }
  }

  function uphMatrix() {
    // add row j
    let j = h
    h++
    for (let i = 0; i < w; i++) {
      let prev = matrix[i][j - 1]
      //for (let j = l; j < h; j++) {
      matrix[i][j] = [prev[0], prev[1] + sqsize, '#FFFFFF']
      //}
      console.log(prev, i, j)
    }
  }


  setTimeout(() => {
    for (let i = bd, m = 0; m < w; i += sqsize, m++) {
      for (let j = bd, n = 0; n < h; j += sqsize, n++) {
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
  setTimeout(() => { grid() }, 200)
}

function grid() {
  createCanvas((w * sqsize) + (2 * bd), (h * sqsize) + (2 * bd))
  background('#DDDDDD')
  //noStroke(0)
  stroke(0)

  for (let m = 0; m < w; m++) {
    for (let n = 0; n < h; n++) {
      let c = matrix[m][n]
      try {
        fill(c[2] ? c[2] : '#FFFFFF')
        //console.log(c[0],'x',c[1])
        rect(c[0], c[1], sqsize, sqsize)
      } catch (e) {
        //console.log(m, 'x', n, ':', c)
      }
    }
  }

}

function mousePressed() {
  //console.log(filler)
  let tx = bd + (w * sqsize)
  let ty = bd + (h * sqsize)
  if (mouseX > bd && mouseX < tx && mouseY > bd && mouseY < ty/* && !filler*/) {
    let x = Math.floor(map(mouseX, bd, tx, 0, w))
    let y = Math.floor(map(mouseY, bd, ty, 0, h))
    //*
    if (brush === 'line') {
      if (lclick) {
        li1 = [x, y]
        matrix[x][y][2] = hex_color
        lclick = false
      } else {
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
    } else if (brush === 'bucket') {
      myfill(x, y, hex_color, getColor(x, y))
    } else if (brush === 'circle') {
      if (lclick) {
        li1 = [x, y]
        lclick = false
      } else {
        lclick = true
        let a = (li1[1] - y) * (li1[1] - y)
        let b = (li1[0] - x) * (li1[0] - x)
        let r = Math.floor(Math.sqrt(a + b))
        drawCircle(li1[0], li1[1], r)
      }
    } else if (brush === 'ellipse') {
      if (eclick === 0) {
        li1 = [x, y]
        eclick++
      } else if (eclick === 1) {
        li2 = [x, y]
        eclick++
      } else {
        eclick = 0
        let a = (li1[1] - li2[1]) * (li1[1] - li2[1])
        let b = (li1[0] - li2[0]) * (li1[0] - li2[0])
        let aa = (li1[1] - y) * (li1[1] - y)
        let bb = (li1[0] - x) * (li1[0] - x)
        let rx = Math.floor(Math.sqrt(a + b))
        let ry = Math.floor(Math.sqrt(aa + bb))
        drawEllipse(li1[0], li1[1], rx, ry)
      }
    } else if (brush === 'dot') {
      setPixel(x, y)
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


function drawCircle(xc, yc, r) {
  //var xc = parseInt(select('#xc').elt.value)
  //var yc = parseInt(select('#yc').elt.value)
  //var r = parseInt(select('#rad').elt.value)
  /*
  if (
    xc + r <= w &&
    xc - r >= 0 &&
    yc + r <= h &&
    yc - r >= 0
  )
    //*/
  circleMidpoint(xc, yc, r)
  // console.log(xc, yc, r)
}

// circle
function circleMidpoint(xCenter, yCenter, radius) {

  let x = 0
  let y = radius
  let p = 1 - radius
  //console.log(xCenter, yCenter, x, y)
  circlePlotPoints(xCenter, yCenter, x, y)

  while (x < y) {
    x++
    if (p < 0)
      p += 2 * x + 1
    else {
      y--
      p += 2 * (x - y) + 1
    }
    circlePlotPoints(xCenter, yCenter, x, y)
  }
}

function circlePlotPoints(xCenter, yCenter, x, y) {
  setPixel(xCenter + x, yCenter + y)
  setPixel(xCenter - x, yCenter + y)
  setPixel(xCenter + x, yCenter - y)
  setPixel(xCenter - x, yCenter - y)
  setPixel(xCenter + y, yCenter + x)
  setPixel(xCenter - y, yCenter + x)
  setPixel(xCenter + y, yCenter - x)
  setPixel(xCenter - y, yCenter - x)
}

// ellipse
function ellipseMidpoint(xCenter, yCenter, Rx, Ry) {
  let Rx2 = Rx * Rx
  let Ry2 = Ry * Ry
  let twoRx2 = 2 * Rx2
  let twoRy2 = 2 * Ry2

  let p
  let x = 0
  let y = Ry
  let px = 0
  let py = twoRx2 * y

  ellipsePlotPoints(xCenter, yCenter, x, y)

  p = round(Ry2 - (Rx2 * Ry) + (0.25 * Rx2))

  while (px < py) {
    x++
    px += twoRy2
    if (p < 0)
      p += Ry2 + px
    else {
      y--
      py -= twoRx2
      p += Ry2 + px - py
    }
    ellipsePlotPoints(xCenter, yCenter, x, y)
  }

  p = round(Ry2 * (x + 0.5) * (x + 0.5) + Rx2 * (y - 1) * (y - 1) - Rx2 * Ry2)
  while (y > 0) {
    y--
    py -= twoRx2
    if (p > 0)
      p += Rx2 - py
    else {
      x++
      px += twoRy2
      p += Rx2 + px - py
    }
    ellipsePlotPoints(xCenter, yCenter, x, y)
  }
}

function ellipsePlotPoints(xCenter, yCenter, x, y) {
  setPixel(xCenter + x, yCenter + y)
  setPixel(xCenter - x, yCenter + y)
  setPixel(xCenter + x, yCenter - y)
  setPixel(xCenter - x, yCenter - y)
}

function drawEllipse(xc, yc, rx, ry) {
  /*
  if (
    xc + rx <= w &&
    xc - rx >= 0 &&
    yc + ry <= h &&
    yc - ry >= 0
  )
  //*/
  ellipseMidpoint(xc, yc, rx, ry)
}

function myfill(x, y, fillColor, oldColor) {
  // console.log(x, y, oldColor, 'to', fillColor)
  if (getColor(x, y) === oldColor) {
    setPixel(x, y)
    /*
    if (x + 1 < w && getColor(x + 1, y) === oldColor) {
      myfill(x + 1, y, oldColor)
      if (y - 1 >= 0 && getColor(x + 1, y - 1) === oldColor)
        myfill(x + 1, y - 1, oldColor)
      if (y + 1 < h && getColor(x + 1, y + 1) === oldColor)
        myfill(x + 1, y + 1, oldColor)
    }
    if (x - 1 >= 0 && getColor(x - 1, y) === oldColor) {
      myfill(x - 1, y, oldColor)
      if (y - 1 >= 0 && getColor(x - 1, y - 1) === oldColor)
        myfill(x - 1, y - 1, oldColor)
      if (y + 1 < h && getColor(x - 1, y + 1) === oldColor)
        myfill(x - 1, y + 1, oldColor)
    }
    if (y + 1 < h && getColor(x, y + 1) === oldColor)
      myfill(x, y + 1, oldColor)
    if (y - 1 >= 0 && getColor(x, y - 1) === oldColor)
      myfill(x, y - 1, oldColor)
    */
    myfill(x + 1, y, fillColor, oldColor)
    myfill(x - 1, y, fillColor, oldColor)
    myfill(x, y + 1, fillColor, oldColor)
    myfill(x, y - 1, fillColor, oldColor)
  }
}



function tEdge(yUpper, xIntersect, dxPerscan) {
  yUpper: yUpper
  xIntersect: xIntersect
  dxPerscan: dxPerscan
}

//function insertEdge

function setPixel(x, y) {
  if (matrix[x] && matrix[x][y])
    matrix[x][y][2] = hex_color
}

function getColor(x, y) {
  let l1 = matrix.length
  let l2 = matrix[0].length
  if (x < 0 || y < 0 || x >= l1 || y >= l2)
    return false
  try {
    return matrix[x][y][2] ? matrix[x][y][2] : false
  } catch (e) {
    console.log('e in ', x, y)
  }
  /*
  return matrix[x][y][2]
  */
}
