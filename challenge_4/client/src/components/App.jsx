import React from 'react';
import Table from './Table.jsx';

const initialTable = [];
for (let i = 0; i < 6; i += 1) {
  initialTable.push([]);
  for (let j = 0; j < 7; j += 1) {
    initialTable[i].push(0);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: initialTable,
      columnFillTracker: initialTable[0],
      player1: true
    };
  }

  // onCircleClickHandler(event) {
  //   let colIndex = Number(event.target.id.charAt(1))
  //   this.fillNextRowInColumn(colIndex);
  // }

  // fillNextRowInColumn(colIndex) {
  //   let next = this.columnFillTracker[i];

  /*onCircleClickHandler={this.onCircleClickHandler.bind(this)*/
    
  // }



  render() {
    return (
      <div>
        <Table 
          table={this.state.table} 
        />
      </div>
    );
  }
}

export default App;