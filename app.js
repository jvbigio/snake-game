let canvas
let canvasContext
let snakeX = 50
const snakeY = 50
const appleX = 50

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  setInterval(() => {
    drawCanvas()
    moveSnake()
    drawApple()
  }, 50)
}

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function moveSnake () {
  snakeX += 10

  canvasContext.fillStyle = 'blue'
  // below 100px from left, 200px from top, 50px wide, 25px tall:
  canvasContext.fillRect(snakeX, 200, 50, 20)
}

function drawApple () {
  // appleX
  canvasContext.fillStyle = 'red'
  canvasContext.fillRect(appleX, 100, 20, 20)
}
