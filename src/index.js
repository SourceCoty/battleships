import {ship, gameBoard, ai, player, hit, over} from "./app"

const resetButton = document.getElementById("reset")
resetButton.addEventListener("click", (e) => {
    e.target.onclick = location.reload()
})


function createBoardOne (board) {
    const id = board.board.toString()
    const newBoard = document.getElementById(id)
    let counter = 0
    for (let i = 0; i<board.grid.length; i++) {
        const div = document.createElement('div')
        div.setAttribute("id", counter)
        div.className = "coordinate-one"

        if (board.grid[i].ship === true) {
            div.className = "coordinate-one ship"
        }

        newBoard.appendChild(div)
        counter++
    }
}

function createBoardTwo (board) {
    const id = board.board.toString()
    const newBoard = document.getElementById(id)
    let counter = 0
    for (let i = 0; i<board.grid.length; i++) {
        const div = document.createElement('a')
        div.setAttribute('href', '#')
        div.setAttribute("id", counter)
        div.className = "coordinate-two"

        if (board.grid[i].ship === true) {
            div.className = "coordinate-two ship"
        }
        
        newBoard.appendChild(div)
        counter++
    }
}

function generateMessage(string) {
    let messageBoard = document.getElementById("message-board")
    messageBoard.innerText = string
}

const gameController = (player, board) => {
    
    if (hit === true) {
        let move = player.processAdjacentMove()
        if (move !== null) {
            attackOne(move, board)
        }
    } else {
        let move = player.processMove()

        if (move !== null) {
            attackOne(move, board)
        } else {
            gameController(player, board)
        }
    }
}

function attackOne(coordinate, board) {
    board.receiveAttack(coordinate)
    
    let parent = document.getElementById("board-one")
    let div = parent.childNodes[coordinate]
    if (board.grid[coordinate].ship === true) {
       div.className = "coordinate-one hit"
    } else if (board.grid[coordinate] === "miss") {
        div.className = "coordinate-one miss"
        div.textContent = "."
    }
    board.reportGameStatus()
}

function attackTwo(coordinate, board) {
    board.receiveAttack(coordinate)
    
    let parent = document.getElementById("board-two")
    let div = parent.childNodes[coordinate]
    if (board.grid[coordinate].ship === true) {
       div.className = "coordinate-two hit"
    } else if (board.grid[coordinate] === "miss") {
        div.className = "coordinate-two miss"
        div.textContent = "."
    }
    board.reportGameStatus()
}

const generateGameBoard = () => {

    const carrierOne = ship("carrier", 5)
    const battleshipOne = ship("battleship", 4)
    const cruiserOne = ship("cruiser", 3)
    const submarineOne = ship("sub", 2)
    const destroyerOne = ship("destroyer", 2)

    const carrierTwo = ship("carrier", 5)
    const battleshipTwo = ship("battleship", 4)
    const cruiserTwo = ship("cruiser", 3)
    const submarineTwo = ship("sub", 2)
    const destroyerTwo = ship("destroyer", 2)

    const playerOne = player()
    const playerTwo = ai()

    const fleetOne = [carrierOne, battleshipOne, cruiserOne, submarineOne, destroyerOne]
    const fleetTwo = [carrierTwo, battleshipTwo, cruiserTwo, submarineTwo, destroyerTwo]

    const boardOne = gameBoard(playerOne, playerTwo, "board-one", fleetOne)
    const boardTwo = gameBoard(playerTwo, playerOne, "board-two", fleetTwo)

    boardOne.placeShip(carrierOne)
    boardOne.placeShip(battleshipOne)
    boardOne.placeShip(cruiserOne)
    boardOne.placeShip(destroyerOne)
    boardOne.placeShip(submarineOne)

    boardTwo.placeShip(carrierTwo)
    boardTwo.placeShip(battleshipTwo)
    boardTwo.placeShip(cruiserTwo)
    boardTwo.placeShip(destroyerTwo)
    boardTwo.placeShip(submarineTwo)

    createBoardOne(boardOne)
    createBoardTwo(boardTwo)
    generateMessage("pick your first move")

    const content = document.querySelector(".content")
    const tile = document.querySelectorAll(".coordinate-two")

    tile.forEach((el) => {
        el.addEventListener('click', function(e) {
            if(over === true) {
                content.setAttribute("id", "off");
            } else {
                const coordinate = el.id
                e.target.onclick = attackTwo(coordinate, boardTwo)
                content.setAttribute("id", "off")
            

                if(over === false) {
                    setTimeout(() => {
                        gameController(playerTwo, boardOne)
                        content.setAttribute("id", "on")
                    }, 500)
                }
            }
        })
    })
}
 generateGameBoard()

 export {createBoardOne, createBoardTwo, generateMessage, gameController, generateGameBoard, attackOne, attackTwo}