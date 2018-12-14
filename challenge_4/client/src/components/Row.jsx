import RowEntry from './RowEntry.jsx';

const Row = ({ row, rowIndex, onCircleClickHandler }) => (
  <div>
    { row.map((rowEntry, columnIndex) => 
      (<RowEntry 
        onCircleClickHandler={onCircleClickHandler}
        rowIndex={rowIndex} 
        columnIndex={columnIndex} 
      />))
    }
  </div>
);

export default Row;