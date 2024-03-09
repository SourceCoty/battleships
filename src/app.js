// const resetButton = document.getElementById("reset")
// resetButton.addEventListener("click", (e) => {
//     e.target.onclick = location.reload()
// })

let over = false
let hit = false

import { createBoardOne, createBoardTwo, generateMessage, generateGameBoard, gameController, attackOne, attackTwo } from "."
const ship = (type, length) => {
    let health = length
    let hits = 0
    let sunk = false
    let name = type
    let ship = true

    let getHealth = () => health

    const hit = () => {
        hits++
        health--
        if (health <= 0) {
            health = 0
        }

        return health 
    }

    const isSunk = () => {
        if (health === 0) {
            sunk = true;
            return sunk
        } else {
            return false
        }
    }

    return {getHealth, hit, isSunk, name, length, ship}
}


const gameBoard = (playerOne, playerTwo, boardName, ships) => {
    let grid = []
    let proceedToBoard = null
    let proceedToPlace = null
    const flotilla = [...ships]
    const player = playerOne.name
    const opponent = playerTwo.name
    const board = boardName
    
    function createGrid () {
        for (let i = 0; i < 100; i++) {
            grid.push(i)
        }
    }

    function placeShip (ship) {
        let coordinate = generateCoordinate()

        checkCoordinate(coordinate, ship)
        limitBoard(coordinate, ship)

        if (proceedToBoard === true && proceedToPlace === true) {
            addToGameBoard(coordinate, ship)
        } else {
            placeShip(ship)
        }
    }

    function generateCoordinate () {
        return Math.floor(Math.random() * 100)
    }

    function checkCoordinate(coordinate, ship) {
        let length = ship.length
        let validCoordinates = []
        
        for (let i = 0; i < length; i++) {
            if (typeof grid[coordinate + i] === "number") {
                validCoordinates.push(coordinate)
            }
        } 

        if (validCoordinates.length === ship.length) {
            proceedToBoard = true
        } else {
            proceedToBoard = false
        }
    }

    function limitBoard(coordinate, ship) {
        let length = ship.length
        
        if (coordinate < 10) {
            if (coordinate + length > 10) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 9 && coordinate < 20) {
            if (coordinate + length > 20) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 19 && coordinate < 30) {
            if (coordinate + length > 30) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 29 && coordinate < 40) {
            if (coordinate + length > 40) {
                proceedToPlace = false
            } else {
                return proceedToPlace = true
            }
        } else if (coordinate > 39 && coordinate < 50) {
            if (coordinate + length > 50) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 49 && coordinate < 60) {
            if (coordinate + length > 60) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 59 && coordinate < 70) {
            if (coordinate + length > 70) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 69 && coordinate < 80) {
            if (coordinate + length > 80) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 79 && coordinate < 90) {
            if (coordinate + length > 89) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } else if (coordinate > 89 && coordinate < 100) {
            if (coordinate + length > 100) {
                proceedToPlace = false
            } else {
                proceedToPlace = true
            }
        } 
        return
    }

    function addToGameBoard(coordinate, ship) {
        let progress = coordinate
        let length = ship.length
        let storage = []
        
        for (let i = 0; i < length; i++) {
           if (typeof grid[progress] !== "number") {
            generateMessage("This coordinate has already been taken.")
            break 
           }
           storage.push(grid[progress])
           progress++
        }
        
        if (storage.length == ship.length) {
            for (let i = 0; i < length; i++) {
                let storedValue = storage[i]
                grid[storedValue] = ship
            }
        }
    }

    function resetGameBoard() {
        grid = []
        createGrid()
    }

    function receiveAttack(coordinate) {
        if (grid[coordinate].ship === true) {
            grid[coordinate].hit()
            generateMessage(`direct hit to ${player}'s ${grid[coordinate].name}`)
            if (player !== "computer") {
                hit = true
            }
        } else {
            generateMessage(`${opponent} missed at coordinate #${grid[coordinate]}`)
            grid[coordinate] = "miss"
            if (player !== "computer") {
                hit = false
            }
        }
    }

    function reportGameStatus () {
        const content = document.querySelector(".content")
        let tally = []

        for (let i = 0; i < flotilla.length; i++) {
            if (flotilla[i].isSunk() === true) {
                tally.push("sunk")
            }
        }

        if (tally.length === flotilla.length) {
            if (player === "computer") {
                generateMessage(`${player}'s fleet has been sunk`)
                content.setAttribute('id', 'off')
                over = true
            } else {
                generateMessage(`your fleet has been sunk`)
                content.setAttribute('id', 'off')
                over = true
            }
        } else {
           return
        }
    }

    createGrid()

    return {grid, createGrid, placeShip, receiveAttack, reportGameStatus, resetGameBoard, flotilla, player, board}
}

const player = () => {
    const name = "player one"

    return {name}
} 


const ai = () => {
    const name = "computer"
    const pastMoves = []
    let move = null

    function processAdjacentMove() {
        move = pastMoves[pastMoves.length -1] + 1
        
        if (move > 99) {
            move = null
            hit = false
        }

        for (let i = 0; i < pastMoves.length; i++) {
            if (pastMoves[i] === move) {
                move = null
                hit = false
            } 
        }

        if (move !== null) {
            storeMove()
        }
        
        return move
    }

    function processMove() {
        genMove()
        return move
    }

    function genMove() {
            let number = Math.floor(Math.random() * 100)
            move = number
            checkMove()
        }
    
     
     function checkMove() {
        if (move > 99) {
            move = null
            hit = false
        }

        for (let i = 0; i < pastMoves.length; i++) {
            if (pastMoves[i] === move) {
                move = null
                hit = false
            } 
        }

        if (move !== null) {
            storeMove()
        }
     }
    
     function storeMove() {
        pastMoves.push(move)
     }

     return {processMove, processAdjacentMove, name}
}

// function createBoardOne (board) {
//     const id = board.board.toString()
//     const newBoard = document.getElementById(id)
//     let counter = 0
//     for (let i = 0; i<board.grid.length; i++) {
//         const div = document.createElement('div')
//         div.setAttribute("id", counter)
//         div.className = "coordinate-one"

//         if (board.grid[i].ship === true) {
//             div.className = "coordinate-one ship"
//         }

//         newBoard.appendChild(div)
//         counter++
//     }
// }

// function createBoardTwo (board) {
//     const id = board.board.toString()
//     const newBoard = document.getElementById(id)
//     let counter = 0
//     for (let i = 0; i<board.grid.length; i++) {
//         const div = document.createElement('a')
//         div.setAttribute('href', '#')
//         div.setAttribute("id", counter)
//         div.className = "coordinate-two"

//         if (board.grid[i].ship === true) {
//             div.className = "coordinate-two ship"
//         }
        
//         newBoard.appendChild(div)
//         counter++
//     }
// }

// function attackOne(coordinate, board) {
//     board.receiveAttack(coordinate)
    
//     let parent = document.getElementById("board-one")
//     let div = parent.childNodes[coordinate]
//     if (board.grid[coordinate].ship === true) {
//        div.className = "coordinate-one hit"
//     } else if (board.grid[coordinate] === "miss") {
//         div.className = "coordinate-one miss"
//         div.textContent = "."
//     }
//     board.reportGameStatus()
// }

// function attackTwo(coordinate, board) {
//     board.receiveAttack(coordinate)
    
//     let parent = document.getElementById("board-two")
//     let div = parent.childNodes[coordinate]
//     if (board.grid[coordinate].ship === true) {
//        div.className = "coordinate-two hit"
//     } else if (board.grid[coordinate] === "miss") {
//         div.className = "coordinate-two miss"
//         div.textContent = "."
//     }
//     board.reportGameStatus()
// }

// const gameController = (player, board) => {
    
//     if (hit === true) {
//         let move = player.processAdjacentMove()
//         if (move !== null) {
//             attackOne(move, board)
//         }
//     } else {
//         let move = player.processMove()

//         if (move !== null) {
//             attackOne(move, board)
//         } else {
//             gameController(player, board)
//         }
//     }
// }

// function generateMessage(string) {
//     let messageBoard = document.getElementById("message-board")
//     messageBoard.innerText = string
// }

// const generateGameBoard = () => {

//     const carrierOne = ship("carrier", 5)
//     const battleshipOne = ship("battleship", 4)
//     const cruiserOne = ship("cruiser", 3)
//     const submarineOne = ship("sub", 2)
//     const destroyerOne = ship("destroyer", 2)

//     const carrierTwo = ship("carrier", 5)
//     const battleshipTwo = ship("battleship", 4)
//     const cruiserTwo = ship("cruiser", 3)
//     const submarineTwo = ship("sub", 2)
//     const destroyerTwo = ship("destroyer", 2)

//     const playerOne = player()
//     const playerTwo = ai()

//     const fleetOne = [carrierOne, battleshipOne, cruiserOne, submarineOne, destroyerOne]
//     const fleetTwo = [carrierTwo, battleshipTwo, cruiserTwo, submarineTwo, destroyerTwo]

//     const boardOne = gameBoard(playerOne, playerTwo, "board-one", fleetOne)
//     const boardTwo = gameBoard(playerTwo, playerOne, "board-two", fleetTwo)

//     boardOne.placeShip(carrierOne)
//     boardOne.placeShip(battleshipOne)
//     boardOne.placeShip(cruiserOne)
//     boardOne.placeShip(destroyerOne)
//     boardOne.placeShip(submarineOne)

//     boardTwo.placeShip(carrierTwo)
//     boardTwo.placeShip(battleshipTwo)
//     boardTwo.placeShip(cruiserTwo)
//     boardTwo.placeShip(destroyerTwo)
//     boardTwo.placeShip(submarineTwo)

//     createBoardOne(boardOne)
//     createBoardTwo(boardTwo)
//     generateMessage("pick your first move")

//     const content = document.querySelector(".content")
//     const tile = document.querySelectorAll(".coordinate-two")

//     tile.forEach((el) => {
//         el.addEventListener('click', function(e) {
//             if(over === true) {
//                 content.setAttribute("id", "off");
//             } else {
//                 const coordinate = el.id
//                 e.target.onclick = attackTwo(coordinate, boardTwo)
//                 content.setAttribute("id", "off")
            

//                 if(over === false) {
//                     setTimeout(() => {
//                         gameController(playerTwo, boardOne)
//                         content.setAttribute("id", "on")
//                     }, 500)
//                 }
//             }
//         })
//     })
// }
// generateGameBoard()

export {ship, gameBoard, ai, player, hit, over}