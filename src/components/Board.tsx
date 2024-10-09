import React from 'react'
import Cell from './Cell'

interface BoardProps {
  board: Cell[][]
  onCellClick: (row: number, col: number) => void
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))` }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  )
}

export default Board