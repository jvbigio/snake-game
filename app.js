
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

let appleX = 0
let appleY = 0
let eatingApple = false
newApple()

const score = document.querySelector('.points')
let playerScore = 0

const DEBUG = false

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
    drawApple()
    drawSnake()
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

function growSnake () {
  // if (eatingApple) {
  //   const newSnake = snakeBody.unshift(snakeBody[0])
  //   // for (let i = 2; i < newSnake.length; i++) {
  //   snakeHead = newSnake[0]
  //   // }
  //   canvasContext.fillStyle = '#303030'
  //   canvasContext.fillRect(snakeHead.x, snakeHead.y, 20, snakeHeight)
  // }
}

function drawApple () {
  canvasContext.fillStyle = '#b11b1b'
  canvasContext.fillRect(appleX, appleY, 20, 20)
  eatingApple = false
}

function ateApple () {
  // keep line below. Original, works, just testing snake ALMOST ABOUT TO EAT APPLE:
  // if (snakeHead.x === appleX && snakeHead.y === appleY) { // KEEP
  if (snakeHead.x + moveX === appleX && snakeHead.y === appleY) {
    eatingApple = true
    newApple()
    growSnake()
    playerScore++
  }
}

function newApple () {
  eatingApple = false
  const randomX = Math.random() * (780 + 20)
  appleX = randomX - (randomX % 20)
  const randomY = Math.random() * (580 + 20)
  appleY = randomY - (randomY % 20)
  // check if apple x, apple y is on top of snake:
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

function updateScore () {
  if (eatingApple) {
    score.textContent = playerScore
    return playerScore
  }
}

// MODAL //
const bodyBlackout = document.querySelector('.body-blackout')
const popupModal = document.querySelector('.popup-modal')

function gameOver () {
  popupModal.classList.add('is--visible')
  bodyBlackout.classList.add('is-blacked-out')

  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    window.location.reload()
  })

  bodyBlackout.addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    window.location.reload()
  })
  playerScore = 0
}
