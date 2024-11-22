const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/check-sudoku", (req, res) => {
  const board = req.body.board;

  // Simple function to check if the Sudoku solution is valid
  const isValidSudoku = (board) => {
    const isValidSet = (arr) => new Set(arr.filter(num => num > 0)).size === arr.filter(num => num > 0).length;

    for (let row of board) {
      if (!isValidSet(row)) return false;
    }

    for (let col = 0; col < 9; col++) {
      const column = board.map(row => row[col]);
      if (!isValidSet(column)) return false;
    }

    for (let r = 0; r < 9; r += 3) {
      for (let c = 0; c < 9; c += 3) {
        const square = [];
        for (let i = r; i < r + 3; i++) {
          for (let j = c; j < c + 3; j++) {
            square.push(board[i][j]);
          }
        }
        if (!isValidSet(square)) return false;
      }
    }

    return true;
  };

  res.json({ valid: isValidSudoku(board) });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
