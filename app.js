
let canvas
let canvasContext
const snakeHeight = 20
const moveX = 20
const moveY = 20
let direction

// added two body parts for testing
const snakeBody = [
  // { x: 100, y: 80 },
  // { x: 80, y: 80 },
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
    // appleX = 160
    appleX = 120
    appleY = 80

    gameInterval = 1000
  }

  setInterval(() => {
    drawCanvas()
    drawApple()
    // check to see if snake is about to eat apple
    eatingApple = false
    ateApple()
    if (eatingApple) {
      // console.log(eatingApple) // true
      // if so then grow apple
      // clone current head
      const clonedHead = snakeBody.unshift(snakeBody[0])
      // console.log(clonedHead) // 5
      // move the clone in the current direction

      // add clone to the beginning of the snakeBody array

      // add score

      // move apple position
    } else {
      moveSnake() // see todo notes
    }
    drawSnake()
    wallCollision()
    updateScore()
  }, gameInterval)
}

// TODO: you don't always want to move the snake. say snake is 2 length, just when its about to hit apple, we want to check if snake is about to eat apple, stop moving snake, add new head piece where apple is (left, right, up, down). otherwise, go ahead and keep moving

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

  if (direction === 'ArrowUp') {
    snakeBody[0].y -= moveY
  } else if (direction === 'ArrowRight') {
    snakeBody[0].x += moveX
  } else if (direction === 'ArrowDown') {
    snakeBody[0].y += moveY
  } else if (direction === 'ArrowLeft') {
    snakeBody[0].x -= moveX
  }
}

// function growSnake () {
//   // canvasContext.fillStyle = '#303030'
//   // snakeBody.unshift(snakeBody[0])
//   // canvasContext.fillRect(snakeBody[0].x, snakeBody[0].y, 20, snakeHeight)
//   // canvasContext.fillStyle = 'blue'
//   // for (let i = 1; i < snakeBody.length; i++) {
//   //   const element = snakeBody[i]

//   //   // skip an iteration???
//   //   if (element === 1) {
//   //     continue
//   //   }
//   //   canvasContext.fillRect(element.x, element.y, 20, snakeHeight)
//   // }
// }

function drawApple () {
  canvasContext.fillStyle = '#b11b1b'
  canvasContext.fillRect(appleX, appleY, 20, 20)
  eatingApple = false
}

function ateApple () {
  // if (snakeBody[0].x === appleX && snakeBody[0].y === appleY) {
  // if ((snakeBody[0].x + 20 === appleX) && (snakeBody[0].y === appleY) || (snakeBody[0].x - 20 === appleX) && (snakeBody[0].y === appleY) || (snakeBody[0].y + 20 === appleY) && (snakeBody[0].x === appleX) || (snakeBody[0].y - 20 === appleY) && (snakeBody[0].x === appleX)) {
  if ((snakeBody[0].x + 20 === appleX && snakeBody[0].y === appleY) || (snakeBody[0].x - 20 === appleX && snakeBody[0].y === appleY) || (snakeBody[0].y + 20 === appleY && snakeBody[0].x === appleX) || (snakeBody[0].y - 20 === appleY && snakeBody[0].x === appleX)) {
    console.log('ate')
    eatingApple = true
    console.log(eatingApple)
    newApple()
    // growSnake()
    playerScore++
  }
}

function newApple () {
  const randomX = Math.random() * (780 + 20)
  appleX = randomX - (randomX % 20)
  const randomY = Math.random() * (580 + 20)
  appleY = randomY - (randomY % 20)
  // check if apple x, apple y is on top of snake:
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
    window.location.reload()
  })

  bodyBlackout.addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    window.location.reload()
  })
  playerScore = 0
}
