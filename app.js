let canvas
let canvasContext
let snakeX = 150
const snakeSpeedX = 50
let snakeY = 200
const snakeSpeedY = 50
const appleX = 50
const appleY = 100

const snakeBody = [{ x: 20, y: 80 }, { x: 40, y: 80 }, { x: 60, y: 80 }]

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  eatApple()
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
      // snakeY >= canvas.height ? alert('Snake hit bottom wall. Game over!') : snakeY += snakeSpeedY // whole body moves down
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
  snakeBody.forEach(snake => {
    canvasContext.fillStyle = '#303030'
    // from left, from top, width, height:
    canvasContext.fillRect(snakeX, snakeY, snake.x + 20, 20)
    canvasContext.fillStyle = 'blue'
    canvasContext.fillRect(snakeX, snakeY, snake.x, 20)
  })
}

function drawApple () {
  canvasContext.fillStyle = ' #b11b1b'
  canvasContext.fillRect(appleX, appleY, 20, 20)
}

function eatApple () {
  if (snakeBody.x === appleX || snakeBody.y === appleY) {
    console.log('collision with apple!')
  }
}
