import React from 'react'
import { Bomb, Flag } from 'lucide-react'

interface CellProps {
  cell: Cell
  onClick: () => void
}

const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
  const getCellContent = () => {
    if (cell.isRevealed) {
      if (cell.isMine) {
        return <Bomb className="w-5 h-5" />
      } else if (cell.neighborMines > 0) {
        return cell.neighborMines
      }
    } else if (cell.isFlagged) {
      return <Flag className="w-5 h-5" />
    }
    return null
  }

  const cellClass = `w-8 h-8 flex items-center justify-center border border-gray-400 ${
    cell.isRevealed
      ? 'bg-gray-200'
      : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
  }`

  return (
    <div className={cellClass} onClick={onClick}>
      {getCellContent()}
    </div>
  )
}

export default Cell