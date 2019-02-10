/*
rect(x:position x, y: position y, x: width, y: height)
mouseX: use the x position from the mouse
mouseY: use the y position from the mouse
*/
var bgColor = '#515151'
var size = { w: 5, h: 10 }
let bd = 20 // border
var sqsize = 20
var lclick = true
var dline = false
var li1 = [bd, bd]
var li2 = [bd, bd]
var le1 = [bd, bd]
var le2 = [bd, bd]
var matrix = []

function setup() {
  // put setup code here
  for (let i = 0; i < size.h; i++) {
    matrix.push([])
    for (let j = 0; j < size.w; j++) {
      matrix[i].push(0)
    }
  }
  /*
  print(matrix.length + 'x' + matrix[0].length)
  print(matrix)
  */
}

function draw() {
  // put drawing code here
  grid()
  fill('red')
  noStroke()
}

const fillColors = () => {
  let r = 255
  let g = r
  let b = r
  let colorChange = 255 / size.h
  let colors = [[r, g, b]]
  for (let i = 0; i < size.h; i++) {
    r -= colorChange
    g -= colorChange
    b -= colorChange
    colors.push([r, g, b])
  }
  return colors
}

function grid() {
  let colors = fillColors()
  let w = size.w
  let h = size.h
  let sq = sqsize
  createCanvas((h * sq) + (2 * bd), (w * sq) + (2 * bd))
  background(bgColor)
  stroke(0)

  for (let i = bd, c = 0, m = 0; i < (h * sq) + bd; i += sq, c++ , m++) {
    let cc = colors[c]
    for (let j = bd, n = 0; j < (w * sq) + bd; j += sq, n++) {
      fill('white')
      matrix[m][n] = [i, j]
      let x1
      let y1
      let x2
      let y2
      if (li2[0] > le2[0]) {
        x1 = le2[0]
        x2 = li2[0]
      } else {
        x1 = li2[0]
        x2 = le2[0]
      }
      if (li2[1] > le2[1]) {
        y1 = le1[1]
        y1 = li1[1]
      } else {
        y1 = li1[1]
        y1 = le1[1]
      }
      for (let ii = y1; ii <= y2; ii++) {
        //for (let jj = x1; jj <= x2; jj++) {
        if (ii >= i && getX(x1, y1, x2, y2, ii) >= j) {
          fill('red')
          console.log('color ' + i + ',' + j)
        }
        //}
      }
      rect(i, j, sq, sq)
    }
  }
  //line(0, 0, 0, 0)
  line(li2[0], li2[1], le2[0], le2[1])
  if (dline) {
    li2[0] = li1[0]
    li2[1] = li1[1]
    le2[0] = le1[0]
    le2[1] = le1[1]
    //          i: x1,y1; e: x2,y2
    console.log('i: ' + li1[0] + ',' + li1[1] + '; e: ' + le1[0] + ',' + le1[1])
    dline = false
  } else if (!lclick) {
    li2[0] = false
    li2[1] = false
    le2[0] = false
    le2[1] = false
  }
}

function mousePressed() {
  if (lclick) {
    if (mouseX >= bd && mouseX <= (size.w * sqsize) + (bd * 2) && mouseY >= bd && mouseY <= (size.h * sqsize) + (bd * 2)) {
      li1 = [mouseX, mouseY]
      lclick = false
    }
  } else {
    if (mouseX >= bd && mouseX <= (size.w * sqsize) + (bd * 2) && mouseY >= bd && mouseY <= (size.h * sqsize) + (bd * 2)) {
      le1 = [mouseX, mouseY]
      lclick = true
      dline = true
    }
  }
}

function getX(x1, y1, x2, y2, y) {
  return (((y - y1) * (x2 - x1)) / (y2 - y1)) + x1
}

function getY(x1, y1, x2, y2, x) {
  return (((x - x1) * (y2 - y1)) / (x2 - x1)) + y1
}
