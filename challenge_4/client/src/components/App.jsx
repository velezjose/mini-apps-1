import React from 'react';
import Table from './Table.jsx';

const rows = 6;
const columns = 7;

const initialTable = [];
for (let i = 0; i < rows; i += 1) {
  initialTable.push([]);
  for (let j = 0; j < columns; j += 1) {
    initialTable[i].push(0);
  }
}

const colIndexesToFill = [];
for (let i = 0; i < columns; i += 1) {
  colIndexesToFill.push(rows - 1);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: initialTable,
      columnFillTracker: colIndexesToFill,
      player1: true,
      hasWon: {
        someone: false,
        player1: false
      } 
    };
  }

  onCircleClickHandler(event) {
    if (this.state.hasWon.someone) {
      return;
    }

    let colIndex = Number(event.target.id.charAt(1))
    let nextRowIndex = this.getNextRowIndex(colIndex);

    let newTable = this.state.table.slice();
    // 1 = blue colored circle
    // 2 = red colored circle
    newTable[nextRowIndex][colIndex] = this.state.player1 ? 1 : 2;

    // Check if Anyone has won
    let newHasWon = Object.assign({}, this.state.hasWon);
    this.checkWinningConditions(newHasWon, newTable, newTable[nextRowIndex][colIndex], nextRowIndex, colIndex);

    this.setState({
      player1: !this.state.player1,
      table: newTable,
      hasWon: newHasWon
    }); 

  }

  checkWinningConditions(newHasWon, newTable, colorCode, rowIndex, colIndex) {
    let someoneWon = this.checkRows(newTable, colorCode, rowIndex) || this.checkColumns(newTable, colorCode, colIndex); // this.checkDiagonals(newTable, colorCode)

    if (someoneWon) {
      newHasWon.someone = true;
      newHasWon.player1 = this.state.player1;
    } 
  }

  checkRows(newTable, colorCode, rowIndex) {
    let row = newTable[rowIndex];
    let count = 0;

    for (let i = 0; i < row.length; i += 1) {
      count = row[i] === colorCode ? (count + 1) : 0;
      if (count >= 4) {
        return true;
      }
    }
    
    return false;
  }

  checkColumns(newTable, colorCode, columnIndex) {
    let column = [];
    let count = 0;

    for (let i = 0; i < newTable.length; i += 1) {
      column.push(newTable[i][columnIndex]);
    }

    for (let i = 0; i < column.length; i += 1) {
      count = column[i] === colorCode ? (count + 1) : 0;
      if (count >= 4) {
        return true;
      }
    }
    
    return false;
  }

  // checkDiagonals(newTable, colorCode) {
    
  // }

  getNextRowIndex(colIndex) {
    let newColumnFillTracker = this.state.columnFillTracker.slice();
    newColumnFillTracker[colIndex] = newColumnFillTracker[colIndex] > 0 ? (newColumnFillTracker[colIndex] - 1) : newColumnFillTracker[colIndex];

    this.setState({
      columnFillTracker: newColumnFillTracker
    });
    
    return this.state.columnFillTracker[colIndex];
  }

  render() {
    let color = this.state.player1 ? 'Red' : 'Blue';

    return !this.state.hasWon.someone
    ? (<div>
        <Table table={this.state.table} onCircleClickHandler={this.onCircleClickHandler.bind(this)} />
      </div>)
    :
      (<div>
        <Table table={this.state.table} onCircleClickHandler={this.onCircleClickHandler.bind(this)} />
        {color} has won!
      </div>)
  }
}

export default App;