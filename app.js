document.addEventListener('DOMContentLoaded', () =>{
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 30
    let currentIndex = 0 // so first div in our grid
    let appleIndex = 0 // so first div in our grid
    let currentSnake = [2, 1, 0] // so the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL, iwht all 1)'s being the body from now on

    let direction = 1
    let score = 0
    let speed = 0.8
    let intervalTime = 0
    let interval = 0

    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 100
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that deal siwth All the ove outcomes of the snake
    //deals with snake hitting border and snake hitting self
    //deals with snake getting apple

    function moveOutcomes() {


        if ((currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width -1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
            return clearInterval(interval)


        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction) //gives direction tot eh head of the snake

        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)

            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')



    }



    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)

        } while (squares[appleIndex].classList.contains('snake')) {
            squares[appleIndex].classList.add('apple')
        }
    }



    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') //we are removing the class of snake 

        if (e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will
        } else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up 
        } else if (e.keyCode === 37) {
            direction = -1
        } else if (e.keyCode === 40) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs from wher eyou are no
        }
    }


    document.addEventListener('keydown', control)

    startBtn.addEventListener('click', startGame)




})