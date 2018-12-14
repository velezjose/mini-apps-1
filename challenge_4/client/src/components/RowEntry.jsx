const RowEntry = ({ onCircleClickHandler, rowIndex, columnIndex }) => (
  <button
    onClick={onCircleClickHandler}
    style={{width: 50, height: 50, borderRadius: '50%'}}
    id={rowIndex.toString() + columnIndex.toString()}>
  </button>
);

export default RowEntry;