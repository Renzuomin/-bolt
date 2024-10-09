import React, { useState, useEffect } from 'react'
import Board from './components/Board'
import { generateBoard, revealCell, checkWin } from './utils/gameLogic'

const BOARD_SIZE = 10
const NUM_MINES = 15

function App() {
  const [board, setBoard] = useState<Cell[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    const newBoard = generateBoard(BOARD_SIZE, NUM_MINES)
    setBoard(newBoard)
    setGameOver(false)
    setWin(false)
  }

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || win) return

    const newBoard = revealCell(board, row, col)
    setBoard(newBoard)

    if (newBoard[row][col].isMine) {
      setGameOver(true)
    } else if (checkWin(newBoard)) {
      setWin(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">扫雷游戏</h1>
      <Board board={board} onCellClick={handleCellClick} />
      {gameOver && <p className="mt-4 text-xl text-red-600">游戏结束！</p>}
      {win && <p className="mt-4 text-xl text-green-600">恭喜你赢了！</p>}
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        重新开始
      </button>
    </div>
  )
}

export default App