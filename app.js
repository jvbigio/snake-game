let canvas
let canvasContext
const snakeHeight = 20
const moveX = 20
const moveY = 20
const randomX = Math.random() * (780 + 20)
const appleX = randomX - (randomX % 20)
const randomY = Math.random() * (580 + 20)
const appleY = randomY - (randomY % 20)
let direction

const snakeBody = [
  { x: 60, y: 80 },
  { x: 40, y: 80 },
  { x: 20, y: 80 },
  { x: 0, y: 80 }
]

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  drawApple()
  const framesPerSecond = 20

  setInterval(() => {
    drawCanvas()
    drawSnake()
    drawApple()
  }, 1000 / framesPerSecond)
}
window.addEventListener('keydown', gameControls)

function gameControls (e) {
  const keyPress = e.key
  switch (keyPress) {
    case 'ArrowUp':
      snakeBody[0].y <= 0 ? alert('Snake hit top wall. Game over!') : moveUp()
      direction = keyPress
      break
    case 'ArrowRight':
      snakeBody[0].x === canvas.width - 20 ? alert('Snake hit right wall. Game over!') : moveRight()
      direction = keyPress
      break
    case 'ArrowDown':
      snakeBody[0].y >= canvas.height - snakeHeight ? alert('Snake hit bottom wall. Game over!') : moveDown()
      direction = keyPress
      break
    case 'ArrowLeft':
      snakeBody[0].x <= 0 ? alert('Snake hit left wall. Game Over!') : moveLeft()
      direction = keyPress
      break
  }
  e.preventDefault()
}

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake () {
  canvasContext.fillStyle = '#303030'
  canvasContext.fillRect(snakeBody[0].x, snakeBody[0].y, 20, snakeHeight)
  canvasContext.fillStyle = 'blue'
  for (let i = 1; i < snakeBody.length; i++) {
    const element = snakeBody[i]
    canvasContext.fillRect(element.x, element.y, 20, snakeHeight)
  }
  if (direction === 'ArrowUp') {
    moveUp()
  } else if (direction === 'ArrowRight') {
    moveRight()
  } else if (direction === 'ArrowDown') {
    moveDown()
  } else if (direction === 'ArrowLeft') {
    moveLeft()
  }
}

function drawApple () {
  canvasContext.fillStyle = '#b11b1b'
  canvasContext.fillRect(appleX, appleY, 20, 20)
}

function moveUp () {
  snakeBody[0].y -= moveY

  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.x < snakeBody[0].x) {
      snakePart.x += moveX
    } else if (snakePart.x > snakeBody[0].x) {
      snakePart.x -= moveX
    } else {
      snakePart.y -= moveY
    }
  }
}

function moveRight () {
  snakeBody[0].x += moveX
  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.y === snakeBody[0].y) {
      snakePart.x += moveX
    } else if (snakePart.y < snakeBody[0].y) {
      snakePart.y += moveY
    } else if (snakePart.y > snakeBody[0].y) {
      snakePart.y -= moveY
    }
  }
}

function moveDown () {
  snakeBody[0].y += moveY

  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.x < snakeBody[0].x) {
      snakePart.x += moveX
    } else if (snakePart.x > snakeBody[0].x) {
      snakePart.x -= moveX
    } else {
      snakePart.y += moveY
    }
  }
}

function moveLeft () {
  snakeBody[0].x -= moveX

  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.y === snakeBody[0].y && snakePart.x > snakeBody[0].x) {
      snakePart.x -= moveX
    } else if (snakePart.y < snakeBody[0].y) {
      snakePart.y += moveY
    } else if (snakePart.y > snakeBody[0].y) {
      snakePart.y -= moveY
    }
  }
}
