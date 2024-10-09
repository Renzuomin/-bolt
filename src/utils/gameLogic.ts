export interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMines: number
}

export const generateBoard = (size: number, numMines: number): Cell[][] => {
  const board: Cell[][] = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  )

  // Place mines randomly
  let minesPlaced = 0
  while (minesPlaced < numMines) {
    const row = Math.floor(Math.random() * size)
    const col = Math.floor(Math.random() * size)
    if (!board[row][col].isMine) {
      board[row][col].isMine = true
      minesPlaced++
    }
  }

  // Calculate neighbor mines
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!board[row][col].isMine) {
        board[row][col].neighborMines = countNeighborMines(board, row, col)
      }
    }
  }

  return board
}

const countNeighborMines = (board: Cell[][], row: number, col: number): number => {
  let count = 0
  for (let r = Math.max(0, row - 1); r <= Math.min(board.length - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(board[0].length - 1, col + 1); c++) {
      if (board[r][c].isMine) count++
    }
  }
  return count
}

export const revealCell = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = JSON.parse(JSON.stringify(board))
  revealCellRecursive(newBoard, row, col)
  return newBoard
}

const revealCellRecursive = (board: Cell[][], row: number, col: number) => {
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col].isRevealed) {
    return
  }

  board[row][col].isRevealed = true

  if (board[row][col].neighborMines === 0) {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        revealCellRecursive(board, r, c)
      }
    }
  }
}

export const checkWin = (board: Cell[][]): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (!board[row][col].isMine && !board[row][col].isRevealed) {
        return false
      }
    }
  }
  return true
}