let canvas
let canvasContext
const snakeHeight = 20
const moveX = 20
const appleX = 200
const appleY = 400
const moveY = 20

const snakeBody = [
  { x: 60, y: 80 },
  { x: 40, y: 80 },
  { x: 20, y: 80 },
  { x: 0, y: 80 }
]

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
      snakeBody[0].y <= 0 ? alert('Snake hit top wall. Game over!') : snakeBody[0].y -= moveY
      for (let i = 1; i < snakeBody.length; i++) {
        const snakePart = snakeBody[i]

        snakePart.x < snakeBody[0].x ? snakePart.x += moveX : snakePart.y -= moveY
      }
      break
    case 'ArrowRight':
      snakeBody[0].x === canvas.width - 20 ? alert('Snake hit right wall. Game over!') : snakeBody[0].x += moveX
      for (let i = 1; i < snakeBody.length; i++) {
        const snakePart = snakeBody[i]

        // starting position
        if (snakePart.y === snakeBody[0].y) {
          snakePart.x += moveX
        } else if (snakePart.y < snakeBody[0].y) { // head vertical down
          snakePart.y += moveY
        } else if (snakePart.y > snakeBody[0].y) { // head vertical up
          snakePart.y -= moveY
        }
      }
      break
    case 'ArrowDown':
      snakeBody[0].y >= canvas.height - snakeHeight ? alert('Snake hit bottom wall. Game over!') : snakeBody[0].y += moveY

      for (let i = 1; i < snakeBody.length; i++) {
        const snakePart = snakeBody[i]

        // starting position
        if (snakePart.x < snakeBody[0].x) {
          snakePart.x += moveX
        } else if (snakePart.y < snakeBody[0].y) { // head vertical down
          snakePart.y += moveY
        } else if (snakePart.y > snakeBody[0].y) { // head vertical up
          snakePart.y -= moveY
        // head facing left
        } else if (snakePart.x > snakeBody[0].x) {
          snakePart.x -= moveX
        }
      }
      break
    case 'ArrowLeft':
      snakeBody[0].x <= 0 ? alert('Snake hit left wall. Game Over!') : snakeBody[0].x -= moveX

      for (let i = 1; i < snakeBody.length; i++) {
        const snakePart = snakeBody[i]

        // head facing left
        if (snakePart.y === snakeBody[0].y && snakePart.x > snakeBody[0].x) {
          snakePart.x -= moveX
        } else if (snakePart.y < snakeBody[0].y) { // head vertical down
          snakePart.y += moveY
        } else if (snakePart.y > snakeBody[0].y) { // head vertical up
          snakePart.y -= moveY
        }
      }

      break
  }
}

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake () {
  canvasContext.fillStyle = '#303030'
  canvasContext.fillRect(snakeBody[0].x, snakeBody[0].y, 20, snakeHeight) // head
  canvasContext.fillStyle = 'blue'
  for (let i = 1; i < snakeBody.length; i++) {
    const element = snakeBody[i]
    canvasContext.fillRect(element.x, element.y, 20, snakeHeight)
  }
}

function drawApple () {
  canvasContext.fillStyle = ' #b11b1b'
  canvasContext.fillRect(appleX, appleY, 20, 20)
}

function eatApple () {
  if (snakeBody[0].x === appleX || snakeBody[0].y === appleY) {
    console.log('collision with apple!')
  }
}
