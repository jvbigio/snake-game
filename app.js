let canvas
let canvasContext
const snakeHeight = 20
const moveX = 20
const moveY = 20
let direction

let squishSound

function sound (src) {
  this.sound = document.createElement('audio')
  this.sound.src = src
  this.sound.setAttribute('preload', 'auto')
  this.sound.setAttribute('controls', 'none')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.play = function () {
    this.sound.play()
  }
  this.stop = function () {
    this.sound.pause()
  }
}

function init () {
  score.textContent = 0
  // squishSound = new sound('/sound/squish.mp3')
  // const squishSound = new sound('/sound/squish.mp3')
  newApple()
  snakeBody = [
    { x: 60, y: 80 },
    { x: 40, y: 80 },
    { x: 20, y: 80 },
    { x: 0, y: 80 }
  ]
  direction = ''
}

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

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  let gameInterval = 100
  // init() // test
  const DEBUG = false

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

window.addEventListener('keydown', e => {
  // e.preventDefault()
  const keyPress = e.key

  if (keyPress === 'ArrowDown' && direction !== 'ArrowUp') {
    direction = 'ArrowDown'
  } else if (keyPress === 'ArrowUp' && direction !== 'ArrowDown') {
    direction = 'ArrowUp'
  } else if (keyPress === 'ArrowRight' && direction !== 'ArrowLeft') {
    direction = 'ArrowRight'
  } else if (keyPress === 'ArrowLeft' && direction !== 'ArrowRight') {
    direction = 'ArrowLeft'
  }
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

  if (!eatingApple) {
    snakeBody.forEach(snake => {
      if (snake.x === appleX && snake.y === appleY) {
        newApple()
      }
    })
  }
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
    squishSound('/sound/squish.mp3')
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
const imageContainer = document.querySelector('.image-container')

function gameOver () {
  popupModal.classList.add('is--visible')
  bodyBlackout.classList.add('is-blacked-out')

  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    init()
  })

  bodyBlackout.addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    init()
  })

  imageContainer.addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    init()
  })
}
