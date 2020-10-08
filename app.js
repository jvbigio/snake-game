let canvas
let canvasContext
let snakeX = 150
const snakeSpeedX = 50
let snakeY = 200
const snakeSpeedY = 50
const appleX = 50
const appleY = 100

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
  canvasContext.fillStyle = '#303030'
  canvasContext.fillRect(snakeX, snakeY, snakeBody.x + 20, snakeBody.y)
  canvasContext.fillStyle = 'blue'
  canvasContext.fillRect(snakeX, snakeY, snakeBody.x, snakeBody.y)
}

function drawApple () {
  canvasContext.fillStyle = ' #b11b1b'
  canvasContext.fillRect(appleX, appleY, 20, 20)
}

if (snakeBody.x >= appleX || snakeBody.y === appleY) {
  alert('collision with apple!')
}
