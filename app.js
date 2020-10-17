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

const snakeHead = snakeBody[0]
const tail = snakeBody[snakeBody.length - 1]

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  const framesPerSecond = 10 // 20

  setInterval(() => {
    drawCanvas()
    drawSnake()
    drawApple()
    eatApple()
  }, 1000 / framesPerSecond)
}

window.addEventListener('keydown', e => {
  const keyPress = e.key
  direction = keyPress
})

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake () {
  canvasContext.fillStyle = '#303030'
  canvasContext.fillRect(snakeHead.x, snakeHead.y, 20, snakeHeight)
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
  snakeHead.y < 0 ? console.log('Snake hit top wall. Game over!') : snakeHead.y -= moveY

  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.x < snakeHead.x) {
      snakePart.x += moveX
    } else if (snakePart.x > snakeHead.x) {
      snakePart.x -= moveX
    } else {
      snakePart.y -= moveY
    }
  }
}

function moveDown () {
  snakeHead.y === canvas.height ? console.log('Snake hit bottom wall. Game over!') : snakeHead.y += moveY

  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.x < snakeHead.x) {
      snakePart.x += moveX
    } else if (snakePart.x > snakeHead.x) {
      snakePart.x -= moveX
    } else {
      snakePart.y += moveY
    }
  }
}

function moveRight () {
  snakeHead.x === canvas.width ? console.log('Snake hit right wall. Game over!') : snakeHead.x += moveX

  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.y === snakeHead.y) {
      snakePart.x += moveX
    } else if (snakePart.y < snakeHead.y) {
      snakePart.y += moveY
    } else if (snakePart.y > snakeHead.y) {
      snakePart.y -= moveY
    }
  }
}
function moveLeft () {
  snakeHead.x < 0 ? console.log('Snake hit left wall. Game Over!') : snakeHead.x -= moveX

  for (let i = 1; i < snakeBody.length; i++) {
    const snakePart = snakeBody[i]

    if (snakePart.y === snakeHead.y) {
      snakePart.x -= moveX
    } else if (snakePart.y < snakeHead.y) {
      snakePart.y += moveY
    } else if (snakePart.y > snakeHead.y) {
      snakePart.y -= moveY
    }
  }
}

function eatApple () {
  if (snakeHead.x === appleX && snakeHead.y === appleY) {
    console.log('ate apple')
    // gameOver()
  }
}

// function gameOver () {
//   window.location.reload()
// }
