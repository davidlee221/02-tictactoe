console.debug('Welcome to Tic-Tac-Toe')

/*
What are the objects I want in my game?
I want a player,
I want a gameboard
I want a token (X/O)
I want to keep score or have a game controller
*/

const player = (aName) => {
    const name = aName
    console.debug(`player ${aName} has entered the game.`)
    return {name: aName}
}

const move = (player, board, space) => {
    board.updateStatus(player, space)
}
function Gameboard() {
    this.rows = 3;
    this.columns = 3;
    this.board = [];
    // how to get the 2nd row, 2nd column?  Which entry would that be?
    // [1, 1], so the 4th slot.  
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j=0; j<columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;
    const dropToken = (column, row, player) => {
        if (board[column][row].getValue() !== 0) {
            return;
        }
        board[column][row].addToken(player)
    }
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => {
            return cell.getValue()}));
        console.log(boardWithCellValues);
    }
    const isGameOver = (player) => {
        const hasHorizontalWinner = () => {
                for (let i=0; i<this.rows; i++) {
                    if (this.board[i].every(cell => {
                        return cell.getValue() === player.token}))
                        return player
                    return false
                }    
        }
        const hasVerticalWinner = () => {
            for (let i=0; i<this.columns; i++) {
                const vertResult = [];
                for (let j=0; j<this.rows; j++) {
                    // how do I get the same column number?
                    if (this.board[j][i].getValue() === player.token)
                        vertResult.push(true)
                    else vertResult.push(false)
                }
                if (vertResult.every(r => r)) return player;
            }

            return false;
        }
        const hasDiagonalWinner = () => {
            const upCellResult = [];
            for (let i=0; i<this.rows; i++) {
                if (board[i][i].getValue() === player.token)
                    upCellResult.push(true)
                else 
                    upCellResult.push(false)
            }
            const downCellResult = [];
            for (let i=0; i<this.rows; i++) {
                if (board[i][this.columns - 1 - i].getValue() === player.token)
                    downCellResult.push(true)
                else
                    downCellResult.push(false)
            }

            if (upCellResult.every(r => r) || downCellResult.every(r => r))
                return player
            return false
        }
        if (noAvailableSpaces())
            return {name: 'tie'}
        const hasWinner = hasHorizontalWinner() || hasVerticalWinner() || hasDiagonalWinner()
        return (hasWinner)
            ? hasWinner
            : false
    }
    return {
        getBoard, dropToken, printBoard, isGameOver
    };
}

function Cell() {
    let value = 0;
    const addToken = (player) => {
        value = player
    };
    const getValue = () => value;
    return {
        addToken,
        getValue
    }
}

function Gamecontroller(pOne = "Player One", pTwo = "Player Two") {
    const board = Gameboard();
    const players = [{
        name: pOne,
        token: 'X'
      }, {
        name: pTwo,
        token: 'O'
      }
    ];
    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    };
    const getActivePlayer = () => activePlayer;
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    }
    const playRound = (row, column) => {
        // drop a token for the current player ??
        board.dropToken(column, row, getActivePlayer().token);
        const isGameOver = board.isGameOver(getActivePlayer())
        console.debug('what is gameOver', isGameOver)
        if (isGameOver) {
            console.log(`Game is over, ${isGameOver.name} won.  Better luck tomorrow.`)
            return;
        }
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();
    return {
        playRound,
        getActivePlayer
    };
}

function DisplayDomController() {
    return {
        renderGameboard
    }
}

const game = Gamecontroller();

// horizontal case
// game.playRound(0, 0);
// game.playRound(0, 1);
// game.playRound(1, 0);
// game.playRound(1, 1);
// game.playRound(2, 0);

// vertical case
// game.playRound(0, 0);
// game.playRound(1, 1);
// game.playRound(0, 1);
// game.playRound(2, 1);
// game.playRound(0, 2);

// diagonal case
game.playRound(1, 1);
game.playRound(1, 2);
game.playRound(2, 2);
game.playRound(2, 1);
game.playRound(2, 0);
game.playRound(0, 2);
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
