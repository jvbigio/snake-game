let canvas
let canvasContext
const snakeHeight = 20
const moveX = 20
const moveY = 20
let direction
// let changedDirection = false // test
// let facing = 'right' // test
let hasKeyBeenPressed = false

// TODO: fix movement violations... moving right can't move backwards.

let snakeBody = [
  { x: 60, y: 80 },
  { x: 40, y: 80 },
  { x: 20, y: 80 },
  { x: 0, y: 80 }
]

let appleX = 0
let appleY = 0
let eatingApple
newApple()

const score = document.querySelector('.points')
let playerScore = 0

const DEBUG = true

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
    eatingApple = false
    const isSnakeAboutToEatApple = ateApple()
    if (isSnakeAboutToEatApple) {
      const clonedHead = JSON.parse(JSON.stringify(snakeBody[0]))
      if (direction === 'ArrowRight') {
        clonedHead.x += moveX
      } else if (direction === 'ArrowDown') {
        clonedHead.y += moveY
      } else if (direction === 'ArrowLeft') {
        clonedHead.x -= moveX
      } else if (direction === 'ArrowUp') {
        clonedHead.y -= moveY
      }
      snakeBody.unshift(clonedHead)
      playerScore++
      newApple()
    } else {
      moveSnake()
    }
    drawSnake()
    snakeCollision()
    wallCollision()
    updateScore()
  }, gameInterval)
}

// original
// window.addEventListener('keydown', e => {
//   const keyPress = e.key
//   direction = keyPress
// })

// TEST
window.addEventListener('keydown', e => {
  const keyPress = e.key
  if (!hasKeyBeenPressed) {
    hasKeyBeenPressed = true
    console.log(hasKeyBeenPressed)
    direction = keyPress
  }
})

// TEST
window.addEventListener('keyup', () => {
  console.log('keyed up')
  hasKeyBeenPressed = false
  console.log(hasKeyBeenPressed)
})

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
}

function moveSnake () {
  if (!direction) { return }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i].x = snakeBody[i - 1].x
    snakeBody[i].y = snakeBody[i - 1].y
  }
  // original..refactoring below for movement violations
  if (direction === 'ArrowUp') {
    snakeBody[0].y -= moveY
  } else if (direction === 'ArrowRight') {
    snakeBody[0].x += moveX
  } else if (direction === 'ArrowDown') {
    snakeBody[0].y += moveY
  } else if (direction === 'ArrowLeft') {
    snakeBody[0].x -= moveX
  }

  // TEST
  // if (direction === 'ArrowUp' && facing !== 'down') {
  //   facing = 'up'
  //   snakeBody[0].y -= moveY
  // } else if (direction === 'ArrowRight' && facing !== 'left') {
  //   facing = 'right'
  //   snakeBody[0].x += moveX
  // } else if (direction === 'ArrowDown' && facing !== 'up') {
  //   facing = 'down'
  //   snakeBody[0].y += moveY
  // } else if (direction === 'ArrowLeft' && facing !== 'right') {
  //   snakeBody[0].x -= moveX
  //   facing = 'left'
  // } else if (direction === 'ArrowLeft' && facing === 'right') {
  //   // snakeBody[0].x += moveX
  //   return false
  // } else {
  //   return false
  // }
}

function drawApple () {
  canvasContext.fillStyle = '#b11b1b'
  canvasContext.fillRect(appleX, appleY, 20, 20)
  eatingApple = false
}

function ateApple () {
  if (snakeBody[0].x === appleX && snakeBody[0].y === appleY) {
    eatingApple = true
  }
  return eatingApple
}

function newApple () {
  const randomX = Math.random() * (780 + 20)
  appleX = randomX - (randomX % 20)
  const randomY = Math.random() * (580 + 20)
  appleY = randomY - (randomY % 20)
  // check if apple x, apple y is on top of snake:
  // if (!eatingApple) {
  // snakeBody.forEach(snake => {
  //   if (!eatingApple && snake === appleX && appleY) {
  //     return newApple()
  //   }
  // })
}

function snakeCollision () {
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
      gameOver()
    }
  }
}

function wallCollision () {
  if (snakeBody[0].y < 0 || snakeBody[0].y === canvas.height || snakeBody[0].x === canvas.width || snakeBody[0].x < 0) {
    gameOver()
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
    // window.location.reload() // instead of reload, try resetting snake
  })

  bodyBlackout.addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    // window.location.reload()
  })
  playerScore = 0
  snakeBody = [
    { x: 60, y: 80 },
    { x: 40, y: 80 },
    { x: 20, y: 80 },
    { x: 0, y: 80 }
  ]
  direction = ''
}
