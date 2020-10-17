import gameOver from './modal.js'

let canvas
let canvasContext
const snakeHeight = 20
const moveX = 20
const moveY = 20
let direction

const snakeBody = [
  { x: 60, y: 80 },
  { x: 40, y: 80 },
  { x: 20, y: 80 },
  { x: 0, y: 80 }
]

const snakeHead = snakeBody[0]
const tail = snakeBody[snakeBody.length - 1]

const randomX = Math.random() * (780 + 20)
let appleX = randomX - (randomX % 20)
const randomY = Math.random() * (580 + 20)
let appleY = randomY - (randomY % 20)
let eatingApple = false

const score = document.querySelector('.points')
let playerScore = 0

const DEBUG = false

// let apple
// function newApple () {
//   apple = {
//     x: appleX,
//     y: appleY
//   }
//   return apple
// }

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  let gameInterval = 100

  if (DEBUG) {
    appleX = 120
    appleY = 80

    gameInterval = 1000
  }

  setInterval(() => {
    drawCanvas()
    drawSnake()
    drawApple()
    ateApple()
    updateScore()
  }, gameInterval)
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
  // make sure apple isn't randomized on top of snake (not working yet)
  if (eatingApple) {
    // draw new apple location when apple eaten
  }
}

function moveUp () {
  snakeHead.y < 0 ? gameOver() : snakeHead.y -= moveY

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
  snakeHead.y === canvas.height ? gameOver() : snakeHead.y += moveY

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
  snakeHead.x === canvas.width ? gameOver() : snakeHead.x += moveX

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
  snakeHead.x < 0 ? gameOver() : snakeHead.x -= moveX

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
// function newApple () {
//   const randomX = Math.random() * (780 + 80)
//   // appleX = randomX - (randomX % 20)
//   appleX = randomX - (randomX % 20)
//   const randomY = Math.random() * (580 + 100)
//   appleY = randomY - (randomY % 20)
//   return [appleX, appleY]
// }

function ateApple () {
  // console.log(eatingApple) // false
  if (snakeHead.x === appleX && snakeHead.y === appleY) {
    console.log('ate apple')
    // alert('ate apple')
    playerScore++
    eatingApple = true
  }
}

// why does updatingScore only work if it's placed inside setInterval. Why is most things only working when placed in setInterval?????
function updateScore () {
  if (eatingApple) {
    score.textContent = playerScore
    return playerScore
  }
}
