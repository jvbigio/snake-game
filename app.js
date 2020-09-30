let canvas
let canvasContext

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
  canvasContext.fillStyle = 'blue'
  // below 100px from left, 200px from top, 50px wide, 25px tall:
  canvasContext.fillRect(100, 200, 75, 25)
  canvasContext.fillStyle = 'red'
  canvasContext.fillRect(230, 230, 25, 25)
}
