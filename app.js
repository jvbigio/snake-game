let canvas
let canvasContext
const snakeHeight = 20
const snakeSpeedX = 20
const snakeSpeedY = 20
const appleX = 200
const appleY = 400
const deltaY = 20
const snakeBody = [{ x: 60, y: 80 }, { x: 40, y: 80 }, { x: 20, y: 80 }]

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
      snakeBody[0].y < 0 ? alert('Snake hit top wall. Game over!') : snakeBody[0].y -= snakeSpeedY
      break
    case 'ArrowRight':
      // Why snakeBody[0].x (head) doesn't work? for right wall collision
      snakeBody[2].x >= canvas.width ? alert('Snake hit right wall. Game over!') : snakeBody[2].x += snakeSpeedX // why snakeBody[0].x (head) doesn't work??
      break
    case 'ArrowDown':
      snakeBody[0].y >= canvas.height ? alert('Snake hit bottom wall. Game over!') : moveDown()
      break
    case 'ArrowLeft':
      snakeBody[0].x < 0 ? alert('Snake hit left wall. Game Over!') : snakeBody[0].x -= snakeSpeedX
      break
  }
}

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake () {
  canvasContext.fillStyle = '#303030'
  // // from left, from top, width, height:
  canvasContext.fillRect(snakeBody[2].x, snakeBody[0].y, snakeBody[0].x + 20, snakeHeight)
  canvasContext.fillStyle = 'blue'
  canvasContext.fillRect(snakeBody[2].x, snakeBody[0].y, snakeBody[0].x, snakeHeight)
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

function moveDown () {
  snakeBody[0].y += snakeSpeedY
}
