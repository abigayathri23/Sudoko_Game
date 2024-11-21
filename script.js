const boardElement = document.getElementById("board");
const generateButton = document.getElementById("generate");
const solveButton = document.getElementById("solve");

let board = [];

// Render the board on the UI
function renderBoard(boardData) {
    boardElement.innerHTML = "";
    boardData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("div");
            cellElement.className = "cell";
            if (cell === 0) {
                const input = document.createElement("input");
                input.type = "number";
                input.min = 1;
                input.max = 9;
                input.addEventListener("input", (e) => {
                    board[rowIndex][colIndex] = parseInt(e.target.value) || 0;
                });
                cellElement.appendChild(input);
            } else {
                cellElement.textContent = cell;
            }
            boardElement.appendChild(cellElement);
        });
    });
}

// Fetch generated board
async function generateBoard() {
    const response = await fetch("http://127.0.0.1:5000/generate");
    const data = await response.json();
    board = data.board;
    renderBoard(board);
}

// Send board for solving
async function solveBoard() {
    const response = await fetch("http://127.0.0.1:5000/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board }),
    });
    const data = await response.json();
    if (data.solved) {
        board = data.board;
        renderBoard(board);
        alert("Solved!");
    } else {
        alert("This Sudoku cannot be solved!");
    }
}

// Event Listeners
generateButton.addEventListener("click", generateBoard);
solveButton.addEventListener("click", solveBoard);
