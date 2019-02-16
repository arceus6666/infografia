function rect(x, y, w, h) {
  let draw = document.getElementById('canvas').getContext('2d')
  draw.moveTo(x, y)
  draw.lineTo(x, y + h)
  draw.lineTo(x + w, y + h)
  draw.lineTo(x + w, y)
  draw.lineTo(x, y)
  draw.stroke()
}