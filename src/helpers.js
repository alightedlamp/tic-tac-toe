export const gameBoard = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: ''
};
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
export const getRandomNum = () => Math.floor(Math.random() * 10);