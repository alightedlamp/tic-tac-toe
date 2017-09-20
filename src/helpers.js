export const game = [
  { cell: 1, player: '', isWinningCell: false },
  { cell: 2, player: '', isWinningCell: false },
  { cell: 3, player: '', isWinningCell: false },
  { cell: 4, player: '', isWinningCell: false },
  { cell: 5, player: '', isWinningCell: false },
  { cell: 6, player: '', isWinningCell: false },
  { cell: 7, player: '', isWinningCell: false },
  { cell: 8, player: '', isWinningCell: false },
  { cell: 9, player: '', isWinningCell: false }
];
export const winners = [
  [1, 2, 3],
  [1, 4, 6],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9]
];
export const getRandomInt = () => Math.floor(Math.random() * 9);