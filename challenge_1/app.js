document.addEventListener("DOMContentLoaded", function(event) { 
  let app = document.getElementById('app');
  let turn = document.getElementById('turn');

  // Defining some important game variables.
  let played = [];
  let won = false;
  let count = 0;
  let player;

  const xOrO = (content, xCount, oCount) => {
    if (content.innerHTML === 'X') {
      xCount += 1
    } else if (content.innerHTML === 'O') {
      oCount += 1;
    }
    return [xCount, oCount];
  };

  const resetCounts = () => {
    return [0, 0];
  };

  
  // Checks each row to see if a player won.
  const checkRows = () => {
    for (let row = 0; row < 3; row += 1) {
      let [xCount, oCount] = resetCounts();

      for (let col = 0; col < 3; col += 1) {
        let content = document.getElementById(row.toString() + col.toString());
        [xCount, oCount] = xOrO(content, xCount, oCount);
      }

      if (xCount === 3 || oCount === 3) {
        return true;
      }
    }

    return false;
  };
  
  // Checks each column to see if a player won.
  const checkCols = () => {
    for (let row = 0; row < 3; row += 1) {
      let [xCount, oCount] = resetCounts();

      for (let col = 0; col < 3; col += 1) {
        let content = document.getElementById(col.toString() + row.toString());
        [xCount, oCount] = xOrO(content, xCount, oCount);
      }

      if (xCount === 3 || oCount === 3) {
        return true;
      } 
    }

    return false;
  };
  
  // Checks both diagonals to see if a player has won.
  const checkDiagonals = () => {
    // Major diagonal
    let [xCount, oCount] = resetCounts();
    for (let rowAndCol = 0; rowAndCol < 3; rowAndCol += 1) {
      let content = document.getElementById(rowAndCol.toString() + rowAndCol.toString());
      [xCount, oCount] = xOrO(content, xCount, oCount);
    }
    
    if (xCount === 3 || oCount === 3) {
      return true;
    }

    // Reset xCount and oCount.
    [xCount, oCount] = resetCounts();

    // Define j to subtract from it as we iterate through the columns
    let col = 2;
    for (let row = 0; row < 3; row += 1) {
      let content = document.getElementById(row.toString() + col.toString());
      [xCount, oCount] = xOrO(content, xCount, oCount);
      col -= 1;
    }
    
    if (xCount === 3 || oCount === 3) {
      return true;
    }

    // Return false if no major diagonal nor minor diagonal has returned an
    // xCount or oCount of 3.
    return false;
  };
  
  const checkWins = () => {
    return checkCols() || checkRows() || checkDiagonals();
  }

  // Display who's turn it is.
  const displayTurn = (event) => {
    player = count ? 'Player 2' : 'Player 1';
    turn.innerHTML = player + '\'s turn:'; 
  };

  const display = (event) => {
    // Don't modify the board if the game has already ended or if user
    // clicks on the same button that has already been played.
    if (played.indexOf(event.target.id) !== -1 || won) {
      return;
    }

    // Played array contains all of the clicked buttons' HTML ids.
    played.push(event.target.id);
    count = (count + 1) % 2
    event.target.innerHTML = count ? 'X' : 'O';
    
    // Calculate checkWins once and store result in variable won.
    won = checkWins();
    if (!won) {
      displayTurn(event);
    }

    if (won) {
      player = count ? 'Player 1' : 'Player 2';
      alert(player + ' won!');
    } else if (!won && played.length === 9) {
      alert('Tie!');
    }

  };
  
  const createGame = () => {
    // Reset variables if they contain any value.
    app.innerHTML = '';
    played = [];
    won = false;
    count = 0;
    
    // Render the 3 x 3 Tic-Tac-Toe board:
    // 1. Create each row
    for (let row = 0; row < 3; row += 1) {
      let div = document.createElement('div');
      let newRow = app.appendChild(div);

      // 2. Create each column per row
      for (let col = 0; col < 3; col += 1) {
        let button = document.createElement('button');
        button.id = row.toString() + col.toString();
        button.classList.add('box');
        button.innerHTML = '&nbsp;&nbsp;';
        button.addEventListener("click", display);
        newRow.appendChild(button);
      }
    }

    displayTurn();
  }

  // If players want to reset the board, run createGame again.
  document.getElementById('reset').addEventListener('click', createGame);
  
  createGame();
});
