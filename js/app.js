import gameOver from './modal.js'

let canvas
let canvasContext
const snakeHeight = 20
const moveX = 20
const moveY = 20
let apple
const score = document.querySelector('.points')
let playerScore = 0
// score.textContent = playerScore

// why does updatingScore only work if it's placed inside setInterval. Why is most things only working when placed in setInterval?????
function updateScore () {
  if (eatingApple) {
    score.textContent = playerScore
    return playerScore
  }
}
// function randomXLocation () {
//   const randomX = Math.random() * (780 + 20) // orig
//   const appleX = randomX - (randomX % 20) // orig
//   return appleX
// }

// function randomYLocation () {
//   const randomY = Math.random() * (580 + 20)
//   const appleY = randomY - (randomY % 20)
//   return appleY
// }
const randomX = Math.random() * (780 + 20) // orig
let appleX = randomX - (randomX % 20) // orig
const randomY = Math.random() * (580 + 20) // orig
let appleY = randomY - (randomY % 20) // orig
let eatingApple = false
const DEBUG = false

function newApple () {
  apple = {
    x: appleX,
    y: appleY
  }
  return apple
}
console.log(newApple(appleX, appleY))
// let appleX, appleY
// let apple
// let apple = {
//   x: randomXLocation(appleX),
//   y: randomYLocation(appleY)
// }
// console.log(apple.x, apple.y)
// below works but not ideal bc hardcoded values. won't work when game is ongoing eating the apple
// const randomX = Math.floor(Math.random() * 701) + 80
// const appleX = randomX - (randomX % 20)
// const randomY = Math.floor(Math.random() * 481) + 100
// const appleY = randomY - (randomY % 20)
// console.log(appleX, appleY)

// function random (80, 780) {
//   let randomX = Math.random() * (780 - 80) + 80
// }
// function newApple () {
//   const randomX = Math.random() * (780 + 80)
//   // appleX = randomX - (randomX % 20)
//   appleX = randomX - (randomX % 20)
//   const randomY = Math.random() * (580 + 100)
//   appleY = randomY - (randomY % 20)
//   // return [appleX, appleY]
//   apple = {
//     x: appleX,
//     y: appleY
//   }
//   return apple
// }
// console.log(appleX, appleY)
let direction

const snakeBody = [
  { x: 60, y: 80 },
  { x: 40, y: 80 },
  { x: 20, y: 80 },
  { x: 0, y: 80 }
]
// snakeBody.forEach(part => console.log(part.x))

const snakeHead = snakeBody[0]
const tail = snakeBody[snakeBody.length - 1]

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  // const framesPerSecond = 10 // 20 // original
  // updateScore() // doesn't work

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
  // }, 1000 / framesPerSecond) // orig
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
  canvasContext.fillRect(appleX, appleY, 20, 20) // orig
  // canvasContext.fillRect(apple.x, apple.y, 20, 20)
  // make sure apple isn't randomized on top of snake (not working yet)
  // console.log(appleX, appleY)
  // function newApple () {
  //   const randomX = Math.random() * (780 + 80)
  //   // appleX = randomX - (randomX % 20)
  //   appleX = randomX - (randomX % 20)
  //   const randomY = Math.random() * (580 + 100)
  //   appleY = randomY - (randomY % 20)
  //   return [appleX, appleY]
  //   // apple = {
  //   //   x: appleX,
  //   //   y: appleY
  //   // }
  //   // return apple
  // }
  // draw new apple location when apple eaten
  if (eatingApple) {
    // playerScore++ // doesn't work
    console.log(eatingApple)
    apple = newApple()
  }
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
  if (snakeHead.x === appleX && snakeHead.y === appleY) { // orig
    console.log('ate apple')
    // alert('ate apple')
    playerScore++
    console.log(playerScore)
    eatingApple = true
    // gameOver()

    // andy's code
    // isSnakeEatingApple = checkIfSnakeisEatingApple()

    // if (isSnakeEatingApple) {
    //   alert('Snake is eating apple')
    // }

  //   if (eatingApple) {
  //     console.log(eatingApple)
  //     apple = newApple()
  //   }
  }
}
