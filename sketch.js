/*
rect(x:position x, y: position y, x: width, y: height)
mouseX: use the x position from the mouse
mouseY: use the y position from the mouse
*/
var bgColor = '#EEEEEE'
var size = { w: 30, h: 30 }
var sqsize = 20
var bd = 20 // border

function setup() {
  // put setup code here
}

function draw() {
  // put drawing code here
  grid()
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
  noStroke()

  for (let i = bd, c = 0; i < (h * sq) + bd; i += sq, c++) {
    let cc = colors[c]
    for (let j = bd; j < (w * sq) + bd; j += sq) {
      fill(cc[0], cc[1], cc[2])
      rect(i, j, sq, sq)
    }
  }
}
