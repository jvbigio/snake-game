let canvas
let canvasContext
let snakeX = 50
const snakeSpeedX = 50
let snakeY = 200
const snakeSpeedY = 50
const appleX = 50

const snakeBody = {
  x: 40,
  y: 20
}

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  const framesPerSecond = 30

  setInterval(() => {
    drawCanvas()
    drawSnake()
    drawApple()
  }, 1000 / framesPerSecond)
}

window.addEventListener('keydown', gameControls)

function gameControls (e) {
  switch (e.key) {
    case 'ArrowUp':
      snakeY < 0 ? alert('Snake hit top wall. Game over!') : snakeY -= snakeSpeedY
      break
    case 'ArrowRight':
      snakeX >= canvas.width ? alert('Snake hit right wall. Game over!') : snakeX += snakeSpeedX
      break
    case 'ArrowDown':
      snakeY >= canvas.height ? alert('Snake hit bottom wall. Game over!') : snakeY += snakeSpeedY
      break
    case 'ArrowLeft':
      snakeX < 0 ? alert('Snake hit left wall. Game Over!') : snakeX -= snakeSpeedX
      break
  }
}

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake () {
  canvasContext.fillStyle = 'black'
  canvasContext.fillRect(snakeX + 20, snakeY, snakeBody.x, snakeBody.y)
  canvasContext.fillStyle = 'blue'
  // canvasContext.fillRect(snakeX, snakeY, 50, 20)
  // canvasContext.clearRect(snakeX, snakeY, snakeBody.x, snakeBody.y)
  canvasContext.fillRect(snakeX, snakeY, snakeBody.x, snakeBody.y)
}

function drawApple () {
  canvasContext.fillStyle = ' #b11b1b'
  canvasContext.fillRect(appleX, 100, 20, 20)
}
